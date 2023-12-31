const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
const spaceImport = require('contentful-import');
const contentful = require('contentful-management');
const inquirer = require('inquirer');
const parse = require('yargs-parser');

const exportFile = require('../contentful/export.json');

const loadEnv = () => {
  const argv = parse(process.argv.slice(2));

  console.log(`
To set up this project you need to provide your Space ID
and the belonging API access tokens. Please use an empty space for this.

You can find all the needed information in your Contentful space under:

${chalk.yellow(
  `app.contentful.com ${chalk.red('->')} Space Settings ${chalk.red(
    '->',
  )} API keys`,
)}

The ${chalk.green('Content Management API Token')}
  will be used to import and write data to your space.

The ${chalk.green('Content Delivery API Token')}
  will be used to ship published production-ready content in your Gatsby app.

The ${chalk.green('Content Preview API Token')}
  will be used to show not published data in your development environment.

Ready? Let's do it! 🎉
  `);

  const questions = [
    {
      name: 'spaceId',
      message: 'Your Space ID',
      when: !argv.spaceId && !process.env.CONTENTFUL_SPACE_ID,
      validate: (input) =>
        /^[a-z0-9]{12}$/.test(input) ||
        'Space ID must be 12 lowercase characters',
    },
    {
      name: 'managementToken',
      when: !argv.managementToken,
      message: 'Your Content Management API access token',
    },
    {
      name: 'accessToken',
      when: !argv.accessToken && !process.env.CONTENTFUL_ACCESS_TOKEN,
      message: 'Your Content Delivery API access token',
    },
  ];

  return { questions, argv };
};

const prepareConfigs = (envVars, argv) => {
  const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env;

  const config = {
    spaceId: CONTENTFUL_SPACE_ID || argv.spaceId || envVars.spaceId,
    accessToken:
      CONTENTFUL_ACCESS_TOKEN || argv.accessToken || envVars.accessToken,
    managementToken: argv.managementToken || envVars.managementToken,
    environmentId: 'master',
    content: exportFile,
  };

  console.log('Writing config file...');
  const configFiles = [`.env.development`, `.env.production`].map((file) =>
    path.join(__dirname, '..', file),
  );

  configFiles.forEach((file) => {
    const fileArr = [
      `# All environment variables will be sourced`,
      `# and made available to gatsby-config.js, gatsby-node.js, etc.`,
      `# Do NOT commit this file to source control`,
      `CONTENTFUL_SPACE_ID='${config.spaceId}'`,
      `CONTENTFUL_ACCESS_TOKEN='${config.accessToken}'`,
    ];

    const fileContents = `${fileArr
      .concat(
        file.includes('development')
          ? [
              `# To add draft content preview, uncomment the below line and use the Content Preview API Access Token`,
              `# CONTENTFUL_HOST='preview.contentful.com'`,
            ]
          : [],
      )
      .filter(Boolean)
      .join('\n')}\n`;

    fs.writeFileSync(file, fileContents, 'utf8');
    console.log(`Config file ${chalk.yellow(file)} written`);
  });

  return config;
};

const deleteEntities = async (entities) => {
  for (const entity of entities.items) { // eslint-disable-line
    if (entity.isPublished()) {
      console.log(`Unpublishing content type "${entity.sys.id}"`);
      await entity.unpublish(); // eslint-disable-line
    }
    await entity.delete(); // eslint-disable-line
  }
};

const cleanContent = async (config) => {
  const { spaceId, managementToken, environmentId } = config;

  const client = contentful.createClient({ accessToken: managementToken });

  const contentfulSpace = await client.getSpace(spaceId);
  const environment = await contentfulSpace.getEnvironment(environmentId);
  const entries = await environment.getEntries();
  const contentTypes = await environment.getContentTypes();

  console.log(chalk.red(`Deleting ${entries.total} entries:`));
  await deleteEntities(entries);

  console.log(chalk.red(`Deleting ${contentTypes.total} content types:`));
  await deleteEntities(contentTypes);
};

const manageContent = async (config) => {
  try {
    await cleanContent(config);
    await spaceImport(config);
  } catch (error) {
    console.log(chalk.red(`An error occured!`), error);
  }
};

const setup = async (questions, argv) => {
  try {
    const envVars = await inquirer.prompt(questions);

    const config = prepareConfigs(envVars, argv);

    await manageContent(config);

    console.log(
      `All set! You can now run ${chalk.yellow(
        'npm run dev',
      )} to see it in action.`,
    );
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  const { questions, argv } = loadEnv();

  await setup(questions, argv);
})();

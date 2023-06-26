const ENV = {
  space_id: process.env.CONTENTFUL_SPACE_ID,
  access_token: process.env.CONTENTFUL_ACCESS_TOKEN,
  preview_token: process.env.CONTENTFUL_PREVIEW_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
};

const getOptions = (is_preview) => {
  const options = {};

  options.space = ENV.space_id;
  options.host = is_preview ? 'preview.contentful.com' : undefined;
  options.accessToken = is_preview ? ENV.preview_token : ENV.access_token;
  options.environment = ENV.environment ? ENV.environment : 'master';
  options.resolveLinks = true;

  return options;
};

export { ENV, getOptions };

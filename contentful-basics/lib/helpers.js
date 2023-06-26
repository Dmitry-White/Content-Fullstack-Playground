import * as contentful from 'contentful';
import _ from 'lodash';

const space_id = process.env.CONTENTFUL_SPACE_ID;
const access_token = process.env.CONTENTFUL_ACCESS_TOKEN;
const preview_token = process.env.CONTENTFUL_PREVIEW_TOKEN;
const environment = process.env.CONTENTFUL_ENVIRONMENT;

const getOptions = (is_preview) => {
  const options = {};

  options.space = space_id;
  options.host = is_preview ? 'preview.contentful.com' : undefined;
  options.accessToken = is_preview ? preview_token : access_token;
  options.environment = environment ? environment : 'master';
  options.resolveLinks = true;

  return options;
};

const getAllLocales = async () => {
  const options = getOptions(false);
  const contentfulClient = contentful.createClient(options);

  try {
    const allLocales = await contentfulClient.getLocales();

    const dataType = _.get(allLocales, 'sys.type');
    const items = _.get(allLocales, 'items');

    if (dataType === 'Array') {
      return items;
    } else {
      return false;
    }
  } catch (error) {
    console.log('[getAllLocales] error:', error);
  }
};

const getEntriesByContentType = async (content_type, slug = null) => {
  const options = getOptions(false);

  try {
    const contentfulClient = contentful.createClient(options);
    if (contentfulClient) {
      const params = { content_type: content_type, include: 3 };

      if (slug) {
        params['fields.slug'] = slug;
      }

      const entries = await contentfulClient.getEntries(params);

      const items = _.get(entries, 'items');

      return { items };
    } else {
      return false;
    }
  } catch (error) {
    console.log('[getEntriesByContentType] error:', error);
    return false;
  }
};

export { getAllLocales, getEntriesByContentType };

import { Config } from 'contentstack';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

const liveEdit = envConfig.CONTENTSTACK_LIVE_EDIT_TAGS === 'true';

const getStackOptions = (envConfig: any): Config => ({
  api_key: envConfig.CONTENTSTACK_API_KEY
    ? envConfig.CONTENTSTACK_API_KEY
    : envConfig.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
  delivery_token: envConfig.CONTENTSTACK_DELIVERY_TOKEN,
  environment: envConfig.CONTENTSTACK_ENVIRONMENT,
  region: envConfig.CONTENTSTACK_REGION ? envConfig.CONTENTSTACK_REGION : 'us',
  live_preview: {
    enable: true,
    management_token: envConfig.CONTENTSTACK_MANAGEMENT_TOKEN,
    host: envConfig.CONTENTSTACK_API_HOST,
  },
});

const getPreviewOptions = (envConfig: any, stackSdk: any) => ({
  stackSdk,
  clientUrlParams: {
    host: envConfig.CONTENTSTACK_APP_HOST,
  },
  ssr: false,
});

export { envConfig, liveEdit, getStackOptions, getPreviewOptions };

import ContentstackLivePreview from '@contentstack/live-preview-utils';
import { Stack } from 'contentstack';

import { envConfig, getPreviewOptions, getStackOptions } from './env';

const stack = Stack(getStackOptions(envConfig));

if (envConfig.CONTENTSTACK_API_HOST) {
  stack.setHost(envConfig.CONTENTSTACK_API_HOST);
}

ContentstackLivePreview.init(getPreviewOptions(envConfig, stack));

const { onEntryChange } = ContentstackLivePreview;

export { stack, onEntryChange };

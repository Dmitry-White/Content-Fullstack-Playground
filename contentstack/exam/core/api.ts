import { addEditableTags, jsonToHTML } from '@contentstack/utils';

import { getRenderOptions, liveEdit } from './env';
import { stack } from './stack';

/**
 *
 * fetches all the entries from specific content-type
 * @param {* content-type uid} contentTypeUid
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 *
 */
const getEntry = async ({
  contentTypeUid,
  referenceFieldPath = null,
  jsonRtePath = null,
}: {
  contentTypeUid: any;
  referenceFieldPath: any;
  jsonRtePath: any;
}) => {
  const query = stack.ContentType(contentTypeUid).Query();

  if (referenceFieldPath) {
    query.includeReference(referenceFieldPath);
  }

  const result = await query.toJSON().find();

  jsonRtePath &&
    jsonToHTML({
      entry: result,
      paths: jsonRtePath,
      renderOption: getRenderOptions(),
    });

  return result;
};

/**
 *fetches specific entry from a content-type
 *
 * @param {* content-type uid} contentTypeUid
 * @param {* url for entry to be fetched} entryUrl
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 * @returns
 */
const getEntryByUrl = async ({
  contentTypeUid,
  entryUrl,
  referenceFieldPath,
  jsonRtePath,
}: {
  contentTypeUid: any;
  entryUrl: any;
  referenceFieldPath: any;
  jsonRtePath: any;
}) => {
  const query = stack.ContentType(contentTypeUid).Query();

  if (referenceFieldPath) {
    query.includeReference(referenceFieldPath);
  }

  const result = await query.toJSON().where('url', entryUrl).find();

  jsonRtePath &&
    jsonToHTML({
      entry: result,
      paths: jsonRtePath,
      renderOption: getRenderOptions(),
    });

  return result[0];
};

const getHomePage = async () => {
  const response: any = await getEntry({
    contentTypeUid: 'landing_page',
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  });
  liveEdit &&
    response[0].forEach((entry: any) => addEditableTags(entry, 'page', true));
  return response[0];
};

export { getEntry, getEntryByUrl, getHomePage };

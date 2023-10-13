import { addEditableTags, jsonToHTML } from '@contentstack/utils';

import richtextRenderOptions from '../components/richtextRenderOptions';

import { liveEdit } from './env';
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

  if (jsonRtePath) {
    query.includeEmbeddedItems();
  }

  const result = await query.toJSON().find();

  jsonRtePath &&
    jsonToHTML({
      entry: result,
      paths: jsonRtePath,
      renderOption: richtextRenderOptions,
    });

  return result;
};

/**
 *fetches specific entry from a content-type
 *
 * @param {* content-type uid} contentTypeUid
 * @param {* url for entry to be fetched} slug
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 * @returns
 */
const getEntryBySlug = async ({
  contentTypeUid,
  slug,
  referenceFieldPath,
  jsonRtePath,
}: {
  contentTypeUid: any;
  slug: string;
  referenceFieldPath: any;
  jsonRtePath: any;
}) => {
  const query = stack.ContentType(contentTypeUid).Query();

  if (referenceFieldPath) {
    query.includeReference(referenceFieldPath);
  }

  if (jsonRtePath) {
    query.includeEmbeddedItems();
  }

  const result = await query.toJSON().where('slug', slug).find();

  jsonRtePath &&
    jsonToHTML({
      entry: result,
      paths: jsonRtePath,
      renderOption: richtextRenderOptions,
    });

  return result[0];
};

const getHomePage = async () => {
  const response: any = await getEntry({
    contentTypeUid: 'landing_page',
    referenceFieldPath: [
      'sections.product_section.product_section.products.product.images.image',
    ],
    jsonRtePath: [
      'sections.product_section.product_section.products.product.description',
    ],
  });

  liveEdit &&
    response[0].forEach((entry: any) => addEditableTags(entry, 'page', true));
  return response[0];
};

const getProducts = async () => {
  const response: any = await getEntry({
    contentTypeUid: 'product',
    referenceFieldPath: null,
    jsonRtePath: null,
  });

  liveEdit &&
    response[0].forEach((entry: any) => addEditableTags(entry, 'page', true));
  return response[0];
};

const getProductPage = async (slug: string) => {
  const response: any = await getEntryBySlug({
    contentTypeUid: 'product',
    slug,
    referenceFieldPath: ['images.image'],
    jsonRtePath: ['description'],
  });

  liveEdit &&
    response.forEach((entry: any) => addEditableTags(entry, 'product', true));
  return response[0];
};

export { getEntry, getEntryBySlug, getHomePage, getProducts, getProductPage };

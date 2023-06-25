const _ = require('lodash');

module.exports = (migration) => {
  migration.transformEntriesToType({
    sourceContentType: 'product',
    targetContentType: 'mediaWrapper',
    from: ['image', 'slug'],
    shouldPublish: true,
    updateReferences: false,
    removeOldEntries: false,
    identityKey: (fields) => {
      try {
        const slug = _.get(fields, "slug['en-US']");
        if (slug) {
          return slug;
        }
      } catch (error) {
        console.error(error);
        return '';
      }
    },
    transformEntryForLocale: (fromFields) => {
      try {
        const oldImageId = _.get(fromFields, "image['en-US'].sys.id"); // id of existing image

        const slug = _.get(fromFields, "slug['en-US']");

        if (oldImageId && slug) {
          const derivedAsset = {
            sys: { type: 'Link', linkType: 'Asset', id: oldImageId },
          };

          const transformedImage = {
            internalName: slug,
            title: slug,
            altText: slug,
            asset: derivedAsset,
          };

          return transformedImage;
        }

        return false;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  });
};

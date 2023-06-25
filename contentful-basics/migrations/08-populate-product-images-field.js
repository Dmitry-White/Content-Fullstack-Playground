const _ = require('lodash');

module.exports = async function (migration, { makeRequest }) {
  migration.transformEntries({
    contentType: 'product',
    from: ['image', 'slug'],
    to: ['images'],
    transformEntryForLocale: async (fromFields, currentLocale) => {
      if (currentLocale === 'de-DE') {
        return;
      }

      try {
        const slug = _.get(fromFields, "slug['en-US']");
        const mediaWrapperEntries = await makeRequest({
          method: 'GET',
          url: `/entries?content_type=mediaWrapper&fields.title=${slug}`,
        });

        const mediaWrapperItems = _.get(mediaWrapperEntries, 'items');

        if (!mediaWrapperItems) {
          console.log('error', error);
          return false;
        }

        const images = [];

        mediaWrapperItems.map((item) => {
          const itemId = _.get(item, 'sys.id');
          const derivedMediaWrapper = {
            sys: { type: 'Link', linkType: 'Entry', id: itemId },
          };

          images.push(derivedMediaWrapper);
        });

        return { images };
      } catch (error) {
        console.log('error', error);
        return false;
      }
    },
  });
};

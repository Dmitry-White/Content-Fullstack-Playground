module.exports = (migration) => {
  const productSection = migration
    .createContentType('productSection')
    .name('Product Section')
    .displayField('title');

  productSection
    .createField('internalName')
    .name('Internal Name')
    .type('Symbol');

  productSection
    .createField('title')
    .name('Title')
    .type('Symbol')
    .required(true);

  productSection
    .createField('products')
    .name('Products')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['product'] }],
    });
};

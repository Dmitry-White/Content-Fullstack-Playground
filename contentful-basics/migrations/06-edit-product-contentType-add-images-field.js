module.exports = (migration) => {
  const product = migration.editContentType('product');

  product
    .createField('images')
    .name('Images')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['mediaWrapper'] }],
    });

  product.editField('image').disabled(true);
};

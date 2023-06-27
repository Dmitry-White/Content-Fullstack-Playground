module.exports = (migration) => {
  const product = migration.editContentType('product');

  product.deleteField('image');
};

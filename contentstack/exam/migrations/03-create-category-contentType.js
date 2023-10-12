module.exports = (migration) => {
  const category = migration
    .createContentType('category')
    .name('Category')
    .displayField('title');

  category.createField('title').name('Title').type('Symbol').required(true);

  category.createField('description').name('Description').type('Symbol');

  category.createField('image').name('Image').type('Link').linkType('Asset');
};

module.exports = (migration) => {
  const landingPage = migration
    .createContentType('landingPage')
    .name('Landing Page')
    .displayField('title');

  landingPage.createField('title').name('Title').type('Symbol').required(true);

  landingPage.createField('slug').name('Slug').type('Symbol').required(true);

  landingPage.changeFieldControl('slug', 'builtin', 'slugEditor');

  landingPage
    .createField('headline')
    .name('Headline')
    .type('Symbol')
    .required(true);

  landingPage
    .createField('sections')
    .name('Sections')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['productSection'] }],
    });
};

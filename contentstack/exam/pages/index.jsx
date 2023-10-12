import _ from 'lodash';

import ProductSection from '../components/ProductSection';
import { getHomePage } from '../core/api';

async function getStaticProps() {
  const pageEntries = await getHomePage();

  const homepageEntry = _.get(pageEntries, '[0]');

  return {
    props: {
      page: homepageEntry ? homepageEntry : {},
    },
  };
}

const Home = (props) => {
  const page = _.get(props, 'page');

  const sections = _.get(page, 'sections');
  const headline = _.get(page, 'headline', '');

  const renderItem = (item) => {
    const name = _.get(item, 'product_section.section_name');
    const sectionId = _.get(item, 'product_section._metadata.uid');
    const section = _.get(item, 'product_section.product_section[0]');

    if (name === 'LS Collection') {
      return (
        <ProductSection
          key={sectionId}
          id={sectionId}
          title={name}
          section={section}
        />
      );
    }

    if (name === 'product') {
      return <>{name}</>;
    }

    return '';
  };

  const renderList = (list) =>
    Array.isArray(list) ? list.map(renderItem) : '';

  return (
    <>
      <h1 className="font-bold text-2xl mb-4 text-center">{headline}</h1>
      <div className="flex flex-col space-y-4">{renderList(sections)}</div>
    </>
  );
};

export default Home;
export { getStaticProps };

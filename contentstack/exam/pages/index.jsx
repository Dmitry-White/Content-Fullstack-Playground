import _ from 'lodash';

import ProductSection from '../components/ProductSection';
import { getHomePage } from '../core/api';

async function getStaticProps() {
  const pageEntries = await getHomePage();

  const homepageEntry = _.get(pageEntries, 'items[0]');

  return {
    props: {
      page: homepageEntry ? homepageEntry : {},
    },
  };
}

const Home = (props) => {
  const page = _.get(props, 'page');
  const sections = _.get(page, 'fields.sections');
  const headline = _.get(page, 'fields.headline');

  console.log('PAGE: ', page);

  const renderItem = (item) => {
    const contentType = _.get(item, 'sys.contentType.sys.id');
    const sectionId = _.get(item, 'sys.id');
    const fields = _.get(item, 'fields');

    if (contentType === 'productSection') {
      return <ProductSection key={sectionId} id={sectionId} fields={fields} />;
    }

    if (contentType === 'product') {
      return <>{contentType}</>;
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

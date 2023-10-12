import _ from 'lodash';
import Head from 'next/head';

import ImageComponent from '../../components/ImageComponent';
import { getProductPage, getProducts } from '../../core/api';

async function getStaticPaths() {
  const productEntries = await getProducts();

  if (!productEntries) {
    return {
      paths: [],
      fallback: false,
    };
  }

  const paths = productEntries.map((entry) => {
    const slugVal = _.get(entry, 'slug');
    return { params: { slug: slugVal } };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

async function getStaticProps(context) {
  const slug = _.get(context, 'params.slug');

  const product = await getProductPage(slug);

  return {
    props: { product },
  };
}

const ProductPage = (props) => {
  const product = _.get(props, 'product');

  const title = _.get(product, 'title');
  const price = _.get(product, 'price');
  const image = _.get(product, 'images[0]');

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="p-20 flex flex-col space-y-4 h-screen items-center">
        <div className="w-full rounded shadow-xl">
          <ImageComponent image={image} />
        </div>
        <h1 className="text-3xl mb-4 font-bold">{title}</h1>
        <p className=" text-xl text-blau">${price}</p>
        <div className="">{'Description Placeholder'}</div>
      </div>
    </>
  );
};

export default ProductPage;
export { getStaticPaths, getStaticProps };

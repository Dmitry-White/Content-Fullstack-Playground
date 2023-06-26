import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import _ from 'lodash';
import Head from 'next/head';

import ImageComponent from '../../components/ImageComponent';
import ImageGallery from '../../components/ImageGallery';
import { getEntriesByContentType } from '../../lib/helpers';
import richtextRenderOptions from '../../lib/richtextRenderOptions';

async function getStaticPaths() {
  const productEntries = await getEntriesByContentType('product');

  if (!productEntries) {
    return {
      paths: [],
      fallback: false,
    };
  }

  const paths = productEntries.items.map((entry) => {
    const slugVal = _.get(entry, 'fields.slug');
    return { params: { slug: slugVal } };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

async function getStaticProps(context) {
  const slug = _.get(context, 'params.slug');

  const product = await getEntriesByContentType('product', slug);

  return {
    props: { product },
  };
}

const ProductPage = (props) => {
  const product = _.get(props, 'product.items[0]');
  const fields = _.get(product, 'fields');
  const title = _.get(product, 'fields.title');
  const gallery = _.get(product, 'fields.images');

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="p-20 flex flex-col space-y-4 h-screen items-center">
        <div className="w-full rounded shadow-xl">
          {gallery ? (
            <ImageGallery gallery={gallery} />
          ) : (
            <ImageComponent image={fields.image} />
          )}
        </div>
        <h1 className="text-3xl mb-4 font-bold">{title}</h1>
        <p className=" text-xl text-blau">${fields.price}</p>
        <div className="">
          {documentToReactComponents(fields.description, richtextRenderOptions)}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
export { getStaticPaths, getStaticProps };

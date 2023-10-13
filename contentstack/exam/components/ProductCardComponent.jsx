import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

import ImageComponent from './ImageComponent';

const ProductCardComponent = (props) => {
  const productIndex = _.get(props, 'productIndex');
  const product = _.get(props, 'product');

  const image = _.get(product, 'images[0]');
  const description = _.get(product, 'description');

  const router = useRouter();

  const [indexIsOdd, setIndexIsOdd] = useState(false);

  useEffect(() => {
    if (!productIndex % 2 == 0) {
      setIndexIsOdd(true);
    }
    return () => {};
  }, [productIndex]);

  if (!product) {
    return '';
  }

  return (
    <div className="">
      <div className="flex flex-col space-y-10x lg:space-y-0x lg:space-x-10x lg:flex-row w-full p-6x lg:py-10x lg:px-40x overflow-hidden rounded-md shadow-lg">
        <div
          className={`w-1/2 bg-blau9x bg-blau3 p-10 ${
            indexIsOdd ? 'order-last' : ''
          }`}
        >
          <ImageComponent image={image} />
        </div>
        <div className="w-1/2  bg-gelb p-10 flex flex-col items-center">
          <div className=" h-1/3"></div>
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-bold ">{product.title}</h2>

            <div className="">{parse(description)}</div>
            <p className=" text-xl ">${product.price}</p>
            <button
              onClick={() => router.push(`/products/${product.slug}`)}
              className=" bg-black text-white hover:bg-neuter rounded shadow-md"
            >
              BUY
            </button>
          </div>

          <div className=" h-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardComponent;

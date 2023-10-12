import _ from 'lodash';

import ProductCardComponent from './ProductCardComponent';

const ProductSection = (props) => {
  const section = _.get(props, 'section');

  const title = _.get(section, 'title');
  const products = _.get(section, 'products');

  const renderItem = (item, index) => {
    const productId = _.get(item, '_metadata.uid');
    const product = _.get(item, 'product[0]');

    return (
      <ProductCardComponent
        key={productId}
        id={productId}
        productIndex={index}
        product={product}
      />
    );
  };

  const renderList = (list) =>
    Array.isArray(list) ? list.map(renderItem) : '';

  if (!products) {
    return '';
  }

  return (
    <div className="">
      <div className="bg-red-100x flex flex-col space-y-8 p-20 border-2 rounded-md shadow-md">
        <h2 className="font-bold text-2xl text-center">{title}</h2>

        {renderList(products)}
      </div>
    </div>
  );
};

export default ProductSection;

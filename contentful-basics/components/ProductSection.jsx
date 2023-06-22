import _ from 'lodash';

import ProductCardComponent from './ProductCardComponent';

const ProductSection = (props) => {
  const fields = _.get(props, 'fields');
  const title = _.get(fields, 'title');
  const products = _.get(fields, 'products');

  const renderItem = (item, index) => {
    const productId = _.get(item, 'sys.id');
    const fields = _.get(item, 'fields');

    return (
      <ProductCardComponent
        productIndex={index}
        key={productId}
        id={productId}
        fields={fields}
      />
    );
  };

  const renderList = (list) =>
    Array.isArray(list) ? list.map(renderItem) : '';

  if (!fields) {
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

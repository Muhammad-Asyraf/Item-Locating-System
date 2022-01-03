import React from 'react';

import ProductSearch from './ProductSearch';

const ProductSearchIndex = (props) => {
  let assignedProducts = [];

  const { initProducts, ...remainingProps } = props;
  assignedProducts = initProducts.filter(({ layout_uuid: layoutUUID }) => layoutUUID !== null);

  const adjustedProps = { ...remainingProps, assignedProducts, initProducts };

  return <ProductSearch {...adjustedProps} />;
};

export default ProductSearchIndex;

// import React from 'react';
import React, { useRef } from 'react';

import Layout from './layout';

const ProductMapper = (props) => {
  const { initProducts, setInitProducts, currentLayout } = props;
  // const { initProducts, setInitProducts, currentLayout } = props;

  const productsRef = useRef(initProducts);

  const handleOnDrop = (event, layer) => {
    const updatedProducts = [...productsRef.current];

    const { target, payload } = JSON.parse(event.dataTransfer.getData('dragPayload'));
    event.dataTransfer.clearData();

    if (target !== 'layer') {
      return;
    }

    payload.forEach((selectedProductUUID) => {
      const selectedProductIndex = updatedProducts.findIndex(
        ({ uuid }) => uuid === selectedProductUUID
      );

      const updatedSelectedProduct = { ...updatedProducts[selectedProductIndex] };
      updatedSelectedProduct.layout_uuid = currentLayout.uuid;
      updatedSelectedProduct.partition_uuid = layer.id;
      updatedProducts[selectedProductIndex] = updatedSelectedProduct;
    });

    productsRef.current = updatedProducts;
    setInitProducts(updatedProducts);
  };

  const adjustedProps = { ...props, handleOnDrop };

  return (
    <>
      <Layout {...adjustedProps} />
    </>
  );
};

export default ProductMapper;

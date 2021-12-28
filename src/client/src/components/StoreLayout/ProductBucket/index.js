import React from 'react';
import usePortal from 'react-useportal';

import Paper from './Paper';

const PaperPortal = (props) => {
  const { Portal } = usePortal({
    bindTo: document.getElementById('product-bucket-portal'),
  });
  let unassignedProducts = [];

  const { initProducts, ...remainingProps } = props;
  unassignedProducts = initProducts.filter(({ partition_uuid: layerId }) => layerId === null);

  const adjustedProps = { ...remainingProps, initProducts: unassignedProducts };

  return (
    <Portal>
      <Paper {...adjustedProps} />
    </Portal>
  );
};

export default PaperPortal;

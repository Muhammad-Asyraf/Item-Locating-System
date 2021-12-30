import React from 'react';
import usePortal from 'react-useportal';

import Paper from './Paper';

const PaperPortal = (props) => {
  const { Portal } = usePortal({
    bindTo: document.getElementById('partition-bucket-portal'),
  });

  let partitionProducts = [];

  const { initProducts, layer, ...remainingProps } = props;
  partitionProducts = initProducts.filter(
    ({ partition_uuid: layerId }) => layerId === layer.id
  );

  const adjustedProps = { ...remainingProps, layer, partitionProducts, initProducts };

  console.log('im rerendered', layer, partitionProducts);
  return (
    <Portal>
      <Paper {...adjustedProps} />
    </Portal>
  );
};

export default PaperPortal;

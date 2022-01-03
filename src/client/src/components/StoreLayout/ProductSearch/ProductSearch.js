import React, { useState, useEffect } from 'react';

import icons from 'leaflet-color-number-markers';

import Drawer from './Drawer';
import { groupBy } from '../../../utils/general';

/* eslint-disable no-unneeded-ternary */
const ProductSearch = (props) => {
  const { assignedProducts, currentLayout, leafletRef, initProducts } = props;

  const [markerGroup, setMarkerGroup] = useState(null);
  const [selected, setSelected] = useState([]);
  const [categoryFilterType, setCategoryFilterType] = useState('any');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState([]);
  const [selectedActiveStatusFilter, setSelectedActiveStatusFilter] = useState(null);
  const [selectedStockStatusFilter, setSelectedStockStatusFilter] = useState(null);
  const [filterActivated, setFilterActivated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [products, setProducts] = useState(assignedProducts);
  const [layoutId, setLayoutId] = useState(currentLayout.uuid);

  useEffect(() => {
    const { leaflet } = leafletRef.current;

    if (leaflet !== null) {
      setMarkerGroup(leaflet.layerGroup());
    }
  }, [leafletRef]);

  useEffect(() => {
    setLayoutId(currentLayout.uuid);
  }, [currentLayout]);

  const addLookupProductMarker = (latLng, number) => {
    const { leaflet: L } = leafletRef.current;

    const marker = L.marker(latLng, { icon: icons.red.numbers[number] });

    markerGroup.addLayer(marker);
  };

  const getProductsByLayer = () => {
    let productsByLayer = [];

    selected.forEach((uuid) => {
      const productSelected = assignedProducts.find(
        ({ uuid: productUUID }) => productUUID === uuid
      );

      if (productSelected) {
        const { partition_uuid: partitionUUID, layout_uuid: layoutUUID } = productSelected;
        productsByLayer = [...productsByLayer, { partitionUUID, layoutUUID }];
      }
    });

    productsByLayer = groupBy(productsByLayer, 'partitionUUID');

    return productsByLayer;
  };

  const setupMarkers = () => {
    if (leafletRef.current !== null && markerGroup !== null) {
      const { map } = leafletRef.current;

      markerGroup.clearLayers();
      map.removeLayer(markerGroup);

      if (selected.length > 0) {
        const productsByLayer = getProductsByLayer();
        const selectedLayer = Object.keys(productsByLayer);

        const { layers } = currentLayout;

        selectedLayer.forEach((uuid) => {
          const layer = layers.find(({ uuid: layerUUID }) => layerUUID === uuid);

          if (layer) {
            const {
              meta_data: { center },
            } = layer;

            const latLng = Object.values(center);
            const productQty = productsByLayer[uuid].length;

            addLookupProductMarker(latLng, productQty);
          }
        });

        markerGroup.addTo(map);
      }
    }
  };

  useEffect(() => {
    setupMarkers();
  }, [selected, currentLayout, initProducts]);

  const handleChangeTab = (event, newValue) => {
    setLayoutId(newValue);
  };

  const handleSearch = (event) => {
    const searchKeywords = event.target.value.toLowerCase();

    const filteredItems = filteredData.filter((product) => {
      const firstCondi = product.name.toLowerCase().includes(searchKeywords);
      const secCondi = product.retail_price.includes(searchKeywords);
      const thirdCondi = product.barcode_number.includes(searchKeywords);

      if (firstCondi || secCondi || thirdCondi) {
        return true;
      }
      return false;
    });

    setProducts(filteredItems);
  };

  const filterProduct = () => {
    const categoryFilterActivated = selectedCategoryFilter.length > 0;
    const activeStatusFilterActivated = selectedActiveStatusFilter !== null;
    const stockStatusFilterActivated = selectedStockStatusFilter !== null;

    if (categoryFilterActivated || activeStatusFilterActivated || stockStatusFilterActivated) {
      setFilterActivated(true);
      const selectedCatList = selectedCategoryFilter.map(({ uuid }) => uuid);

      const filteredItem = assignedProducts.filter(
        ({ sub_categories: subCat, is_active: isActive, stock_status: stockStatus }) => {
          let validCategory = true;
          let validActiveStatus = true;
          let validStockStatus = true;

          if (categoryFilterActivated) {
            switch (categoryFilterType) {
              case 'any':
                validCategory = subCat.some(({ uuid }) => selectedCatList.includes(uuid));
                break;
              case 'all':
                validCategory = subCat.every(({ uuid }) => selectedCatList.includes(uuid));
                break;
              default:
              // no default
            }
          }

          if (activeStatusFilterActivated) {
            const selectedActiveStatusFlag =
              selectedActiveStatusFilter === 'Active' ? true : false;
            validActiveStatus = isActive === selectedActiveStatusFlag;
          }

          if (stockStatusFilterActivated) {
            validStockStatus = stockStatus === selectedStockStatusFilter;
          }

          return validCategory && validActiveStatus && validStockStatus;
        }
      );
      setFilteredData(filteredItem);
      setProducts(filteredItem);
    } else {
      setFilterActivated(false);
      setFilteredData(assignedProducts);
      setProducts(assignedProducts);
    }
  };

  useEffect(() => {
    filterProduct();
  }, [
    assignedProducts,
    selectedCategoryFilter,
    selectedActiveStatusFilter,
    selectedStockStatusFilter,
    categoryFilterType,
  ]);

  const clearFilters = () => {
    setCategoryFilterType('any');
    setSelectedCategoryFilter([]);
    setSelectedActiveStatusFilter(null);
    setSelectedStockStatusFilter(null);
  };

  const resetAll = () => {
    setSelected([]);
    clearFilters();
  };

  const adjustedProps = {
    ...props,
    layoutId,
    handleChangeTab,
    products,
    selected,
    setSelected,

    setCategoryFilterType,
    setSelectedCategoryFilter,
    setSelectedActiveStatusFilter,
    setSelectedStockStatusFilter,
    categoryFilterType,
    selectedCategoryFilter,
    selectedActiveStatusFilter,
    selectedStockStatusFilter,
    filterActivated,
    clearFilters,
    handleSearch,
    reset: resetAll,
    filteredQuantity: products.length,
  };

  return <Drawer {...adjustedProps} />;
};

export default ProductSearch;

import React, { useState, useEffect } from 'react';

// import icons from 'leaflet-color-number-markers';

import Drawer from './Drawer';

/* eslint-disable no-unneeded-ternary */
const ProductSearch = (props) => {
  const { assignedProducts, currentLayout } = props;

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
    setLayoutId(currentLayout.uuid);
  }, [currentLayout]);

  // useEffect(() => {
  //   if (selected.length > 0) {
  //     const addLookupProductMarker = (latLng, number) => {
  //       const { map, leaflet: L } = leafletRef.current;

  //       const marker = L.marker(latLng, { icon: icons.black.numbers[number] }).addTo(map);

  //       map.removeLayer(marker);

  //       L.marker(latLng, { icon: icons.black.numbers[4] }).addTo(map);
  //     };
  //   }

  //   setLayoutId(currentLayout.uuid);
  // }, [selected]);

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

          // console.log('name:', name);
          // console.log('category:', validCategory);
          // console.log('active:', validActiveStatus);
          // console.log('stock:', validStockStatus);
          // console.log('\n');

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

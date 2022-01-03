import React, { useState, useRef, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { makeStyles } from '@mui/styles';

import ProductSearchHeader from './Header';
import ProductSearchResizer from './Resizer';
import ProductSearchContent from './Content';

const Direction = {
  Top: 'top',
  TopLeft: 'topLeft',
  TopRight: 'topRight',
  Right: 'right',
  Bottom: 'bottom',
  BottomLeft: 'bottomLeft',
  BottomRight: 'bottomRight',
  Left: 'left',
};

const useStyles = makeStyles(() => ({
  paper: {
    position: 'fixed',
    top: 100,
    right: 200,
    width: 450,
    minWidth: '450px !important',
    minHeight: '350px !important',
    maxWidth: '905px !important',
    maxHeight: '95vh !important',
    height: 550,
    zIndex: 1299,
    borderRadius: '12px !important',
    // boxShadow:
    // 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px !important',
    // boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px !important',
    boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px !important',
    overflow: 'hidden',
    backgroundColor: 'rgb(17, 25, 42) !important',
  },
  container: {
    position: 'relative',
    height: '100%',
  },
}));

/* eslint-disable no-unneeded-ternary */
const ProductSearchPaper = (props) => {
  const classes = useStyles();
  const paperRef = useRef(null);
  const contentRef = useRef(null);

  const {
    toggleProductBucket,
    productsRef,
    unassignedProducts,
    initProducts,
    setInitProducts,
    categoryOptions,
  } = props;

  const [selected, setSelected] = useState([]);
  const [categoryFilterType, setCategoryFilterType] = useState('any');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState([]);
  const [selectedActiveStatusFilter, setSelectedActiveStatusFilter] = useState(null);
  const [selectedStockStatusFilter, setSelectedStockStatusFilter] = useState(null);
  const [filterActivated, setFilterActivated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [products, setProducts] = useState(unassignedProducts);

  // console.log('initProducts', initProducts);
  // console.log('products', products);
  // console.log('categoryOptions', categoryOptions);

  const handleDrag = (movementX, movementY) => {
    const paper = paperRef.current;
    if (!paper) return;

    const { x, y } = paper.getBoundingClientRect();

    paper.style.left = `${x + movementX}px`;
    paper.style.top = `${y + movementY}px`;
  };

  const handleResize = (direction, movementX, movementY) => {
    const paper = paperRef.current;
    const content = contentRef.current;
    if (!paper && !contentRef) return;

    const { width, height, x, y } = paper.getBoundingClientRect();

    const contentHeight = height - 125;
    content.style.height = `${contentHeight}px`;

    const resizeTop = () => {
      paper.style.height = `${height - movementY}px`;
      paper.style.top = `${y + movementY}px`;
    };

    const resizeRight = () => {
      paper.style.width = `${width + movementX}px`;
    };

    const resizeBottom = () => {
      paper.style.height = `${height + movementY}px`;
    };

    const resizeLeft = () => {
      paper.style.width = `${width - movementX}px`;
      paper.style.left = `${x + movementX}px`;
    };

    switch (direction) {
      case Direction.TopLeft:
        resizeTop();
        resizeLeft();
        break;

      case Direction.Top:
        resizeTop();
        break;

      case Direction.TopRight:
        resizeTop();
        resizeRight();
        break;

      case Direction.Right:
        resizeRight();
        break;

      case Direction.BottomRight:
        resizeBottom();
        resizeRight();
        break;

      case Direction.Bottom:
        resizeBottom();
        break;

      case Direction.BottomLeft:
        resizeBottom();
        resizeLeft();
        break;

      case Direction.Left:
        resizeLeft();
        break;

      default:
        break;
    }
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

      const filteredItem = unassignedProducts.filter(
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
      setFilteredData(unassignedProducts);
      setProducts(unassignedProducts);
    }
  };

  useEffect(() => {
    filterProduct();
  }, [
    unassignedProducts,
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

  const resetSelectionOnly = () => {
    setSelected([]);
  };

  useEffect(() => {
    resetSelectionOnly();
  }, [initProducts]);

  return (
    <Paper className={classes.paper} ref={paperRef}>
      <Box className={classes.container}>
        <ProductSearchResizer onResize={handleResize} />
        <ProductSearchHeader
          onDrag={handleDrag}
          toggleProductBucket={toggleProductBucket}
          reset={resetAll}
          selectedQty={selected.length}
        />
        <Divider variant="middle" style={{ backgroundColor: 'white' }} />
        <ProductSearchContent
          reset={resetAll}
          initProducts={initProducts}
          setInitProducts={setInitProducts}
          products={products}
          productsRef={productsRef}
          contentRef={contentRef}
          selected={selected}
          setSelected={setSelected}
          categoryOptions={categoryOptions}
          setCategoryFilterType={setCategoryFilterType}
          setSelectedCategoryFilter={setSelectedCategoryFilter}
          setSelectedActiveStatusFilter={setSelectedActiveStatusFilter}
          setSelectedStockStatusFilter={setSelectedStockStatusFilter}
          categoryFilterType={categoryFilterType}
          selectedCategoryFilter={selectedCategoryFilter}
          selectedActiveStatusFilter={selectedActiveStatusFilter}
          selectedStockStatusFilter={selectedStockStatusFilter}
          filteredQuantity={products.length}
          filterActivated={filterActivated}
          clearFilters={clearFilters}
          handleSearch={handleSearch}
        />

        {/* {children} */}
        {/* </ProductSearchContent> */}
      </Box>
    </Paper>
  );
  // return <Paper className="product-search-paper" >Test</Paper>;
};

export default ProductSearchPaper;

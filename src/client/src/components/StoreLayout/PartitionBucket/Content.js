import React, { useState } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Badge from '@mui/material/Badge';
// import List from '@mui/material/List';

import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';

import { makeStyles } from '@mui/styles';

import ProductCard from './ProductCard';
import ProductFilter from '../../Products/ProductFilters';

import '../../../assets/css/productBucketContent.css';

const useStyles = makeStyles(() => ({
  input: {
    borderRadius: '12px !important',
    color: 'white !important',
  },
  notchedOutline: {
    border: '1px solid white !important',
    borderRadius: '12px !important',
  },
  filterBtn: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08) !important',
    },
  },
  badge: {
    // backgroundColor: 'white',
  },
}));

const Content = (props) => {
  const classes = useStyles();
  const {
    layerId,
    currentLayoutId,
    reset,
    products,
    productsRef,
    initProducts,
    setInitProducts,
    contentRef,
    selected,
    setSelected,
    categoryOptions,
    setCategoryFilterType,
    setSelectedCategoryFilter,
    setSelectedActiveStatusFilter,
    setSelectedStockStatusFilter,
    categoryFilterType,
    selectedCategoryFilter,
    selectedActiveStatusFilter,
    selectedStockStatusFilter,
    filteredQuantity,
    filterActivated,
    clearFilters,
    handleSearch,
    highlightPartition,
    removeHighlight,
  } = props;

  // const [productList, setProductList] = useState(products);
  const [openFilter, setOpenFilter] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleClick = (uuid) => {
    const selectedIndex = selected.indexOf(uuid);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, uuid);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleDragStart = (evt, uuid) => {
    const selectedActive = selected.length > 0 && selected.includes(uuid);
    let payload;

    if (selectedActive) {
      const draggables = document.querySelectorAll('[draggable]');

      draggables.forEach((el) => {
        const productId = el.id;
        const isSelectedProduct = selected.includes(productId);

        if (isSelectedProduct) {
          el.style.opacity = '0.4';
        }
      });
    } else {
      evt.currentTarget.style.opacity = '0.4';
    }

    if (selectedActive) {
      payload = JSON.stringify({ sourceId: layerId, payload: selected });
    } else {
      payload = JSON.stringify({ sourceId: layerId, payload: [uuid] });
      setSelected([]);
    }

    evt.dataTransfer.dropEffect = 'copy';
    evt.dataTransfer.setData('dragPayload', payload);
  };

  const handleOnDragEnd = (evt) => {
    const selectedActive = selected.length > 0;

    evt.currentTarget.style.background = '#385D63';

    if (selectedActive) {
      const draggables = document.querySelectorAll('[draggable]');

      draggables.forEach((el) => {
        const productId = el.id;
        const isSelectedProduct = selected.includes(productId);

        if (isSelectedProduct) {
          el.style.opacity = '1';
        }
      });
    } else {
      // evt.currentTarget.style.background = '#385D63';
      evt.currentTarget.style.opacity = '1';
    }
  };

  const handleOnDrop = (event) => {
    console.log('initProducts', initProducts);
    const updatedProducts = [...initProducts];

    const { sourceId, payload } = JSON.parse(event.dataTransfer.getData('dragPayload'));
    event.dataTransfer.clearData();

    if (sourceId === layerId) {
      return;
    }

    payload.forEach((selectedProductUUID) => {
      const selectedProductIndex = updatedProducts.findIndex(
        ({ uuid }) => uuid === selectedProductUUID
      );

      const updatedSelectedProduct = { ...updatedProducts[selectedProductIndex] };
      updatedSelectedProduct.layout_uuid = currentLayoutId;
      updatedSelectedProduct.partition_uuid = layerId;

      // patch and replace update product
      updatedProducts[selectedProductIndex] = updatedSelectedProduct;
    });

    console.log('updatedProducts', updatedProducts);

    productsRef.current = updatedProducts;
    setInitProducts(updatedProducts);
    // console.log(setInitProducts);
  };

  const handleRemove = (productUUID) => {
    const updatedProducts = [...initProducts];

    const selectedProductIndex = updatedProducts.findIndex(({ uuid }) => uuid === productUUID);

    const updatedSelectedProduct = { ...updatedProducts[selectedProductIndex] };
    updatedSelectedProduct.layout_uuid = null;
    updatedSelectedProduct.partition_uuid = null;

    updatedProducts[selectedProductIndex] = updatedSelectedProduct;

    productsRef.current = updatedProducts;
    setInitProducts(updatedProducts);
  };

  const handleOnDragOver = (evt) => {
    evt.preventDefault();
    highlightPartition();
  };

  const handleDragLeave = (evt) => {
    evt.preventDefault();
    removeHighlight();
  };

  const updateSearchInput = (e) => setSearchValue(e.target.value);
  const isSelected = (uuid) => selected.indexOf(uuid) !== -1;
  const handleClickOpen = () => setOpenFilter(true);
  const handleClose = () => setOpenFilter(false);

  return (
    <Grid container sx={{ color: 'white' }}>
      <Grid item xs={10.5} sx={{ pl: 2, pt: 2 }}>
        <TextField
          id="outlined-basic"
          placeholder="Search for product..."
          autoComplete="off"
          variant="outlined"
          size="small"
          style={{ width: '100%' }}
          onChange={handleSearch}
          onInput={updateSearchInput}
          defaultValue={searchValue}
          InputProps={{
            className: classes.input,
            classes: {
              notchedOutline: classes.notchedOutline,
            },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: 'white' }} />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid
        item
        xs={1.5}
        container
        justifyContent="center"
        alignItems="center"
        sx={{ pr: 1.5, pt: 2 }}
      >
        <IconButton classes={{ root: classes.filterBtn }} onClick={handleClickOpen}>
          <Badge
            badgeContent={filterActivated ? products.length : 0}
            classes={{ badge: classes.badge }}
            color="error"
          >
            <FilterListIcon style={{ color: 'white' }} sx={{ fontSize: '1.5rem' }} />
          </Badge>
        </IconButton>
        <ProductFilter
          open={openFilter}
          handleClose={handleClose}
          categoryOptions={categoryOptions}
          setCategoryFilterType={setCategoryFilterType}
          setSelectedCategoryFilter={setSelectedCategoryFilter}
          setSelectedActiveStatusFilter={setSelectedActiveStatusFilter}
          setSelectedStockStatusFilter={setSelectedStockStatusFilter}
          categoryFilterType={categoryFilterType}
          selectedCategoryFilter={selectedCategoryFilter}
          selectedActiveStatusFilter={selectedActiveStatusFilter}
          selectedStockStatusFilter={selectedStockStatusFilter}
          filteredQuantity={filteredQuantity}
          filterActivated={filterActivated}
          clearFilters={clearFilters}
        />
      </Grid>

      <Grid
        container
        ref={contentRef}
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
        onDragLeave={handleDragLeave}
        style={{
          height: '425px',
          marginTop: 8,
          marginBottom: 10,
          width: '100% !important',
          direction: 'rtl',
        }}
      >
        <PerfectScrollbar
          id="product-bucket"
          options={{
            wheelPropagation: false,
            suppressScrollX: false,
          }}
        >
          {products.map((product) => {
            const isProductSelected = isSelected(product.uuid);

            return (
              <Grid key={product.uuid} item xs={12} style={{ direction: 'ltr' }}>
                <ProductCard
                  product={product}
                  handleClick={handleClick}
                  handleDragStart={handleDragStart}
                  handleOnDragEnd={handleOnDragEnd}
                  handleRemove={handleRemove}
                  isProductSelected={isProductSelected}
                  reset={reset}
                />
              </Grid>
            );
          })}
        </PerfectScrollbar>
      </Grid>
    </Grid>
  );
};

export default Content;

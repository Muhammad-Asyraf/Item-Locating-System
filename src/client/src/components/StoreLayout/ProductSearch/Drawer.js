import React, { useState } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';

import { makeStyles } from '@mui/styles';

import ProductFilter from '../../Products/ProductFilters';
import ProductCard from './ProductCard';

const useStyles = makeStyles(() => ({
  drawer: {
    width: 410,
    borderRadius: '12px 0px 0px 12px',
    height: '95% !important',
    top: '2.5% !important',
    boxShadow: 'rgba(99, 115, 129, 0.16) -24px 12px 32px -4px !important',
    backgroundColor: 'rgb(17, 25, 42) !important',
    overflow: 'hidden !important',
  },
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
  defaultTab: {
    color: 'white !important',
  },
  selectedTab: {
    backgroundColor: 'white !important',
    borderRadius: '20px !important',
  },
  btn: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08) !important',
    },
  },
}));

const ProductDrawer = (props) => {
  const classes = useStyles();

  const {
    open,
    toggleDrawer,
    layoutId,
    handleChangeTab,
    products,
    // initProducts,
    layouts,
    reset,
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
  } = props;

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

  const updateSearchInput = (e) => setSearchValue(e.target.value);
  const isSelected = (uuid) => selected.indexOf(uuid) !== -1;
  const handleClickOpen = () => setOpenFilter(true);
  const handleClose = () => setOpenFilter(false);

  const handleReset = () => {
    setSearchValue('');
    reset();
  };

  const handleCloseDrawer = () => {
    setSearchValue('');
    toggleDrawer();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleCloseDrawer}
      sx={{ zIndex: 1300 }}
      classes={{
        paper: classes.drawer,
      }}
      ModalProps={{ BackdropProps: { style: { backgroundColor: 'transparent' } } }}
    >
      <Grid container sx={{ color: 'white', padding: 2, pr: 1.5 }}>
        <Grid item xs={12} container>
          <Grid item xs={7} container justifyContent="flex-start" alignItems="center">
            &nbsp;
            <ManageSearchRoundedIcon sx={{ fontSize: '1.7rem' }} />
            &nbsp;Product Search
          </Grid>
          <Grid item xs={5} container justifyContent="flex-end" alignItems="center">
            {selected.length > 0 && (
              <span
                style={{
                  fontSize: '0.8rem',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  borderRadius: 8,
                  padding: '5px 8px 5px 8px',
                  marginRight: 4,
                }}
              >
                <b>{selected.length} &nbsp;selected</b>
              </span>
            )}
            <IconButton classes={{ root: classes.btn }} onClick={handleReset}>
              <RefreshRoundedIcon style={{ color: 'white' }} sx={{ fontSize: '1.1rem' }} />
            </IconButton>
            <IconButton classes={{ root: classes.btn }} onClick={toggleDrawer}>
              <ClearRoundedIcon style={{ color: 'white' }} sx={{ fontSize: '1.1rem' }} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider style={{ backgroundColor: 'white', width: '98%' }} sx={{ mt: 0.5 }} />
        </Grid>
        <Grid item xs={12} sx={{ mt: 1 }}>
          <TabContext value={layoutId}>
            <TabList
              onChange={handleChangeTab}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ color: 'white ' }}
              classes={{ indicator: classes.selectedTab }}
            >
              {layouts.map(({ uuid, label }) => (
                <Tab
                  key={label}
                  disableRipple
                  label={label}
                  value={uuid}
                  className={classes.defaultTab}
                />
              ))}
            </TabList>

            <Grid container sx={{ mt: 2 }}>
              <Grid item xs={10.5}>
                <TextField
                  id="outlined-basic"
                  placeholder="Search for product..."
                  autoComplete="off"
                  variant="outlined"
                  size="small"
                  style={{ width: '100%' }}
                  onChange={handleSearch}
                  onInput={updateSearchInput}
                  value={searchValue}
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
              <Grid item xs={1.5} container justifyContent="center" alignItems="center">
                <IconButton classes={{ root: classes.filterBtn }} onClick={handleClickOpen}>
                  <Badge
                    badgeContent={filterActivated ? products.length : 0}
                    classes={{ badge: classes.badge }}
                    color="error"
                  >
                    <FilterListIcon style={{ color: 'white' }} sx={{ fontSize: '1.2rem' }} />
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
            </Grid>
            {layouts.map(({ uuid: layoutUUID }) => (
              <TabPanel
                key={layoutUUID}
                value={layoutUUID}
                style={{ height: '69vh', marginTop: 11, padding: 0 }}
              >
                <PerfectScrollbar
                  id="product-bucket"
                  options={{
                    wheelPropagation: false,
                    suppressScrollX: false,
                  }}
                >
                  <Grid container spacing={1}>
                    {products.map((product) => {
                      const { uuid: productUUID, layer } = product;
                      // const { layout_uuid: layoutID, uuid: productUUID, layer } = product;
                      const isProductSelected = isSelected(productUUID);

                      if (layer.layout_uuid === layoutUUID) {
                        return (
                          <Grid item xs={12} key={productUUID}>
                            <ProductCard
                              product={product}
                              handleClick={handleClick}
                              isProductSelected={isProductSelected}
                            />
                          </Grid>
                        );
                      }
                      return null;
                    })}
                  </Grid>
                </PerfectScrollbar>
              </TabPanel>
            ))}
          </TabContext>
        </Grid>
        {/* <Grid item xs={12} container sx={{ mt: 2 }}>
          <Grid item xs={10.5}>
            <TextField
              id="outlined-basic"
              placeholder="Search for product..."
              autoComplete="off"
              variant="outlined"
              size="small"
              style={{ width: '100%' }}
              // onChange={handleSearch}
              // onInput={updateSearchInput}
              // defaultValue={searchValue}
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
          <Grid item xs={1.5} container justifyContent="center" alignItems="center">
            <IconButton classes={{ root: classes.filterBtn }}>
              <FilterListIcon style={{ color: 'white' }} sx={{ fontSize: '1.2rem' }} />
            </IconButton>
          </Grid>
        </Grid> */}
      </Grid>
    </Drawer>
  );
};

export default ProductDrawer;

import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';

import { makeStyles } from '@mui/styles';

import ProductBucket from './ProductBucket';
import ProductDrawer from './ProductSearch/Drawer';

const useStyles = makeStyles(() => ({
  sideMenu: {
    backdropFilter: 'blur(6px)',
    backgroundColor: 'rgba(255, 255, 255, 0.64)',
    right: '0px',
    top: ' 50%',
    position: 'fixed',
    marginTop: '-24px',
    padding: 0,
    zIndex: '1202',
    overflow: 'hidden',
    borderRadius: '10px 0px 0px 10px',
    boxShadow:
      // 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px !important',
      'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px !important',
  },
  sideMenuButton: {
    padding: 0,
    minWidth: 0,
    backgroundColor: 'transparent',
  },
  productSearch: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
  productBucket: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
}));

const SideMenu = (props) => {
  const classes = useStyles();

  const [openBucket, setOpenBucket] = useState(false);
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);

  const { initProducts, setInitProducts, categoryOptions } = props;
  // const { products, setProducts, initProducts, categoryOptions } = props;

  // console.log('layouts', layouts);
  // console.log('currentLayout', currentLayout);

  const toggleProductBucket = () => setOpenBucket(!openBucket);
  const toggleProductSearch = () => setOpenSearchDrawer(!openSearchDrawer);

  return (
    <>
      <Box className={classes.sideMenu}>
        <Box className={classes.productSearch}>
          <Button
            type="button"
            className={classes.sideMenuButton}
            onClick={toggleProductSearch}
          >
            <SearchRoundedIcon sx={{ fontSize: '1.9rem' }} />
          </Button>
        </Box>
        <Box className={classes.productBucket}>
          <Button
            type="button"
            className={classes.sideMenuButton}
            onClick={toggleProductBucket}
          >
            <ShoppingBasketRoundedIcon sx={{ fontSize: '1.8rem' }} />
          </Button>
        </Box>
      </Box>
      <ProductDrawer open={openSearchDrawer} toggleDrawer={toggleProductSearch} />
      {openBucket && (
        <ProductBucket
          toggleProductBucket={toggleProductBucket}
          initProducts={initProducts}
          setInitProducts={setInitProducts}
          categoryOptions={categoryOptions}
        />
      )}
    </>
  );
};

export default SideMenu;

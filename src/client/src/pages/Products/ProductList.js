import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { makeStyles } from '@mui/styles';

import AddIcon from '@mui/icons-material/Add';

import {
  selectProducts,
  processed as productProccessed,
  selectIsLoading as productLoading,
  // processingRequest,
  quickUpdateProducts,
} from '../../redux/features/productSlice';
import {
  processed,
  processingRequest as processingCategory,
  selectIsLoading as categoryLoading,
} from '../../redux/features/categorySlice';
import { setNewNotification } from '../../redux/features/notificationSlice';

import {
  getProducts,
  deleteProduct,
  deleteMultipleProducts,
  toggleProductStatus,
  patchMultipleProducts,
} from '../../redux/thunks/productThunk';
import { getSubcategories } from '../../redux/thunks/categoryThunk';

import ProductListTable from '../../components/Products/ProductListTable';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  linear: {
    position: 'relative',
    top: '10px !important',
    left: '-45px !important',
    width: '100vw',
    height: '7px !important',
  },
  addButton: {
    height: '50px',
    width: 200,
    color: 'white',
    fontSize: 18,
    marginTop: 20,
    marginLeft: '50% !important',
    paddingRight: 20,
    borderRadius: '8px',
    boxShadow: 'rgb(30 136 229 / 24%) 0px 8px 16px 0px',
    textTransform: 'none',
  },
}));

/* eslint-disable no-unneeded-ternary */
const ProductList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initProduct = useSelector(selectProducts);
  const isProductLoading = useSelector(productLoading);
  const isCategoryLoading = useSelector(categoryLoading);

  const storeUrl = localStorage.getItem('storeUrl');
  const storeName = localStorage.getItem('storeName');

  const [products, setProducts] = useState([]);
  const [triggeredOnce, setTriggeredOnce] = useState(false);

  useEffect(() => {
    (async () => {
      dispatch(processingCategory());
      await dispatch(getProducts());
      await dispatch(getSubcategories());
      dispatch(processed());
      dispatch(productProccessed());
    })();
  }, []);

  useEffect(() => {
    if (initProduct.length > 0 && !triggeredOnce) {
      setProducts(initProduct);
      setTriggeredOnce(true);
    }
  }, [initProduct]);

  const handleEdit = () => {
    dispatch(processingCategory());
  };

  const handleDelete = async (uuid) => {
    const newInitProduct = initProduct.filter((item) => item.uuid !== uuid);
    const newProducts = products.filter((item) => item.uuid !== uuid);

    const { type } = await dispatch(deleteProduct({ uuid }));

    if (type.includes('fulfilled')) {
      dispatch(quickUpdateProducts({ products: newInitProduct }));
      setProducts(newProducts);

      await dispatch(
        setNewNotification({
          message: 'Product successfully deleted',
          backgroundColor: 'green',
          severity: 'success',
        })
      );
    }
  };

  const handleMultipleDelete = async (selected, setSelected) => {
    const newInitProduct = initProduct.filter(({ uuid }) => !selected.includes(uuid));
    const newProducts = products.filter(({ uuid }) => !selected.includes(uuid));
    const payload = { listToDelete: selected };

    const { type } = await dispatch(deleteMultipleProducts({ payload }));

    if (type.includes('fulfilled')) {
      dispatch(quickUpdateProducts({ products: newInitProduct }));
      setProducts(newProducts);
      setSelected([]);

      await dispatch(
        setNewNotification({
          message: 'All selected products successfully deleted',
          backgroundColor: 'green',
          severity: 'success',
        })
      );
    }
  };

  const handleToggleStatus = async (uuid, status) => {
    const payload = { is_active: !status };
    const newInitProduct = initProduct.map((product) => {
      if (product.uuid === uuid) {
        return {
          ...product,
          is_active: !status,
        };
      }
      return product;
    });

    const newProducts = products.map((product) => {
      if (product.uuid === uuid) {
        return {
          ...product,
          is_active: !status,
        };
      }
      return product;
    });

    const { type } = await dispatch(toggleProductStatus({ uuid, payload }));

    if (type.includes('fulfilled')) {
      dispatch(quickUpdateProducts({ products: newInitProduct }));
      setProducts(newProducts);

      await dispatch(
        setNewNotification({
          message: 'Product active status successfully updated',
          backgroundColor: 'green',
          severity: 'success',
        })
      );
    }
  };

  const handleMultipleToggleStatus = async (
    selected,
    status,
    setSelected,
    handleClose
  ) => {
    const updatedStatus = status === 'activate' ? true : false;
    const payload = {
      listToUpdate: selected,
      updatedPayload: {
        is_active: updatedStatus,
      },
    };

    const newInitProduct = initProduct.map((product) => {
      if (selected.includes(product.uuid)) {
        return {
          ...product,
          is_active: updatedStatus,
        };
      }
      return product;
    });

    const newProducts = products.map((product) => {
      if (selected.includes(product.uuid)) {
        return {
          ...product,
          is_active: updatedStatus,
        };
      }
      return product;
    });

    const { type } = await dispatch(patchMultipleProducts({ payload }));

    if (type.includes('fulfilled')) {
      dispatch(quickUpdateProducts({ products: newInitProduct }));
      setProducts(newProducts);
      setSelected([]);
      handleClose();

      await dispatch(
        setNewNotification({
          message: 'All selected products status successfully updated',
          backgroundColor: 'green',
          severity: 'success',
        })
      );
    }
  };

  // console.log('product Data', initProduct);
  // console.log('products', products);

  const handleMultipleStockStatus = async (
    selected,
    status,
    setSelected,
    handleClose
  ) => {
    const payload = {
      listToUpdate: selected,
      updatedPayload: {
        stock_status: status,
      },
    };

    const newInitProduct = initProduct.map((product) => {
      if (selected.includes(product.uuid)) {
        return {
          ...product,
          stock_status: status,
        };
      }
      return product;
    });

    const newProducts = products.map((product) => {
      if (selected.includes(product.uuid)) {
        return {
          ...product,
          stock_status: status,
        };
      }
      return product;
    });

    // console.log('newInitProduct', newInitProduct);
    // console.log('newProducts', newProducts);

    const { type } = await dispatch(patchMultipleProducts({ payload }));

    if (type.includes('fulfilled')) {
      dispatch(quickUpdateProducts({ products: newInitProduct }));
      setProducts(newProducts);
      setSelected([]);
      handleClose();

      await dispatch(
        setNewNotification({
          message: 'All selected products status successfully updated',
          backgroundColor: 'green',
          severity: 'success',
        })
      );
    }
  };

  if (isCategoryLoading) {
    return (
      <div>
        <LinearProgress
          className={classes.linear}
          sx={{
            backgroundImage:
              'linear-gradient(-225deg, #473B7B 0%, #003366 51%, #30D2BE 100%)',
          }}
        />
      </div>
    );
  }

  return (
    <Grid container spacing={2} style={{ marginTop: '30px' }}>
      <Grid item xs={12} container>
        <Grid item xs={8}>
          <h1 style={{ marginBottom: 3, marginTop: 3 }}>Product Catalogue</h1>
          <Breadcrumbs separator="•" aria-label="breadcrumb">
            <div style={{ fontSize: '0.875rem' }}>{storeName}&nbsp;&nbsp;</div>,
            <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;Catalogue&nbsp;&nbsp;</div>,
            <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;Product&nbsp;&nbsp;</div>,
            <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;List</div>
          </Breadcrumbs>
        </Grid>
        <Grid
          item
          sm={4}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            variant="contained"
            color="primary"
            type="button"
            component={Link}
            to={`/${storeUrl}/product/create`}
            sx={{
              textTransform: 'none',
              fontSize: '0.95rem',
              borderRadius: 3,
              height: 50,
              paddingRight: 3,
              boxShadow: 'rgba(53, 132, 167, 0.44) 0px 8px 16px 0px !important',
            }}
          >
            <AddIcon style={{ marginRight: 10 }} fontSize="small" /> New Product
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ProductListTable
          initProduct={initProduct}
          products={products}
          productLoading={isProductLoading}
          setProducts={setProducts}
          handleDelete={handleDelete}
          onMultipleDelete={handleMultipleDelete}
          onMultipleActiveStatusUpdate={handleMultipleToggleStatus}
          onMultipleStockStatusUpdate={handleMultipleStockStatus}
          handleToggleStatus={handleToggleStatus}
          handleEdit={handleEdit}
        />
      </Grid>
    </Grid>
  );
};

export default ProductList;

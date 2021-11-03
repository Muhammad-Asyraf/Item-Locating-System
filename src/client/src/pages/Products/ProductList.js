import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';

import AddIcon from '@mui/icons-material/Add';

import ProductListTable from '../../components/Products/ProductListTable';

import {
  selectProducts,
  selectIsLoading,
  processed,
} from '../../redux/features/productSlice';

import {
  getProducts,
  deleteProduct,
  deleteMultipleProducts,
} from '../../redux/thunks/productThunk';

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
  circular: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    width: '80vw',
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

const ProductList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const productData = useSelector(selectProducts);
  const isLoading = useSelector(selectIsLoading);
  const storeUrl = localStorage.getItem('storeUrl');
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    (async () => {
      await dispatch(getProducts());
      dispatch(processed());
    })();
  }, []);

  useEffect(() => {
    if (productData.length > 0) {
      setProducts(productData);
    }
  }, [productData]);

  const handleDelete = async (uuid) => {
    const newProductList = products.filter((item) => item.uuid !== uuid);
    await dispatch(deleteProduct({ uuid }));
    setProducts(newProductList);
  };

  const handleMultipleDelete = async (selected, setSelected) => {
    const newProductList = products.filter(({ uuid }) => !selected.includes(uuid));

    await dispatch(deleteMultipleProducts({ listToDelete: selected }));
    setProducts(newProductList);
    setSelected([]);
  };

  const handleToggleStatus = async (uuid, status) => {
    try {
      const payload = {
        is_active: !status,
      };
      const endpointURL = `/api/backoffice/product-service/product/${uuid}`;
      await axios.patch(endpointURL, payload);

      const newProductList = products.map((product) => {
        if (product.uuid === uuid) {
          return {
            ...product,
            is_active: !status,
          };
        }
        return product;
      });
      setProducts(newProductList);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <div className={classes.circular}>
        <CircularProgress size={70} color="secondary" />
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={2} style={{ marginTop: '30px' }}>
        <Grid item sm={12} md={8}>
          <h1>Products</h1>
          <p>Add, view and edit your products all in one place.</p>
        </Grid>
        <Grid item sm={12} md={4}>
          <Button
            variant="contained"
            color="primary"
            type="button"
            className={classes.addButton}
            component={Link}
            to={`/${storeUrl}/product/create`}
          >
            <AddIcon style={{ marginRight: 10 }} /> Add Product
          </Button>
        </Grid>
      </Grid>
      <ProductListTable
        products={products}
        handleDelete={handleDelete}
        onMultipleDelete={handleMultipleDelete}
        handleToggleStatus={handleToggleStatus}
      />
    </div>
  );
};

export default ProductList;

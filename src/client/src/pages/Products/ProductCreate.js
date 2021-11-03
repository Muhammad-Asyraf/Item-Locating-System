import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

import { makeStyles } from '@mui/styles';

import {
  selectIsLoading,
  processingRequest,
  processed,
} from '../../redux/features/productSlice';
import { addProduct } from '../../redux/thunks/productThunk';
import { selectItems } from '../../redux/features/itemSlice';
import { getItems } from '../../redux/thunks/itemThunk';
import { selectAuthHeader } from '../../redux/features/authSlice';

import ProductForm from '../../components/Products/ProductForm';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

const ProductCreate = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const storeUrl = localStorage.getItem('storeUrl');
  const isLoading = useSelector(selectIsLoading);
  const authHeader = useSelector(selectAuthHeader);
  const reduxItem = useSelector(selectItems);

  useEffect(() => {
    (async () => {
      dispatch(processingRequest());
      await dispatch(getItems(authHeader));
      dispatch(processed());
    })();
  }, []);

  const handleSubmit = async (payload) => {
    const { type } = await dispatch(addProduct({ payload, authHeader }));

    if (type.includes('fulfilled')) {
      history.push(`/${storeUrl}/product/list`);
    }

    dispatch(processed());
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
        <Grid item sm={12} md={10}>
          <h1>Add new product </h1>
        </Grid>
      </Grid>
      <ProductForm reduxItem={reduxItem} onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default ProductCreate;

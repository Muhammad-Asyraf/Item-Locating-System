import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';

import {
  selectIsLoading,
  processingRequest,
  processed,
} from '../../redux/features/productSlice';
import { addProduct } from '../../redux/thunks/productThunk';
import { selectItems } from '../../redux/features/itemSlice';
import { getItems } from '../../redux/thunks/itemThunk';

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
  const isLoading = useSelector(selectIsLoading);
  const reduxItem = useSelector(selectItems);

  useEffect(() => {
    (async () => {
      dispatch(processingRequest());
      await dispatch(getItems());
      dispatch(processed());
    })();
  }, []);

  const handleSubmit = async (payload) => {
    const { type } = await dispatch(addProduct(payload));

    if (type.includes('fulfilled')) {
      history.push('/store-slug/product/list');
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

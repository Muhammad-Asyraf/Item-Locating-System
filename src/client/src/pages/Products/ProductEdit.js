import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';

import {
  selectIsLoading,
  processingRequest,
  processed,
} from '../../redux/features/productSlice';
import { updateProduct } from '../../redux/thunks/productThunk';
import { selectItems } from '../../redux/features/itemSlice';
import { getItems } from '../../redux/thunks/itemThunk';

import ProductEditForm from '../../components/Products/ProductEditForm';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  circular: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    width: '80vw',
  },
}));

const ProductEdit = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(selectIsLoading);
  const reduxItem = useSelector(selectItems);
  const [productItems, setProductItems] = useState({
    items: [],
    inputValue: '',
    selectedItems: [],
  });
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    description: '',
    retail_price: '',
    selling_price: '',
    items: [],
  });

  const { match } = props;

  const getProductByUUID = async (uuid) => {
    try {
      const endpointURL = `/api/backoffice/product-service/product/${uuid}`;
      const res = await axios.get(endpointURL);
      setCurrentProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      dispatch(processingRequest());
      await getProductByUUID(match.params.uuid);
      await dispatch(getItems());
      dispatch(processed());
    })();
  }, []);

  /* eslint-disable arrow-body-style */
  useEffect(() => {
    const newItems = reduxItem.filter(
      (item) => !currentProduct.items.some((item_) => item_.uuid === item.uuid)
    );
    setProductItems({
      items: newItems,
      inputValue: '',
      selectedItems: [...currentProduct.items],
    });
  }, [reduxItem]);

  const handleSubmit = async (payload) => {
    const { type } = await dispatch(updateProduct(payload));

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
          <h1>Edit product </h1>
        </Grid>
      </Grid>
      <ProductEditForm
        onSubmit={handleSubmit}
        productItems={productItems}
        setProductItems={setProductItems}
        currentProduct={currentProduct}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProductEdit;

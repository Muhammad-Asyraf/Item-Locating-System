import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';

import {
  // selectItems,
  selectIsLoading,
  processingRequest,
  processed,
} from '../redux/features/productSlice';
import { updateProduct } from '../redux/thunks/productThunk';

import { selectItems } from '../redux/features/itemSlice';
import { getItems } from '../redux/thunks/itemThunk';

import MultiChipSelect from './MultiChipSelect';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    padding: 30,
    marginTop: 20,
    marginBottom: theme.spacing(2),
    boxShadow:
      'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px',
    borderRadius: '16px',
  },
  form: {
    '& > *': {
      marginTop: '20px',
      marginBottom: '20px',
      '& fieldset': {
        borderRadius: '8px',
      },
    },
    width: '100%',
  },
  submitButton: {
    height: '55px',
    width: '15%',
    color: 'white',
    marginTop: '15px',
    borderRadius: '10px',
    fontSize: 18,
    boxShadow: 'rgb(30 136 229 / 24%) 0px 8px 16px 0px',
    textTransform: 'none',
  },
  inputFields: {
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

  const nameRef = useRef();
  const descriptionRef = useRef();
  const retailPriceRef = useRef();
  const sellingPriceRef = useRef();

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

  const addSelectedItem = (item) => {
    setProductItems({
      items: productItems.items.filter((i) => i.uuid !== item.uuid),
      inputValue: '',
      selectedItems: [...productItems.selectedItems, item],
    });
  };

  const removeSelectedItem = (item) => {
    setProductItems({
      items: [...productItems.items, item],
      inputValue: '',
      selectedItems: productItems.selectedItems.filter((i) => i !== item),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      uuid: currentProduct.uuid,
      payload: {
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        is_active: true,
        retail_price: retailPriceRef.current.value,
        selling_price: sellingPriceRef.current.value,
        items: productItems.selectedItems.map((item) => ({ uuid: item.uuid })),
      },
    };

    const { type } = await dispatch(updateProduct(data));

    if (type.includes('fulfilled')) {
      history.push('/dashboard/product/list');
    }
    dispatch(processed());
  };

  const handleChange = (selectedItem) => {
    if (productItems.selectedItems.includes(selectedItem)) {
      removeSelectedItem(selectedItem);
    } else {
      addSelectedItem(selectedItem);
    }
  };

  const handleChangeInput = (inputVal) => {
    setProductItems({
      ...productItems,
      inputValue: inputVal,
    });
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
      <Paper className={classes.paper}>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          autoComplete="on"
          style={{ flexGrow: 1 }}
        >
          <Grid container spacing={2} style={{ marginTop: '0px' }}>
            <Grid item xs={12}>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                // error={fullName.error !== false}
                // helperText={fullName.error}
                defaultValue={currentProduct.name}
                inputRef={nameRef}
                className={classes.inputFields}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                // onBlur={() => validateEmail(true)}
                // onChange={validateEmail}
                // error={email.error !== false}
                // helperText={email.error}
                defaultValue={currentProduct.description}
                inputRef={descriptionRef}
                className={classes.inputFields}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="retail_price"
                label="Retail Price"
                variant="outlined"
                // onBlur={() => validateEmail(true)}
                // onChange={validateEmail}
                // error={email.error !== false}
                // helperText={email.error}
                defaultValue={currentProduct.retail_price}
                inputRef={retailPriceRef}
                className={classes.inputFields}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="selling_price"
                label="Selling Price"
                variant="outlined"
                // onBlur={() => validateEmail(true)}
                // onChange={validateEmail}
                // error={email.error !== false}
                // helperText={email.error}
                defaultValue={currentProduct.selling_price}
                inputRef={sellingPriceRef}
                className={classes.inputFields}
              />
            </Grid>
            <Grid item xs={12}>
              <MultiChipSelect
                onInputValueChange={handleChangeInput}
                inputValue={productItems.inputValue}
                availableItems={productItems.items}
                selectedItem={productItems.selectedItems}
                onChange={handleChange}
                onRemoveItem={removeSelectedItem}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isLoading === true}
                className={classes.submitButton}
              >
                {isLoading ? (
                  <CircularProgress size={20}> </CircularProgress>
                ) : (
                  <>Edit Product</>
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default ProductEdit;

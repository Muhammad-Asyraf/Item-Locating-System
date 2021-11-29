import React, { useRef, useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { makeStyles } from '@mui/styles';

import MultiChipSelect from '../Products/MultiChipSelect';

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
}));

const ProductForm = (props) => {
  const classes = useStyles();
  const { items, onSubmit, isLoading } = props;

  const nameRef = useRef();
  const descriptionRef = useRef();
  const retailPriceRef = useRef();
  const sellingPriceRef = useRef();
  const [productItems, setProductItems] = useState({
    items: [],
    inputValue: '',
    selectedItems: [],
  });

  useEffect(() => {
    setProductItems({
      ...productItems,
      items,
    });
  }, [items]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      is_active: true,
      retail_price: retailPriceRef.current.value,
      selling_price: sellingPriceRef.current.value,
      items: productItems.selectedItems.map((item) => ({ uuid: item.uuid })),
    };

    onSubmit(payload);
  };

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

  return (
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
                <>Add Product</>
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ProductForm;

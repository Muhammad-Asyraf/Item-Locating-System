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
} from '../redux/features/itemSlice';
import { updateItem } from '../redux/thunks/itemThunk';

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

const ItemEdit = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(selectIsLoading);
  // const items = useSelector(selectItems);
  const [currentItem, setCurrentItem] = useState({
    name: '',
    barcode_number: '',
    quantity: '',
    descriptions: '',
    wholesale_price: '',
  });

  const { match } = props;

  const nameRef = useRef();
  const barcodeNumberRef = useRef();
  const quantityRef = useRef();
  const descriptionRef = useRef();
  const wholesalePriceRef = useRef();

  const getItemByUUID = async (uuid) => {
    try {
      const endpointURL = `/api/backoffice/item-service/item/${uuid}`;
      const res = await axios.get(endpointURL);
      setCurrentItem(res.data);
      dispatch(processed());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(processingRequest());
    getItemByUUID(match.params.uuid);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      uuid: match.params.uuid,
      payload: {
        name: nameRef.current.value,
        barcode_number: barcodeNumberRef.current.value,
        quantity: quantityRef.current.value,
        descriptions: descriptionRef.current.value,
        wholesale_price: wholesalePriceRef.current.value,
      },
    };
    const { type } = await dispatch(updateItem(data));

    if (type.includes('fulfilled')) {
      history.push('/dashboard/item/list');
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
          <h1>Edit item </h1>
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
                defaultValue={currentItem.name}
                inputRef={nameRef}
                className={classes.inputFields}
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="barcode_number"
                label="Barcode"
                variant="outlined"
                // onBlur={() => validateEmail(true)}
                // onChange={validateEmail}
                // error={email.error !== false}
                // helperText={email.error}
                defaultValue={currentItem.barcode_number}
                inputRef={barcodeNumberRef}
                className={classes.inputFields}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="quantity"
                label="Quantity"
                variant="outlined"
                // onBlur={() => validateEmail(true)}
                // onChange={validateEmail}
                // error={email.error !== false}
                // helperText={email.error}
                defaultValue={currentItem.quantity}
                inputRef={quantityRef}
                className={classes.inputFields}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="descriptions"
                label="Descriptions"
                variant="outlined"
                // onBlur={() => validateEmail(true)}
                // onChange={validateEmail}
                // error={email.error !== false}
                // helperText={email.error}
                defaultValue={currentItem.descriptions}
                inputRef={descriptionRef}
                className={classes.inputFields}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="wholesale_price"
                label="Wholesale Price"
                variant="outlined"
                // onBlur={() => validateEmail(true)}
                // onChange={validateEmail}
                // error={email.error !== false}
                // helperText={email.error}
                defaultValue={currentItem.wholesale_price}
                inputRef={wholesalePriceRef}
                className={classes.inputFields}
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
                  <>Update Item</>
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default ItemEdit;

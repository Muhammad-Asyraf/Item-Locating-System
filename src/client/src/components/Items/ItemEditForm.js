import React, { useRef } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';

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

const ItemEdit = (props) => {
  const classes = useStyles();
  const { match, onSubmit, currentItem, isLoading } = props;

  const nameRef = useRef();
  const barcodeNumberRef = useRef();
  const quantityRef = useRef();
  const descriptionRef = useRef();
  const wholesalePriceRef = useRef();

  const handleSubmit = (e) => {
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

    onSubmit(data);
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
  );
};

export default ItemEdit;

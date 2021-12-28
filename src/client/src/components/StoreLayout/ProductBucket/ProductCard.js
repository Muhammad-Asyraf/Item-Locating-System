import React from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// import ListItemButton from '@mui/material/ListItemButton';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  input: {
    borderRadius: '12px !important',
    color: 'white !important',
  },
  listItem: {
    // padding: '0px 8x 0px 0px  !important',
  },
  paper: {
    // width: '100% !important',
    borderRadius: '10px !important',
    backgroundColor: '#385D63 !important',
    color: 'white !important',
    cursor: 'pointer',
    margin: '10px 15px 10px 15px',
    // '&:hover': {
    //   backgroundColor: '#2c484d !important',
    //   // backgroundColor: '#203538 !important',
    //   // backgroundColor: 'rgba(255,255,255, 0.1) !important',
    // },
  },
  sideStyle: {
    borderRadius: '10px 0px 0px 10px',
    backgroundColor: '#719C96',
    maxWidth: '10px !important',
  },
  circleStatus: {
    height: '13px',
    width: '13px',
    borderRadius: '50%',
    display: 'inline-block',
    position: 'relative',
    top: '1.5px',
  },
}));

/* eslint-disable no-shadow */
/* eslint-disable arrow-body-style */
const ProductCard = (props) => {
  const classes = useStyles();

  const { product, handleClick, handleDragStart, handleOnDragEnd, isProductSelected } = props;

  const onDragStart = (evt) => {
    // const { background } = evt.currentTarget.style;
    // evt.currentTarget.style.backgroundColor = 'white';

    // setTimeout(
    //   ((background) => {
    //     return () => {
    //       document.getElementById(product.uuid).style.background = background;
    //     };
    //   })(background),
    //   0.5
    // );

    handleDragStart(evt, product.uuid);
  };

  const stockStatusChip = (stockStatus) => {
    switch (stockStatus) {
      case 'In Stock':
        return (
          <span className={classes.circleStatus} style={{ backgroundColor: '#39A388' }} />
        );
      case 'Low Stock':
        return (
          <span className={classes.circleStatus} style={{ backgroundColor: '#F0A500' }} />
        );
      default:
        return (
          <span className={classes.circleStatus} style={{ backgroundColor: '#FF5151' }} />
        );
    }
  };

  return (
    // <ListItemButton className={classes.listItem}>
    <Paper
      id={product.uuid}
      className={classes.paper}
      draggable
      onDragStart={onDragStart}
      onDragEnd={(evt) => {
        console.log('WTF so you do triggered?', evt.dataTransfer.dropEffect);
        handleOnDragEnd(evt);
      }}
      onClick={() => handleClick(product.uuid)}
      // style={{
      //   backgroundColor: isProductSelected ? 'white' : '#385D63',
      //   color: isProductSelected ? 'black' : 'white',
      // }}
    >
      <Grid container>
        <Grid
          item
          xs={0.4}
          className={classes.sideStyle}
          style={{ backgroundColor: isProductSelected && 'white' }}
          // style={{ backgroundColor: isProductSelected && '#bce8e2' }}
        >
          &nbsp;
        </Grid>
        <Grid item xs={11.5} sx={{ padding: 1, paddingLeft: 1.5 }} container spacing={0.2}>
          <Grid item xs={12}>
            {product.name}&nbsp;&nbsp;
          </Grid>
          <Grid item xs={12}>
            <Divider
              style={{ backgroundColor: 'rgba(0,0,0, 0.1)', marginBottom: 5, marginTop: 5 }}
            />
          </Grid>
          <Grid item xs={12}>
            {/* <>Product Code:</>&nbsp; */}
            <span
              style={{
                backgroundColor: 'white',
                // backgroundColor: '#8199A9',
                color: 'black',
                borderRadius: 10,
                padding: '2px 10px',
                fontSize: '0.85rem',
              }}
            >
              UPC: # {product.barcode_number}
            </span>
            &nbsp;&nbsp;
            <span
              style={{
                color: 'black',
                borderRadius: 10,
                padding: '2px 10px',
                fontSize: '0.85rem',
                backgroundColor: 'white',
              }}
            >
              {stockStatusChip(product.stock_status)}
              &nbsp;&nbsp;{product.stock_status}
            </span>
          </Grid>

          <Grid item xs={12} container>
            {product.sub_categories.map((cat) => (
              <Grid
                item
                key={cat.uuid}
                style={{ marginRight: 5, marginTop: 4, marginBottom: 3 }}
              >
                <Chip
                  size="small"
                  label={cat.name}
                  style={{ backgroundColor: '#8199A9', padding: '0px 5px' }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    // </ListItemButton>
  );
};

export default ProductCard;

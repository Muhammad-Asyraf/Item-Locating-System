import React, { useState } from 'react';

import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

import '../../../assets/css/swiper_override.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import PhotoSizeSelectActualRoundedIcon from '@mui/icons-material/PhotoSizeSelectActualRounded';

import { makeStyles } from '@mui/styles';

import ImageModal from '../../Images/ImageModal';

SwiperCore.use([Pagination, Navigation]);

const useStyles = makeStyles(() => ({
  paper: {
    // width: '100% !important',
    borderRadius: '10px !important',
    backgroundColor: '#385D63 !important',
    color: 'white !important',
    cursor: 'pointer',
    // margin: '10px 15px 10px 15px',
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

  const { product, handleClick, isProductSelected } = props;

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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

  const handleCardClick = ({ target: { tagName, id } }) => {
    if (tagName !== 'path' && id === '') {
      handleClick(product.uuid);
    }
  };

  return (
    <Paper
      id={product.uuid}
      className={classes.paper}
      onClick={handleCardClick}
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
        <Grid
          item
          xs={11.5}
          sx={{ padding: 1, paddingLeft: 1.5, paddingRight: 0 }}
          container
          spacing={0.2}
        >
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
            <span style={{ position: 'absolute', marginLeft: 8 }}>
              {product.images.length > 0 && (
                <PhotoSizeSelectActualRoundedIcon
                  id="card-image"
                  style={{ color: 'white' }}
                  onClick={handleOpenModal}
                />
              )}
            </span>
            <ImageModal
              images={product.images}
              Swiper={Swiper}
              SwiperSlide={SwiperSlide}
              openModal={openModal}
              handleCloseModal={handleCloseModal}
            />
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
  );
};

export default ProductCard;
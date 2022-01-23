import React, { useState } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Slide from '@mui/material/Slide';

import ImagePlaceholder from '../../assets/img/img_placeholder.jpg';

const ProductDetailsModal = (props) => {
  const {
    products,
    productIndex,
    openModal,
    handleCloseModal,
    Swiper,
    SwiperSlide,
    ReactQuill,
  } = props;

  const [checked, setChecked] = useState(true);

  const handleClick = ({ target }) => {
    if (target.id === 'item-modal') {
      setChecked(false);
      setTimeout(() => {
        handleCloseModal();
        setChecked(true);
      }, 325);
    }
  };

  if (!openModal) {
    return <div />;
  }

  return (
    <Modal open={openModal}>
      <Grid
        id="item-modal"
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100vh', width: '100vw' }}
        onClick={handleClick}
      >
        <Grid item>
          <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
            <Paper
              elevation={0}
              style={{
                overflow: 'hidden',
                width: '80vw',
                height: '80vh',
                borderRadius: 15,
                boxShadow:
                  'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px ',
              }}
            >
              <PerfectScrollbar>
                <Grid container>
                  <Grid item xs={12}>
                    <Box
                      style={{
                        zIndex: 5,
                        width: '80%',
                        position: 'fixed',
                        backgroundColor: 'rgb(244, 246, 248)',
                        padding: '20px 0px 20px 25px',
                        borderRadius: '20px 20px 0px 0px',
                      }}
                    >
                      Product Overview
                    </Box>
                  </Grid>
                  <Grid item xs={3} sx={{ pt: 8 }}>
                    <Swiper
                      pagination={{
                        dynamicBullets: true,
                        clickable: true,
                      }}
                      spaceBetween={30}
                      loop
                      className="mySwiper"
                      style={{
                        borderRadius: '0px 0px 0px 20px',
                        marginRight: 10,
                        marginLeft: 10,
                        maxWidth: 1000,
                        height: 400,
                      }}
                      grabCursor
                      centeredSlides
                      slidesPerView={1}
                    >
                      {products[productIndex].images.length === 0 && (
                        <SwiperSlide>
                          <img
                            src={ImagePlaceholder}
                            alt="Teset"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'scale-down',
                            }}
                          />
                        </SwiperSlide>
                      )}
                      {products[productIndex].images.map(({ path }) => (
                        <SwiperSlide key={path}>
                          <img
                            src={path}
                            alt="Teset"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'scale-down',
                            }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </Grid>
                  <Grid item xs={9} sx={{ pt: 8 }}>
                    <Box
                      style={{
                        padding: '20px 25px 20px 10px',
                        borderRadius: '0px 0px 20px 0px',
                      }}
                    >
                      <h3>
                        <b>{products[productIndex].name}</b>
                        <br />
                        <b>{products[productIndex].barcode_number}</b>
                      </h3>
                      <Grid container spacing={0.5}>
                        {products[productIndex].sub_categories.map((cat) => (
                          <Grid item key={cat.uuid}>
                            <Chip color="primary" size="small" label={cat.name} />
                          </Grid>
                        ))}
                      </Grid>
                      <br />
                      <Divider />
                      <ReactQuill
                        style={{ marginTop: 40 }}
                        value={products[productIndex].description}
                        readOnly
                        theme="bubble"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </PerfectScrollbar>
            </Paper>
          </Slide>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ProductDetailsModal;

import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Skeleton from '@mui/material/Skeleton';

import { makeStyles } from '@mui/styles';

// import { ReactComponent as PhoneScreen } from '../../assets/svg/phone_screen.svg';
// import { ReactComponent as PhoneScreen } from '../../assets/svg/online-ads-amico.svg';

const useStyles = makeStyles(() => ({
  paper: {
    boxShadow:
      'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px !important',
    borderRadius: '16px !important',
    backgroundColor: 'white',
    width: '375px',
    height: '720px',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'scale-down',
  },
  swiper: {
    width: '100vw',
    height: '100vh',
  },
}));

const PromoModal = (props) => {
  const classes = useStyles();

  const { image, Swiper, SwiperSlide, openModal, handleCloseModal } = props;

  return (
    <Modal open={openModal}>
      <Swiper
        onClick={handleCloseModal}
        pagination={{
          clickable: true,
          type: 'fraction',
        }}
        navigation
        spaceBetween={10}
        loop
        className={classes.swiper}
        grabCursor
        centeredSlides
        slidesPerView={1}
      >
        <SwiperSlide>
          <img src={image.path} alt="Teset" className={classes.img} />
        </SwiperSlide>
        <SwiperSlide>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            style={{ height: '100vh', width: '100vw' }}
          >
            <Grid item xs={12} container alignItems="center" justifyContent="center">
              <Box className={classes.paper}>
                <Grid container>
                  <Grid item xs={12}>
                    <span style={{ fontSize: '0.875rem', marginLeft: 10 }}>
                      <KeyboardReturnIcon sx={{ position: 'relative', top: 6 }} />
                      <b style={{ marginLeft: 10, position: 'relative', bottom: 2 }}>
                        Campaign Details
                      </b>
                    </span>
                  </Grid>
                  <Grid item xs={12}>
                    <img src={image.path} alt="Teset" className={classes.img} />
                  </Grid>
                  <Grid item xs={12} container sx={{ p: 2, fontSize: '0.875rem' }}>
                    <Grid item xs={12} container>
                      <Grid item xs={12}>
                        <Skeleton animation="wave" width="40%" />
                      </Grid>
                      <Grid item xs={12}>
                        <Skeleton animation="wave" width="100%" />
                        <Skeleton animation="wave" width="100%" />
                        <Skeleton animation="wave" width="80%" />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} container sx={{ mt: 4 }}>
                      <Grid item xs={12}>
                        <b>Terms & conditions</b>
                      </Grid>
                      <Grid item xs={12}>
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" width="95%" />
                        <br />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" width="86%" />
                        <br />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" width="80%" />
                        <br />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" width="90%" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </SwiperSlide>
      </Swiper>
    </Modal>
  );
};

export default PromoModal;

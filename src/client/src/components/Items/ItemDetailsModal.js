import * as React from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

export default function ItemDetailsModal(props) {
  const {
    items,
    itemIndex,
    openModal,
    handleCloseModal,
    Swiper,
    SwiperSlide,
    ReactQuill,
  } = props;

  if (!openModal) {
    return <div />;
  }

  const handleClick = ({ target }) => {
    if (target.id === 'item-modal') {
      handleCloseModal();
    }
  };

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
          <Paper
            elevation={0}
            style={{
              overflow: 'hidden',
              width: '80vw',
              height: '80vh',
              borderRadius: 20,
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
                    Item Overview
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
                      maxWidth: 1000,
                      height: '100%',
                    }}
                    grabCursor
                    centeredSlides
                    slidesPerView={1}
                  >
                    {items[itemIndex].images.map(({ path }) => (
                      // <SwiperSlide key={path} onClick={handleOpenModal} style={{}}>
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
                      <b>{items[itemIndex].name}</b>
                    </h3>

                    <Divider />
                    <ReactQuill value={items[itemIndex].note} readOnly theme="bubble" />
                  </Box>
                </Grid>
              </Grid>
            </PerfectScrollbar>
          </Paper>
        </Grid>
      </Grid>
    </Modal>
  );
}

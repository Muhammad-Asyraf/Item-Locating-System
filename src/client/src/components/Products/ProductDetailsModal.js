import React, { useState } from 'react';

import moment from 'moment';

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { makeStyles } from '@mui/styles';

import ImagePlaceholder from '../../assets/img/img_placeholder.jpg';

const getProductTabs = () => ['General', 'Description', 'Promotion'];

const useStyles = makeStyles(() => ({
  tableRow: {
    '&:hover': {
      backgroundColor: 'rgb(244, 246, 248) !important',
    },
  },
  selected: {
    overflow: 'hidden !important',
    borderRadius: '15px !important',
  },
  selectedTab: {
    height: '2.5px !important',
    borderRadius: '10px !important',
  },
  tabRoot: {
    textTransform: 'none !important',
    fontSize: '1em !important',
  },
  tabContainer: {
    marginTop: '20px !important',
    marginBottom: '20px !important',
    borderBottom: '1.5px solid rgba(224, 224, 224, 1)',
    width: '50%',
  },
  inputTitle: {
    margin: '0px 0px 2px',
    fontWeight: '600',
    lineHeight: '1.57143',
    fontSize: '0.875rem',
    fontFamily: 'Public Sans, sans-serif',
    color: 'black',
    // color: 'rgb(99, 115, 129)',
  },
  generalBox: {
    padding: '20px 0px 5px 0px',
  },
  generalTag: {
    // fontWeight: 700,
    // backgroundColor: '#600E58',
    color: 'rgb(99, 115, 129)',
    // padding: '5px 20px',
    borderRadius: 8,
  },
  promotionTag: {
    backgroundColor: '#600E58',
    color: 'white',
    padding: '5px 20px',
    borderRadius: 8,
    fontWeight: 700,
  },
  dateTag: {
    display: 'inline-block',
    fontWeight: 700,
    backgroundColor: '#D63B49',
    color: 'white',
    padding: '3px 15px',
    borderRadius: 8,
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

/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
const ProductDetailsModal = (props) => {
  const classes = useStyles();
  const {
    products,
    productIndex,
    openModal,
    handleCloseModal,
    Swiper,
    SwiperSlide,
    ReactQuill,
  } = props;

  const productTabs = getProductTabs();

  const [checked, setChecked] = useState(true);
  const [currentTab, setCurrentTab] = useState(productTabs[0]);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

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

  const promotionValue = (metaData) => {
    const { promotionType } = metaData;
    let render;

    if (promotionType.bxgy_checked) {
      const {
        BxGy: { buyQty, freeQty },
      } = metaData;

      render = (
        <span className={classes.promotionTag}>
          Buy {buyQty} Free {freeQty}
        </span>
      );
    } else {
      const {
        discount,
        discountType: { percentage_off_checked: percentageChecked },
      } = metaData;

      if (percentageChecked) {
        render = <span className={classes.promotionTag}>{discount}% off</span>;
      } else {
        render = <span className={classes.promotionTag}>RM{discount} off</span>;
      }
    }

    return render;
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
                    <TabContext value={currentTab}>
                      <TabList
                        onChange={handleChangeTab}
                        classes={{ indicator: classes.selectedTab }}
                        className={classes.tabContainer}
                      >
                        {productTabs.map((productTab) => {
                          const tabLabelId = `products[productIndex]-overview-tab-${productTab}`;

                          return (
                            <Tab
                              key={tabLabelId}
                              disableRipple
                              label={productTab}
                              value={productTab}
                              className={classes.tabRoot}
                            />
                          );
                        })}
                      </TabList>
                      <TabPanel
                        value="General"
                        style={{
                          marginTop: 0,
                          padding: 0,
                        }}
                      >
                        <Grid
                          container
                          justifyContent="flex-start"
                          alignItems="flex-start"
                          style={{
                            padding: '0px 25px 20px 15px',
                          }}
                        >
                          <Grid item xs={12}>
                            <Box className={classes.generalBox} sx={{ pt: 1 }}>
                              <p className={classes.inputTitle}>Name</p>
                              <span className={classes.generalTag}>
                                {products[productIndex].name}
                              </span>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className={classes.generalBox}>
                              <p className={classes.inputTitle}>UPC Code</p>
                              <span className={classes.generalTag}>
                                {products[productIndex].barcode_number}
                              </span>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className={classes.generalBox}>
                              <p className={classes.inputTitle}>Created at</p>
                              <span className={classes.generalTag}>
                                {moment(new Date(products[productIndex].created_at)).format(
                                  'MMM Do YYYY, hh:mm a'
                                )}
                              </span>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className={classes.generalBox}>
                              <p className={classes.inputTitle}>Supply Price</p>
                              <span className={classes.generalTag}>
                                RM {products[productIndex].supply_price}
                              </span>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className={classes.generalBox}>
                              <p className={classes.inputTitle}>Updated at</p>
                              <span className={classes.generalTag}>
                                {moment(new Date(products[productIndex].updated_at)).format(
                                  'MMM Do YYYY, hh:mm a'
                                )}
                              </span>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className={classes.generalBox}>
                              <p className={classes.inputTitle}>Markup</p>
                              <span className={classes.generalTag}>
                                {Math.round(products[productIndex].markup_percentage)} %
                              </span>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className={classes.generalBox}>
                              <p className={classes.inputTitle}>Product Type</p>
                              <span className={classes.generalTag}>
                                {products[productIndex].product_type}
                              </span>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className={classes.generalBox}>
                              <p className={classes.inputTitle}>Measurement</p>
                              <span className={classes.generalTag}>
                                {Math.round(products[productIndex].measurement_value)} &nbsp;
                                {products[productIndex].measurement_unit}
                              </span>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className={classes.generalBox}>
                              <p className={classes.inputTitle}>Assigned Position</p>
                              <span className={classes.generalTag}>
                                {products[productIndex].layer ? (
                                  <span style={{ fontSize: 20, color: 'green' }}>✔</span>
                                ) : (
                                  <span style={{ fontSize: 15 }}>❌</span>
                                )}
                              </span>
                            </Box>
                          </Grid>
                        </Grid>
                      </TabPanel>
                      <TabPanel value="Description" style={{ marginTop: 0, padding: 0 }}>
                        <ReactQuill
                          value={products[productIndex].description}
                          readOnly
                          theme="bubble"
                          style={{ paddingBottom: 30, paddingTop: 8, paddingRight: 20 }}
                        />
                      </TabPanel>
                      <TabPanel value="Promotion" style={{ marginTop: 0, padding: 0 }}>
                        <Box
                          style={{
                            padding: '0px 25px 20px 15px',
                          }}
                        >
                          {products[productIndex].promotions.length > 0 && (
                            <TableContainer>
                              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell
                                      // sx={{ width: '70%' }}
                                      style={{
                                        borderBottom: '1.5px solid rgba(224, 224, 224, 1)',
                                      }}
                                    >
                                      <b>Name</b>
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      style={{
                                        borderBottom: '1.5px solid rgba(224, 224, 224, 1)',
                                      }}
                                    >
                                      <b>Effective Date</b>
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      style={{
                                        borderBottom: '1.5px solid rgba(224, 224, 224, 1)',
                                      }}
                                    >
                                      <b>Status</b>
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      style={{
                                        borderBottom: '1.5px solid rgba(224, 224, 224, 1)',
                                      }}
                                    >
                                      <b>Selling Price</b>
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      style={{
                                        borderBottom: '1.5px solid rgba(224, 224, 224, 1)',
                                      }}
                                    >
                                      <b>Promotion</b>
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {products[productIndex].promotions.map(
                                    ({
                                      name: promoName,
                                      start_date: startDate,
                                      end_date: endDate,
                                      promotion_status: status,
                                      sale_price: salePrice,
                                      meta_data: metaData,
                                      uuid,
                                    }) => (
                                      <TableRow
                                        key={uuid}
                                        sx={{
                                          '&:last-child td, &:last-child th': {
                                            border: 0,
                                          },
                                        }}
                                      >
                                        <TableCell
                                          style={{
                                            borderBottom:
                                              '0.5px solid rgba(224, 224, 224, 0.7)',
                                          }}
                                        >
                                          {promoName}
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          style={{
                                            borderBottom:
                                              '0.5px solid rgba(224, 224, 224, 0.7)',
                                          }}
                                        >
                                          <span className={classes.dateTag}>
                                            {moment(new Date(startDate)).format(
                                              'MMM Do YYYY, hh:mm a'
                                            )}
                                          </span>
                                          &nbsp;—&nbsp;
                                          <br />
                                          <span
                                            className={classes.dateTag}
                                            style={{ marginTop: '5px' }}
                                          >
                                            {moment(new Date(endDate)).format(
                                              'MMM Do YYYY, hh:mm a'
                                            )}
                                          </span>
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          style={{
                                            borderBottom:
                                              '0.5px solid rgba(224, 224, 224, 0.7)',
                                          }}
                                        >
                                          <span
                                            className={classes.circleStatus}
                                            style={{
                                              backgroundColor:
                                                status === 'active'
                                                  ? '#39A388'
                                                  : status === 'scheduled'
                                                  ? '#F0A500'
                                                  : '#FF5151',
                                            }}
                                          />
                                          &nbsp; {status}
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          style={{
                                            borderBottom:
                                              '0.5px solid rgba(224, 224, 224, 0.7)',
                                          }}
                                        >
                                          {(salePrice && `RM ${salePrice.toFixed(2)}`) ||
                                            'N/A'}
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          style={{
                                            borderBottom:
                                              '0.5px solid rgba(224, 224, 224, 0.7)',
                                          }}
                                        >
                                          {promotionValue(metaData)}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          )}
                        </Box>
                      </TabPanel>
                    </TabContext>
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

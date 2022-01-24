import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import moment from 'moment';

import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

import '../../assets/css/swiper_override.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

// import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';

import RowOptions from './RowOptions';
import ImageModal from '../Images/ImageModal';
import StockStatusDialog from './StockStatusDialog';

import ImagePlaceholder from '../../assets/img/img_placeholder.jpg';

SwiperCore.use([Pagination, Navigation]);

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
    fontSize: '1.2em !important',
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
const ProductTableRow = (props) => {
  const classes = useStyles();
  const productTabs = getProductTabs();

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openStockStatusDialog, setOpenStockStatusDialog] = useState(false);
  const [currentTab, setCurrentTab] = useState(productTabs[0]);

  const {
    product,
    isProductSelected,
    labelId,
    handleClick,
    handleDelete,
    handleEdit,
    handleToggleStatus,
    handleStockStatus,
    productLoading,
  } = props;

  console.log('product', product);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleClickOpenStockStatusDialog = () => setOpenStockStatusDialog(true);
  const handleCloseStockStatusDialog = () => setOpenStockStatusDialog(false);

  const handleUpdateStockStatus = (status, handleClose) => {
    handleStockStatus(product.uuid, status, handleClose);
  };

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

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
    <>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isProductSelected}
        tabIndex={-1}
        key={product.name}
        selected={isProductSelected}
        classes={{ selected: classes.selected }}
        className={classes.tableRow}
      >
        <TableCell style={{ borderBottom: 'none', paddingRight: 0 }} align="right">
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{
              position: 'relative',
              left: 16,
              top: 1,
            }}
          >
            {!open ? (
              <ExpandMore style={{ transform: 'rotate(-90deg)' }} />
            ) : (
              <ExpandLess style={{ transform: 'rotate(180deg)' }} />
            )}
          </IconButton>
        </TableCell>
        <TableCell
          style={{
            borderBottom: 'none',
          }}
          padding="normal"
          align="left"
        >
          <Checkbox
            checked={isProductSelected}
            onClick={(event) => handleClick(event, product.uuid)}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          id={labelId}
          scope="row"
          align="left"
          sx={{
            fontSize: '0.95rem !important',
            paddingLeft: 0,
          }}
        >
          {product.name}
        </TableCell>
        {/* <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          sx={{ fontSize: '0.95rem !important' }}
        >
          {product.barcode_number}
        </TableCell> */}
        <TableCell
          style={{ borderBottom: 'none' }}
          component="th"
          id={labelId}
          scope="row"
          padding="none"
          align="center"
          sx={{
            fontSize: '0.95rem !important',
            padding: '10px 0px 10px 20px',
          }}
        >
          <Grid container spacing={0.5}>
            {product.sub_categories.map((cat) => (
              <Grid item key={cat.uuid}>
                <Chip
                  color="primary"
                  size="small"
                  label={cat.name}
                  sx={{ fontWeight: 700, pl: 1, pr: 1, pt: 2, pb: 2 }}
                />
              </Grid>
            ))}
          </Grid>
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          sx={{ fontSize: '0.95rem !important' }}
        >
          RM {product.retail_price}
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          sx={{ fontSize: '0.95rem !important' }}
        >
          <Switch
            checked={product.is_active}
            onChange={() => {
              handleToggleStatus(product.uuid, product.is_active);
            }}
          />
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          sx={{ fontSize: '0.95rem !important' }}
        >
          <Chip
            label={product.stock_status}
            style={{
              fontWeight: 'bold',
              paddingRight: 10,
              color: 'white',
              backgroundColor:
                product.stock_status === 'In Stock'
                  ? '#39A388'
                  : product.stock_status === 'Low Stock'
                  ? '#F0A500'
                  : '#FF5151',
            }}
          />
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          sx={{ fontSize: '0.95rem !important', letterSpacing: 0.8 }}
        >
          {moment(new Date(product.updated_at)).format('DD/MM/YYYY')}
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="left"
          // sx={{ paddingLeft: '0px !important' }}
        >
          <RowOptions
            product={product}
            Link={Link}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleClickOpenStockStatusDialog={handleClickOpenStockStatusDialog}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0, borderBottom: 'none' }} colSpan={12}>
          <Collapse in={open} timeout={600} unmountOnExit>
            {/* {open && ( */}
            <Paper
              sx={{
                ml: 3,
                mr: 3,
              }}
              elevation={0}
            >
              <Grid container direction="column" alignItems="center" justifyContent="center">
                <Grid item sx={{ mt: 2, mb: 5 }}>
                  <Paper
                    elevation={0}
                    style={{
                      borderRadius: 20,
                      boxShadow:
                        'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px ',
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        <Box
                          style={{
                            backgroundColor: 'rgb(244, 246, 248)',
                            padding: '20px 0px 20px 25px',
                            borderRadius: '20px 20px 0px 0px',
                          }}
                        >
                          Product Overview
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        container
                        justifyContent="center"
                        alignItems="flex-start"
                      >
                        <Swiper
                          pagination={{
                            dynamicBullets: true,
                            clickable: true,
                          }}
                          spaceBetween={30}
                          loop
                          className="mySwiper"
                          style={{
                            marginRight: 10,
                            marginLeft: 10,
                            maxWidth: 1000,
                            height: 400,
                            marginBottom: 20,
                          }}
                          grabCursor
                          centeredSlides
                          slidesPerView={1}
                        >
                          {product.images.length === 0 && (
                            <SwiperSlide onClick={handleOpenModal}>
                              <img
                                src={ImagePlaceholder}
                                alt="Teset"
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'scale-down',
                                  borderRadius: 5,
                                }}
                              />
                            </SwiperSlide>
                          )}
                          {product.images.map(({ path }) => (
                            <SwiperSlide key={path} onClick={handleOpenModal}>
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
                      <Grid item xs={9}>
                        <TabContext value={currentTab}>
                          <TabList
                            onChange={handleChangeTab}
                            classes={{ indicator: classes.selectedTab }}
                            className={classes.tabContainer}
                          >
                            {productTabs.map((productTab) => {
                              const tabLabelId = `product-overview-tab-${productTab}`;

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
                              <Grid item xs={6}>
                                <Box className={classes.generalBox} sx={{ pt: 1 }}>
                                  <p className={classes.inputTitle}>UPC Code</p>
                                  <span className={classes.generalTag}>
                                    {product.barcode_number}
                                  </span>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box className={classes.generalBox} sx={{ pt: 1 }}>
                                  <p className={classes.inputTitle}>Created at</p>
                                  <span className={classes.generalTag}>
                                    {moment(new Date(product.created_at)).format(
                                      'MMM Do YYYY, hh:mm a'
                                    )}
                                  </span>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box className={classes.generalBox}>
                                  <p className={classes.inputTitle}>Supply Price</p>
                                  <span className={classes.generalTag}>
                                    RM {product.supply_price}
                                  </span>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box className={classes.generalBox}>
                                  <p className={classes.inputTitle}>Updated at</p>
                                  <span className={classes.generalTag}>
                                    {moment(new Date(product.updated_at)).format(
                                      'MMM Do YYYY, hh:mm a'
                                    )}
                                  </span>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box className={classes.generalBox}>
                                  <p className={classes.inputTitle}>Markup</p>
                                  <span className={classes.generalTag}>
                                    {Math.round(product.markup_percentage)} %
                                  </span>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box className={classes.generalBox}>
                                  <p className={classes.inputTitle}>Product Type</p>
                                  <span className={classes.generalTag}>
                                    {product.product_type}
                                  </span>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box className={classes.generalBox}>
                                  <p className={classes.inputTitle}>Measurement</p>
                                  <span className={classes.generalTag}>
                                    {Math.round(product.measurement_value)} &nbsp;
                                    {product.measurement_unit}
                                  </span>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box className={classes.generalBox}>
                                  <p className={classes.inputTitle}>Assigned Position</p>
                                  <span className={classes.generalTag}>
                                    {product.layer ? (
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
                              value={product.description}
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
                              {product.promotions.length > 0 && (
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
                                      {product.promotions.map(
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
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Collapse>
        </TableCell>
        {product.images.length > 0 && (
          <ImageModal
            images={product.images}
            Swiper={Swiper}
            SwiperSlide={SwiperSlide}
            openModal={openModal}
            handleCloseModal={handleCloseModal}
          />
        )}

        <StockStatusDialog
          open={openStockStatusDialog}
          handleClose={handleCloseStockStatusDialog}
          onUpdate={handleUpdateStockStatus}
          productLoading={productLoading}
        />
      </TableRow>
    </>
  );
};

export default ProductTableRow;

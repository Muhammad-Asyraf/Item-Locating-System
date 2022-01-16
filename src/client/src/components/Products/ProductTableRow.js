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

import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';

import RowOptions from './RowOptions';
import ImageModal from '../Images/ImageModal';
import StockStatusDialog from './StockStatusDialog';

SwiperCore.use([Pagination, Navigation]);

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
}));

/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
const ProductTableRow = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openStockStatusDialog, setOpenStockStatusDialog] = useState(false);

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

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleClickOpenStockStatusDialog = () => setOpenStockStatusDialog(true);
  const handleCloseStockStatusDialog = () => setOpenStockStatusDialog(false);

  const handleUpdateStockStatus = (status, handleClose) => {
    handleStockStatus(product.uuid, status, handleClose);
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
                <Chip color="primary" size="small" label={cat.name} />
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
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                // sx={{ border: '1px solid red' }}
              >
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
                      <Grid item xs={3}>
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
                          {product.images.map(({ path }) => (
                            <SwiperSlide key={path} onClick={handleOpenModal} style={{}}>
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
                        <Box
                          style={{
                            padding: '20px 25px 20px 10px',
                            borderRadius: '0px 0px 20px 0px',
                          }}
                        >
                          <div style={{ fontSize: 16 }}>
                            <b>UPC Code:</b> {product.barcode_number}
                          </div>
                          <div style={{ fontSize: 16 }}>
                            <b>Supply Price:</b> {product.supply_price}
                          </div>
                          <div style={{ fontSize: 16 }}>
                            <b>Markup:</b> {Math.round(product.markup_percentage)} %
                          </div>
                          <div style={{ fontSize: 16 }}>
                            <b>Product Type:</b> {product.product_type}
                          </div>
                          <div style={{ fontSize: 16 }}>
                            <b>Measurement:</b> {Math.round(product.measurement_value)}{' '}
                            {product.measurement_unit}
                          </div>
                          <br />
                          <Divider />
                          <br />
                          <ReactQuill value={product.description} readOnly theme="bubble" />
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
            {/* )} */}
          </Collapse>
        </TableCell>
        <ImageModal
          images={product.images}
          Swiper={Swiper}
          SwiperSlide={SwiperSlide}
          openModal={openModal}
          handleCloseModal={handleCloseModal}
        />
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

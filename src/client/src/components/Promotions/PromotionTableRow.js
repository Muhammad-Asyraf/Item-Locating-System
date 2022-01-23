import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../assets/css/overrideQuill.css';

import moment from 'moment';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

import { makeStyles } from '@mui/styles';

import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

import '../../assets/css/swiper_override.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import RowOptions from './RowOptions';
import ProductDetailsModal from '../Products/ProductDetailsModal';

SwiperCore.use([Pagination, Navigation]);

const useStyles = makeStyles(() => ({
  tableRow: {
    '&:hover': {
      backgroundColor: 'rgb(244, 246, 248) !important',
      // backgroundColor: 'rgb(244, 246, 248) !important',
    },
  },
  selected: {
    overflow: 'hidden !important',
    borderRadius: '15px !important',
  },
  inputTitle: {
    margin: '0px 0px 5px',
    fontWeight: '600',
    lineHeight: '1.57143',
    fontSize: '0.875rem',
    fontFamily: 'Public Sans, sans-serif',
    color: 'black',
    // color: 'rgb(99, 115, 129)',
  },
  promotionTag: {
    backgroundColor: '#600E58',
    color: 'white',
    padding: '5px 20px',
    borderRadius: 8,
    fontWeight: 700,
  },
  dateTag: {
    fontWeight: 700,
    backgroundColor: '#D63B49',
    color: 'white',
    padding: '5px 20px',
    borderRadius: 8,
  },
  campaignTag: {
    fontWeight: 700,
    backgroundColor: '#600E58',
    color: 'white',
    padding: '5px 20px',
    borderRadius: 8,
  },
}));

const PromotionTableRow = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [productIndex, setProductIndex] = useState();
  const [openProductModal, setOpenProductModal] = useState(false);

  const { promotion, isPromotionSelected, labelId, handleClick, handleDelete, handleEdit } =
    props;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseProductModal = () => setOpenProductModal(false);
  const handleOpenProductModal = (uuid) => {
    const index = promotion.products.findIndex((product) => product.uuid === uuid);

    setProductIndex(index);
    setOpenProductModal(true);
  };

  const promotionValue = () => {
    const {
      meta_data: { promotionType },
      meta_data: metaData,
    } = promotion;
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

  console.log('promotion', promotion);
  return (
    <>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isPromotionSelected}
        tabIndex={-1}
        key={promotion.name}
        selected={isPromotionSelected}
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
            checked={isPromotionSelected}
            onClick={(event) => handleClick(event, promotion.uuid)}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          id={labelId}
          scope="row"
          // padding="none"
          align="left"
          sx={{
            fontSize: '0.95rem !important',
            // whiteSpace: 'nowrap',
            // overflow: 'hidden',
            paddingLeft: 0,
          }}
        >
          {promotion.name}
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          sx={{
            fontSize: '0.95rem !important',
            padding: '10px 0px 10px 20px',
          }}
        >
          <Chip
            color="primary"
            size="small"
            label={promotion.promotion_type}
            sx={{ pl: 5, pr: 5, pt: 2, pb: 2, fontWeight: 700 }}
          />
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          sx={{ fontSize: '0.95rem !important', letterSpacing: 0.8 }}
        >
          {moment(new Date(promotion.start_date)).format('DD/MM/YYYY')}
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          sx={{ fontSize: '0.95rem !important', letterSpacing: 0.8 }}
        >
          {moment(new Date(promotion.end_date)).format('DD/MM/YYYY')}
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="left"
          sx={{ paddingLeft: '5px !important' }}
        >
          <RowOptions
            promotion={promotion}
            Link={Link}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0, borderBottom: 'none' }} colSpan={12}>
          <Collapse in={open} timeout={600} unmountOnExit>
            <Paper
              sx={{
                ml: 3,
                mr: 3,
              }}
              elevation={0}
            >
              <Grid container direction="column" alignItems="center" justifyContent="center">
                <Grid item sx={{ mt: 2, mb: 5, width: '100%' }}>
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
                          Promotion Overview
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          style={{
                            padding: '20px 40px 10px 40px',
                          }}
                        >
                          <p className={classes.inputTitle}>Promotion</p>
                          {promotionValue()}
                        </Box>
                      </Grid>
                      {promotion.campaign && (
                        <Grid item xs={12}>
                          <Box
                            style={{
                              padding: '10px 40px 10px 40px',
                            }}
                          >
                            <p className={classes.inputTitle}>Linked Campaign</p>
                            <span className={classes.campaignTag}>
                              {promotion.campaign.name}
                            </span>
                          </Box>
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <Box
                          style={{
                            padding: '10px 25px 10px 25px',
                            borderRadius: '0px 0px 20px 0px',
                          }}
                        >
                          <p className={classes.inputTitle} style={{ paddingLeft: '15px' }}>
                            Descriptions
                          </p>
                          <ReactQuill value={promotion.description} readOnly theme="bubble" />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          style={{
                            padding: '0px 40px 10px 40px',
                          }}
                        >
                          <p className={classes.inputTitle}>Effective Date</p>
                          <span className={classes.dateTag}>
                            {moment(new Date(promotion.start_date)).format(
                              'MMM Do YYYY, hh:mm a'
                            )}
                          </span>
                          &nbsp;—&nbsp;
                          <span className={classes.dateTag}>
                            {moment(new Date(promotion.end_date)).format(
                              'MMM Do YYYY, hh:mm a'
                            )}
                          </span>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        container
                        justifyContent="center"
                        alignItems="center"
                        sx={{ mb: 5 }}
                      >
                        <Grid item xs={11}>
                          <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  <TableCell
                                    sx={{ width: '70%' }}
                                    style={{
                                      borderBottom: '1.5px solid rgba(224, 224, 224, 1)',
                                    }}
                                  >
                                    <b>Product</b>
                                  </TableCell>
                                  <TableCell
                                    align={
                                      promotion.meta_data.promotionType.bxgy_checked
                                        ? 'right'
                                        : 'center'
                                    }
                                    style={{
                                      borderBottom: '1.5px solid rgba(224, 224, 224, 1)',
                                    }}
                                  >
                                    <b>Retail Price</b>
                                  </TableCell>
                                  {!promotion.meta_data.promotionType.bxgy_checked && (
                                    <>
                                      <TableCell
                                        style={{
                                          borderBottom: '1.5px solid rgba(224, 224, 224, 1)',
                                        }}
                                      />
                                      <TableCell
                                        align="center"
                                        style={{
                                          borderBottom: '1.5px solid rgba(224, 224, 224, 1)',
                                        }}
                                      >
                                        <b>Sale Price</b>
                                      </TableCell>
                                    </>
                                  )}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {promotion.products
                                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                  .map(
                                    ({
                                      name: productName,
                                      retail_price: retailPrice,
                                      sale_price: salePrice,
                                      uuid,
                                    }) => (
                                      <TableRow
                                        key={uuid}
                                        sx={{
                                          '&:last-child td, &:last-child th': { border: 0 },
                                        }}
                                      >
                                        <TableCell
                                          style={{
                                            borderBottom:
                                              '0.5px solid rgba(224, 224, 224, 0.7)',
                                          }}
                                        >
                                          {productName}
                                          <IconButton
                                            onClick={() => handleOpenProductModal(uuid)}
                                            style={{ positiona: 'relative', bottom: 1.8 }}
                                          >
                                            <InfoRoundedIcon fontSize="small" />
                                          </IconButton>
                                        </TableCell>
                                        <TableCell
                                          align={
                                            promotion.meta_data.promotionType.bxgy_checked
                                              ? 'right'
                                              : 'center'
                                          }
                                          style={{
                                            borderBottom:
                                              '0.5px solid rgba(224, 224, 224, 0.7)',
                                          }}
                                        >
                                          RM {retailPrice}
                                        </TableCell>
                                        {!promotion.meta_data.promotionType.bxgy_checked && (
                                          <>
                                            <TableCell
                                              align="center"
                                              style={{
                                                borderBottom:
                                                  '0.5px solid rgba(224, 224, 224, 0.7)',
                                              }}
                                            >
                                              <ArrowRightAltRoundedIcon
                                                style={{
                                                  position: 'relative',
                                                  top: 3,
                                                  color: 'green',
                                                }}
                                              />
                                            </TableCell>
                                            <TableCell
                                              align="center"
                                              style={{
                                                borderBottom:
                                                  '0.5px solid rgba(224, 224, 224, 0.7)',
                                              }}
                                            >
                                              RM {salePrice.toFixed(2)}
                                            </TableCell>
                                          </>
                                        )}
                                      </TableRow>
                                    )
                                  )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                        {promotion.products.length > 5 && (
                          <Grid
                            item
                            xs={12}
                            container
                            justifyContent="flex-end"
                            alignItems="center"
                            sx={{ mr: 5 }}
                          >
                            <TablePagination
                              rowsPerPageOptions={[5, 10, 25]}
                              component="div"
                              count={promotion.products.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onPageChange={handleChangePage}
                              onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                          </Grid>
                        )}
                        <ProductDetailsModal
                          products={promotion.products}
                          Swiper={Swiper}
                          SwiperSlide={SwiperSlide}
                          openModal={openProductModal}
                          productIndex={productIndex}
                          handleCloseModal={handleCloseProductModal}
                          ReactQuill={ReactQuill}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default PromotionTableRow;

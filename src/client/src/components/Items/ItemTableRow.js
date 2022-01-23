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

import Box from '@mui/material/Box';
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

import ImagePlaceholder from '../../assets/img/img_placeholder.jpg';

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
}));

const ItemTableRow = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { item, isItemSelected, labelId, handleClick, handleDelete, handleEdit } = props;

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={item.name}
        selected={isItemSelected}
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
            checked={isItemSelected}
            onClick={(event) => handleClick(event, item.uuid)}
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
          {item.name}
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="left"
          sx={{ fontSize: '0.95rem !important' }}
        >
          {item.barcode_number}
        </TableCell>
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
            {item.sub_categories.map((cat) => (
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
          {item.wholesale_price}
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          sx={{ fontSize: '0.95rem !important', letterSpacing: 0.8 }}
        >
          {moment(new Date(item.updated_at)).format('DD/MM/YYYY')}
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="left"
          sx={{ paddingLeft: '5px !important' }}
        >
          <RowOptions
            item={item}
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
                          Item Overview
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
                            marginLeft: 10,
                            marginRight: 10,
                            maxWidth: 1000,
                            height: 400,
                          }}
                          grabCursor
                          centeredSlides
                          slidesPerView={1}
                        >
                          {item.images.length === 0 && (
                            <SwiperSlide onClick={handleOpenModal}>
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
                          {item.images.map(({ path }) => (
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
                          <ReactQuill value={item.note} readOnly theme="bubble" />
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Collapse>
        </TableCell>
        {item.images.length > 0 && (
          <ImageModal
            images={item.images}
            Swiper={Swiper}
            SwiperSlide={SwiperSlide}
            openModal={openModal}
            handleCloseModal={handleCloseModal}
          />
        )}
      </TableRow>
    </>
  );
};

export default ItemTableRow;

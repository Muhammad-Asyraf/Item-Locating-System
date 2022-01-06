// import React, { useRef, useState, useEffect } from 'react';
import React, { useState, useEffect, useRef } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../assets/css/overrideQuill.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// import Chip from '@mui/material/Chip';
// import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
// import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import DateRangePicker from '@mui/lab/DateRangePicker';
import DesktopTimePicker from '@mui/lab/DesktopTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
// import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

// import SpeedIcon from '@mui/icons-material/Speed';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import TodayIcon from '@mui/icons-material/Today';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import CampaignIcon from '@mui/icons-material/Campaign';
// import PercentRoundedIcon from '@mui/icons-material/PercentRounded';

import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';

import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

import '../../assets/css/swiper_override.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import ProductDetailsModal from '../Products/ProductDetailsModal';
import ProductFilter from '../Products/ProductFilters';
import CampaignLinkDialog from './CampaignLinkDialog';

import linkImage from '../../assets/svg/link.svg';

SwiperCore.use([Pagination, Navigation]);

const getInitPromototionType = () => ({
  basic_checked: false,
  bundle_checked: false,
  bxgy_checked: false,
});

const getInitDiscountType = () => ({
  percentage_off_checked: false,
  dollars_off_checked: false,
});

const getInitApplicableProductType = () => ({
  all_checked: false,
  specific_checked: false,
});

const getEditorModules = () => ({
  toolbar: [
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    [{ align: ['', 'center', 'right', 'justify'] }],
    ['link', 'clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
});

const getEditorFormat = () => [
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'align',
  'link',
];

// function getDefaultValues() {
//   return {
//     value: '',
//     error: false,
//   };
// }

const CampaignLinkSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        borderRadius: 20,
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        backgroundImage: `url(${linkImage})`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: 'white',
    // backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '90%',
    padding: 30,
    marginTop: 20,
    marginBottom: theme.spacing(2),
    boxShadow:
      'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px !important',
    borderRadius: '16px !important',
  },
  form: {
    '& > *': {
      marginTop: '20px',
      marginBottom: '20px',
      '& fieldset': {
        borderRadius: '8px',
      },
    },
    width: '100%',
  },
  submitButton: {
    height: '55px',
    width: '100%',
    color: 'white',
    marginTop: '20px !important',
    borderRadius: '15px !important',
    fontSize: 18,
    boxShadow: 'rgba(53, 132, 167, 0.54) 0px 8px 16px 0px !important',
    textTransform: 'none !important',
  },
  inputFields: {
    width: '100%',
  },
  inputTitle: {
    margin: '0px 0px 8px',
    fontWeight: '600',
    lineHeight: '1.57143',
    fontSize: '0.875rem',
    fontFamily: 'Public Sans, sans-serif',
    color: 'rgb(99, 115, 129)',
  },
  inputImageBox: {
    outline: 'none',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '40px 8px',
    borderRadius: '8px',
    height: '50vh',
    backgroundColor: 'rgb(244, 246, 248)',
    border: '1px dashed rgba(145, 158, 171, 0.32)',
    '&:hover': {
      opacity: '0.85 !important',
      cursor: 'pointer !important',
    },
  },
  inputImage: {
    width: '80% !important',
    height: '100vh !important',
    background: 'transparent',
    lineHeight: '900px',
    verticalAlign: 'middle',
    textAlign: 'center',
    padding: '0 20%',
    marginTop: '-40px',
    marginBottom: '-40px',
    color: '#FFF',
    fontWeight: 'bold',
  },
  radioBtn: {
    backgroundColor: 'red',
    width: '100px',
    height: '100px',
  },
  customHoverFocus: {
    '&:hover, &.Mui-focusVisible': { backgroundColor: ' rgba(0, 0, 0, 0.05) !important' },
  },
  promotionTypeBox: {
    width: '100%',
    height: 150,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: 20,
    // '&:hover': promotionType.basic_checked && {
    //   backgroundColor: 'rgba(0, 51, 102, 0.2) !important',
    //   border: '1px dashed rgba(145, 158, 171, 0.32) !important',
    //   color: 'black !important',
    // },
  },
  discountOpt: {
    width: '100%',
    height: '19px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'pointer',
    paddingTop: 19,
    paddingBottom: 19,
    // '&:hover': {
    //   backgroundColor: 'rgba(0, 51, 102, 0.1) !important',
    //   border: '1px dashed rgba(145, 158, 171, 0.32) !important',
    //   color: 'black !important',
    // },
  },
}));

/* eslint-disable new-cap */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unneeded-ternary */
const PromotionForm = (props) => {
  const classes = useStyles();
  // const defaultVal = getDefaultValues();
  const quillModules = getEditorModules();
  const quillFormats = getEditorFormat();
  const currentDateTime = new Date().toLocaleString();
  const discountRef = useRef();

  const initPromotionType = getInitPromototionType();
  const initDiscountType = getInitDiscountType();
  const initApplicableProductType = getInitApplicableProductType();

  const { products: initProduct, categoryOptions } = props;

  const [categoryFilterType, setCategoryFilterType] = useState('any');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState([]);
  const [selectedActiveStatusFilter, setSelectedActiveStatusFilter] = useState(null);
  const [selectedStockStatusFilter, setSelectedStockStatusFilter] = useState(null);
  const [filterActivated, setFilterActivated] = useState(false);
  const [applicableProducts, setApplicableProducts] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState(initProduct);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [openCampaignDialog, setOpenCampaignDialog] = useState(false);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [campaignLinkFlag, setCampaignLinkFlag] = useState(false);
  const [discount, setDiscount] = useState();
  const [productIndex, setProductIndex] = useState();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDateTime, setStartDateTime] = useState(currentDateTime);
  const [endDateTime, setEndDateTime] = useState(null);
  const [quillText, setQuillText] = useState({ editorHtml: '' });
  const [promotionType, setPromotionType] = useState(initPromotionType);
  const [discountType, setDiscountType] = useState(initDiscountType);
  const [applicableProductType, setApplicableProductType] = useState(
    initApplicableProductType
  );
  const [errors, setErrors] = useState({
    quillText: false,
    category: false,
    stock: false,
    image: false,
    mUnit: false,
    productType: false,
    standardProductItem: false,
    bundleProductItem: false,
  });

  const handleClickOpen = () => setOpenFilter(true);
  const handleClose = () => setOpenFilter(false);
  const handleClickOpenDialog = () => setOpenCampaignDialog(true);
  const handleCloseDialog = () => setOpenCampaignDialog(false);
  const toggleCampaignLink = () => setCampaignLinkFlag(!campaignLinkFlag);

  const filterProduct = () => {
    const categoryFilterActivated = selectedCategoryFilter.length > 0;
    const activeStatusFilterActivated = selectedActiveStatusFilter !== null;
    const stockStatusFilterActivated = selectedStockStatusFilter !== null;

    if (categoryFilterActivated || activeStatusFilterActivated || stockStatusFilterActivated) {
      setFilterActivated(true);
      const selectedCatList = selectedCategoryFilter.map(({ uuid }) => uuid);

      const filteredItem = applicableProducts.filter(
        ({ sub_categories: subCat, is_active: isActive, stock_status: stockStatus }) => {
          let validCategory = true;
          let validActiveStatus = true;
          let validStockStatus = true;

          if (categoryFilterActivated) {
            switch (categoryFilterType) {
              case 'any':
                validCategory = subCat.some(({ uuid }) => selectedCatList.includes(uuid));
                break;
              case 'all':
                validCategory = subCat.every(({ uuid }) => selectedCatList.includes(uuid));
                break;
              default:
              // no default
            }
          }

          if (activeStatusFilterActivated) {
            const selectedActiveStatusFlag =
              selectedActiveStatusFilter === 'Active' ? true : false;
            validActiveStatus = isActive === selectedActiveStatusFlag;
          }

          if (stockStatusFilterActivated) {
            validStockStatus = stockStatus === selectedStockStatusFilter;
          }

          return validCategory && validActiveStatus && validStockStatus;
        }
      );
      // setFilteredData(filteredItem);
      setProducts(filteredItem);
    } else {
      setFilterActivated(false);
      // setFilteredData(applicableProducts);
      setProducts(applicableProducts);
    }
  };

  useEffect(() => {
    filterProduct();
  }, [
    applicableProducts,
    selectedCategoryFilter,
    selectedActiveStatusFilter,
    selectedStockStatusFilter,
    categoryFilterType,
  ]);

  const clearFilters = () => {
    setCategoryFilterType('any');
    setSelectedCategoryFilter([]);
    setSelectedActiveStatusFilter(null);
    setSelectedStockStatusFilter(null);
  };

  const validateDescription = (value, currentError) => {
    const validQuillText = value;

    if (!validQuillText) {
      currentError = {
        ...currentError,
        quillText: 'Please enter promotion descriptions for your customers reference',
      };
    } else {
      currentError = {
        ...currentError,
        quillText: false,
      };
    }

    return currentError;
  };

  const handlePromotionType = ({ target }) => {
    const { id: selectedPromotionType } = target;
    let updatedPromotionType;
    let applicableProduct;

    console.log('initProduct', initProduct);

    if (selectedPromotionType === 'basic-sale') {
      applicableProduct = initProduct.filter(({ product_type: type }) => type === 'Standard');
      updatedPromotionType = {
        ...initPromotionType,
        basic_checked: true,
      };
    } else if (selectedPromotionType === 'bundle-sale') {
      applicableProduct = initProduct.filter(({ product_type: type }) => type === 'Bundle');
      updatedPromotionType = {
        ...initPromotionType,
        bundle_checked: true,
      };
    } else if (selectedPromotionType === 'buy-x-get-y') {
      applicableProduct = initProduct;
      updatedPromotionType = {
        ...initPromotionType,
        bxgy_checked: true,
      };
    }
    setPromotionType(updatedPromotionType);
    setApplicableProducts(applicableProduct);
    setSelectedProducts([]);
  };

  const handleDiscountType = ({ target }) => {
    const { id: selectedDiscountType } = target;
    let updatedDiscountType;

    if (selectedDiscountType === 'dollars-off') {
      updatedDiscountType = {
        ...initDiscountType,
        dollars_off_checked: true,
      };
    } else if (selectedDiscountType === 'percentage-off') {
      updatedDiscountType = {
        ...initDiscountType,
        percentage_off_checked: true,
      };
    }
    setDiscountType(updatedDiscountType);
  };

  const handleApplicableProductType = ({ target }) => {
    const { id: selectedApplicableProductType } = target;
    let updatedApplicableProductType;

    if (selectedApplicableProductType === 'all-products') {
      updatedApplicableProductType = {
        ...initApplicableProductType,
        all_checked: true,
      };
    } else if (selectedApplicableProductType === 'specific-products') {
      updatedApplicableProductType = {
        ...initApplicableProductType,
        specific_checked: true,
      };
    }

    setApplicableProductType(updatedApplicableProductType);
  };

  const handleChange = (content, delta, source, editor) => {
    let updatedError = errors;

    if (editor.getText().length === 1) {
      setQuillText({ editorHtml: '' });
      updatedError = validateDescription('', errors);
    } else {
      setQuillText({ editorHtml: content });

      if (errors.quillText !== false) {
        updatedError = validateDescription(content, errors);
      }
    }

    setErrors(updatedError);
  };

  const handleInputChange = ({ target }) => {
    const { value } = target;

    setDiscount(value);
  };

  const handleSelectProduct = (e, selected) => {
    const flag = promotionType.basic_checked || promotionType.bundle_checked;
    if (flag) {
      const currentDiscount = discountRef.current.value;
      let saving;
      let salePrice;

      const updatedProducts = selected.map((product) => {
        const { retail_price: retailPrice } = product;

        if (discountType.percentage_off_checked) {
          saving = (currentDiscount / 100) * parseFloat(retailPrice);
        } else {
          saving = currentDiscount;
        }

        salePrice = retailPrice - saving;

        return {
          ...product,
          sale_price: salePrice,
        };
      });

      setSelectedProducts(updatedProducts);
    } else {
      setSelectedProducts(selected);
    }
  };

  useEffect(() => {
    if (selectedProducts && discountRef.current) {
      handleSelectProduct(null, selectedProducts);
    }
  }, [discountType, discount]);

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (option) => option.name + option.barcode_number,
  });

  const atleastOnePromotionTypeSelected = () => {
    const flag =
      promotionType.basic_checked ||
      promotionType.bundle_checked ||
      promotionType.bxgy_checked;

    return flag;
  };

  const tableConditionChecked = () => {
    const flag =
      selectedProducts.length > 0 &&
      applicableProductType.specific_checked &&
      atleastOnePromotionTypeSelected();

    return flag;
  };

  const handleCloseProductModal = () => setOpenProductModal(false);

  const handleOpenProductModal = (uuid) => {
    const index = products.findIndex((product) => product.uuid === uuid);

    setProductIndex(index);
    setOpenProductModal(true);
  };

  const linkLabel = () => (
    <span style={{ position: 'relative', top: 1.5 }}>
      Campaign
      <IconButton onClick={handleClickOpenDialog}>
        <InfoRoundedIcon fontSize="small" />
      </IconButton>
    </span>
  );

  const campaignSwitch = () => (
    <CampaignLinkSwitch sx={{ m: 1, mr: 0.5 }} onChange={toggleCampaignLink} />
  );

  return (
    <form
      id="promotion-form"
      className={classes.form}
      // onSubmit={handleSubmit}
      autoComplete="off"
      style={{ flexGrow: 1 }}
    >
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          md={12}
          container
          justifyContent="center"
          alignItems="center"
          direction="row"
        >
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={3}>
                <h3 style={{ marginBottom: 5, marginTop: 0 }}>General</h3>
                <span style={{ fontSize: '0.9rem' }}>
                  Name the promotion and specify the dates for when it will apply
                </span>
              </Grid>
              <Grid item sm={12} md={9} container spacing={3}>
                <Grid item xs={8.5}>
                  <TextField
                    id="name"
                    label="Promotion Name"
                    variant="outlined"
                    // onChange={handleInputChange}
                    // onBlur={handleInputChange}
                    // error={productName.error !== false}
                    // helperText={productName.error}
                    className={classes.inputFields}
                    // inputRef={nameRef}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EditTwoToneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={3.5}>
                  <FormGroup>
                    <FormControlLabel
                      sx={{ mr: 0 }}
                      control={campaignSwitch()}
                      label={linkLabel()}
                    />
                  </FormGroup>
                  <CampaignLinkDialog
                    open={openCampaignDialog}
                    handleClose={handleCloseDialog}
                  />
                </Grid>
                {campaignLinkFlag && (
                  <Grid item xs={12}>
                    <Autocomplete
                      disablePortal
                      options={['1st Campaign', '2nd Campaign', '3rd Campaign']}
                      sx={{ width: '100%' }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Campaign"
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <CampaignIcon sx={{ fontSize: '1.8rem', ml: 0.5 }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>
                )}

                <Grid item xs={12}>
                  <p
                    className={classes.inputTitle}
                    style={{ color: errors.quillText ? '#d32f2f' : 'black' }}
                  >
                    Short description
                  </p>
                  <ReactQuill
                    value={quillText.editorHtml}
                    onChange={handleChange}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Provide a short description to explain this promotion"
                  />
                  <FormHelperText error={errors.quillText !== false}>
                    {errors.quillText ? errors.quillText : null}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  {/* Test */}
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                      startText="Start Date"
                      endText="End Date"
                      inputFormat="dd/MM/yyyy"
                      value={dateRange}
                      onChange={(newValue) => {
                        setDateRange(newValue);
                      }}
                      PaperProps={{
                        sx: {
                          borderRadius: '10px !important',
                        },
                      }}
                      renderInput={(startProps, endProps) => (
                        <>
                          <TextField
                            {...startProps}
                            className={classes.inputFields}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <TodayIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                          <Box sx={{ mx: 2 }}> to </Box>
                          <TextField
                            {...endProps}
                            className={classes.inputFields}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <InsertInvitationIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </>
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} container>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid item xs={6}>
                      <DesktopTimePicker
                        label="Start Time"
                        value={startDateTime}
                        onChange={(newValue) => {
                          setStartDateTime(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} style={{ width: '93%' }} />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6} container alignItems="center" justifyContent="flex-end">
                      <DesktopTimePicker
                        label="End Time"
                        value={endDateTime}
                        onChange={(newValue) => {
                          setEndDateTime(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} style={{ width: '93%' }} />
                        )}
                      />
                    </Grid>
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          md={12}
          container
          justifyContent="center"
          alignItems="center"
          direction="row"
        >
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={3}>
                <h3 style={{ marginBottom: 5, marginTop: 0 }}>Type of Promotion</h3>
                <span style={{ fontSize: '0.9rem' }}>
                  Set up the type of promotion you would like to run
                </span>
              </Grid>
              <Grid item sm={12} md={9} container spacing={3}>
                <Grid item xs={12} container sx={{ mb: 1 }}>
                  <Grid item xs={4} container justifyContent="center" alignItems="center">
                    <Box
                      id="basic-sale"
                      className={classes.promotionTypeBox}
                      style={{
                        border: promotionType.basic_checked
                          ? '1px solid #003366'
                          : '1px dashed rgba(145, 158, 171, 0.32)',
                        backgroundColor: promotionType.basic_checked
                          ? '#003366'
                          : 'rgb(244, 246, 248)',
                        color: promotionType.basic_checked ? 'white' : 'black',
                        borderRadius: '10px 0px 0px 10px',
                      }}
                      onClick={handlePromotionType}
                    >
                      <span id="basic-sale" style={{ fontSize: '0.9rem', marginBottom: 5 }}>
                        Basic
                      </span>
                      <Divider
                        id="basic-sale"
                        variant="middle"
                        style={{ backgroundColor: 'white' }}
                      />
                      <span
                        id="basic-sale"
                        style={{ fontSize: '0.875rem', marginTop: 10, marginBottom: 5 }}
                      >
                        Offer customers a discount to standard products
                      </span>
                    </Box>
                  </Grid>
                  <Grid item xs={4} container justifyContent="center" alignItems="center">
                    <Box
                      id="bundle-sale"
                      className={classes.promotionTypeBox}
                      style={{
                        border: promotionType.bundle_checked
                          ? '1px solid #003366'
                          : '1px dashed rgba(145, 158, 171, 0.32)',
                        backgroundColor: promotionType.bundle_checked
                          ? '#003366'
                          : 'rgb(244, 246, 248)',
                        color: promotionType.bundle_checked ? 'white' : 'black',
                      }}
                      onClick={handlePromotionType}
                    >
                      <span id="bundle-sale" style={{ fontSize: '0.9rem', marginBottom: 5 }}>
                        Bundle
                      </span>
                      <Divider
                        id="bundle-sale"
                        variant="middle"
                        style={{ backgroundColor: 'white' }}
                      />
                      <span
                        id="bundle-sale"
                        style={{ fontSize: '0.875rem', marginTop: 10, marginBottom: 5 }}
                      >
                        Offer customers a discount to bundled products
                      </span>
                    </Box>
                  </Grid>
                  <Grid item xs={4} container justifyContent="center" alignItems="center">
                    <Box
                      id="buy-x-get-y"
                      className={classes.promotionTypeBox}
                      style={{
                        border: promotionType.bxgy_checked
                          ? '1px solid #003366'
                          : '1px dashed rgba(145, 158, 171, 0.32)',
                        backgroundColor: promotionType.bxgy_checked
                          ? '#003366'
                          : 'rgb(244, 246, 248)',
                        color: promotionType.bxgy_checked ? 'white' : 'black',
                        borderRadius: '0px 10px 10px 0px',
                      }}
                      onClick={handlePromotionType}
                    >
                      <span id="buy-x-get-y" style={{ fontSize: '0.9rem', marginBottom: 5 }}>
                        Buy X Get Y
                      </span>
                      <Divider
                        id="buy-x-get-y"
                        variant="middle"
                        style={{ backgroundColor: 'white' }}
                      />
                      <span
                        id="buy-x-get-y"
                        style={{ fontSize: '0.875rem', marginTop: 10, marginBottom: 5 }}
                      >
                        Offer customers free product(s) when buying specific product(s)
                      </span>
                    </Box>
                  </Grid>
                  <FormHelperText error={errors.productType !== false}>
                    {errors.productType ? errors.productType : null}
                  </FormHelperText>
                </Grid>
                {atleastOnePromotionTypeSelected() && (
                  <>
                    <Grid item xs={12} container>
                      <Divider sx={{ width: '100%' }} />
                    </Grid>
                    {promotionType.basic_checked || promotionType.bundle_checked ? (
                      <Grid item xs={12} container spacing={4} sx={{ mb: 1 }}>
                        <Grid
                          item
                          xs={1}
                          container
                          alignItems="flex-end"
                          justifyContent="center"
                        >
                          <span
                            style={{
                              fontWeight: 'bold',
                              fontSize: '1.1em',
                              paddingBottom: 8,
                              paddingLeft: 15,
                            }}
                          >
                            Get
                          </span>
                        </Grid>
                        <Grid item xs={5.5} container>
                          <Grid item xs={12}>
                            Discount
                          </Grid>
                          <Grid item xs={4} container>
                            <Grid item xs={6}>
                              <Box
                                id="percentage-off"
                                onClick={handleDiscountType}
                                className={classes.discountOpt}
                                style={{
                                  border: discountType.percentage_off_checked
                                    ? '1px solid #003366'
                                    : '1px dashed rgba(145, 158, 171, 0.32)',
                                  backgroundColor: discountType.percentage_off_checked
                                    ? '#003366'
                                    : 'rgb(244, 246, 248)',
                                  color: discountType.percentage_off_checked
                                    ? 'white'
                                    : 'black',
                                  borderRadius: '5px 0px 0px 5px',
                                }}
                              >
                                %
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box
                                id="dollars-off"
                                onClick={handleDiscountType}
                                className={classes.discountOpt}
                                style={{
                                  border: discountType.dollars_off_checked
                                    ? '1px solid #003366'
                                    : '1px dashed rgba(145, 158, 171, 0.32)',
                                  backgroundColor: discountType.dollars_off_checked
                                    ? '#003366'
                                    : 'rgb(244, 246, 248)',
                                  color: discountType.dollars_off_checked ? 'white' : 'black',
                                  borderRadius: '0px 5px 5px 0px',
                                }}
                              >
                                RM
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid item xs={8} sx={{ paddingLeft: 2 }}>
                            <TextField
                              id="name"
                              variant="outlined"
                              size="small"
                              onChange={handleInputChange}
                              onBlur={handleInputChange}
                              // error={productName.error !== false}
                              // helperText={productName.error}
                              className={classes.inputFields}
                              inputRef={discountRef}
                              inputProps={{
                                style: { textAlign: 'right' },
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {discountType.dollars_off_checked && 'RM'}
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <InputAdornment position="end">
                                    {discountType.percentage_off_checked && '%'}
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={5.5}>
                          <Grid item xs={12}>
                            Product
                          </Grid>
                          <Grid item xs={12} container>
                            <Grid item xs={6}>
                              <Box
                                id="all-products"
                                className={classes.discountOpt}
                                style={{
                                  border: applicableProductType.all_checked
                                    ? '1px solid #003366'
                                    : '1px dashed rgba(145, 158, 171, 0.32)',
                                  backgroundColor: applicableProductType.all_checked
                                    ? '#003366'
                                    : 'rgb(244, 246, 248)',
                                  color: applicableProductType.all_checked ? 'white' : 'black',
                                  borderRadius: '5px 0px 0px 5px',
                                }}
                                onClick={handleApplicableProductType}
                              >
                                All
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box
                                id="specific-products"
                                className={classes.discountOpt}
                                style={{
                                  border: applicableProductType.specific_checked
                                    ? '1px solid #003366'
                                    : '1px dashed rgba(145, 158, 171, 0.32)',
                                  backgroundColor: applicableProductType.specific_checked
                                    ? '#003366'
                                    : 'rgb(244, 246, 248)',
                                  color: applicableProductType.specific_checked
                                    ? 'white'
                                    : 'black',
                                  borderRadius: '0px 5px 5px 0px',
                                }}
                                onClick={handleApplicableProductType}
                              >
                                Specific
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid item xs={12} container spacing={4} sx={{ mb: 1 }}>
                        <Grid
                          item
                          xs={1}
                          container
                          alignItems="flex-end"
                          justifyContent="center"
                        >
                          <span
                            style={{
                              fontWeight: 'bold',
                              fontSize: '1.1em',
                              paddingBottom: 8,
                              paddingLeft: 15,
                            }}
                          >
                            Buy
                          </span>
                        </Grid>
                        <Grid item xs={2} container>
                          <Grid item xs={12}>
                            Quantity
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              id="name"
                              variant="outlined"
                              size="small"
                              // onChange={handleInputChange}
                              // onBlur={handleInputChange}
                              // error={productName.error !== false}
                              // helperText={productName.error}
                              className={classes.inputFields}
                              // inputRef={nameRef}
                              inputProps={{
                                style: { textAlign: 'right' },
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          xs={1}
                          container
                          alignItems="flex-end"
                          justifyContent="center"
                          // style={{ paddingLeft: 0 }}
                        >
                          <span
                            style={{
                              fontWeight: 'bold',
                              fontSize: '1.1em',
                              paddingBottom: 8,
                              // paddingLeft: 15,
                            }}
                          >
                            Get
                          </span>
                        </Grid>
                        <Grid item xs={2} container sx={{ paddingLeft: '20px !important' }}>
                          <Grid item xs={12}>
                            Quantity
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              id="name"
                              variant="outlined"
                              size="small"
                              // onChange={handleInputChange}
                              // onBlur={handleInputChange}
                              // error={productName.error !== false}
                              // helperText={productName.error}
                              className={classes.inputFields}
                              // inputRef={nameRef}
                              inputProps={{
                                style: { textAlign: 'right' },
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={6}>
                          <Grid item xs={12}>
                            Product
                          </Grid>
                          <Grid item xs={12} container>
                            <Grid item xs={6}>
                              <Box
                                id="all-products"
                                className={classes.discountOpt}
                                style={{
                                  border: applicableProductType.all_checked
                                    ? '1px solid #003366'
                                    : '1px dashed rgba(145, 158, 171, 0.32)',
                                  backgroundColor: applicableProductType.all_checked
                                    ? '#003366'
                                    : 'rgb(244, 246, 248)',
                                  color: applicableProductType.all_checked ? 'white' : 'black',
                                  borderRadius: '5px 0px 0px 5px',
                                }}
                                onClick={handleApplicableProductType}
                              >
                                All
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box
                                id="specific-products"
                                className={classes.discountOpt}
                                style={{
                                  border: applicableProductType.specific_checked
                                    ? '1px solid #003366'
                                    : '1px dashed rgba(145, 158, 171, 0.32)',
                                  backgroundColor: applicableProductType.specific_checked
                                    ? '#003366'
                                    : 'rgb(244, 246, 248)',
                                  color: applicableProductType.specific_checked
                                    ? 'white'
                                    : 'black',
                                  borderRadius: '0px 5px 5px 0px',
                                }}
                                onClick={handleApplicableProductType}
                              >
                                Specific
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                    <Grid item xs={12} container>
                      <Divider sx={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12}>
                      {applicableProductType.specific_checked && (
                        <>
                          <p className={classes.inputTitle}>Search for products to add</p>
                          <Grid container>
                            <Grid item xs={11}>
                              <Autocomplete
                                id="tags-outlined"
                                multiple
                                disableCloseOnSelect
                                limitTags={1}
                                onChange={handleSelectProduct}
                                filterOptions={filterOptions}
                                options={products}
                                getOptionLabel={(option) => option.name}
                                sx={{ width: '100%' }}
                                value={selectedProducts}
                                isOptionEqualToValue={(option, value) => {
                                  return option.uuid === value.uuid;
                                }}
                                renderOption={(productProps, option, { selected }) => (
                                  <li {...productProps}>
                                    <Checkbox
                                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                                      style={{ marginRight: 8 }}
                                      checked={selected}
                                    />
                                    {option.name}
                                    <IconButton
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleOpenProductModal(option.uuid);
                                        e.stopPropagation();
                                      }}
                                    >
                                      <InfoRoundedIcon fontSize="small" />
                                    </IconButton>
                                  </li>
                                )}
                                renderInput={(params) => (
                                  <TextField {...params} placeholder="Product name/barcode" />
                                )}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={1}
                              container
                              justifyContent="center"
                              alignItems="center"
                            >
                              <IconButton size="large" onClick={handleClickOpen}>
                                <Badge
                                  badgeContent={filterActivated ? products.length : 0}
                                  color="error"
                                >
                                  <FilterAltRoundedIcon sx={{ fontSize: '1.8rem' }} />
                                </Badge>
                              </IconButton>
                              <ProductFilter
                                open={openFilter}
                                handleClose={handleClose}
                                categoryOptions={categoryOptions}
                                setCategoryFilterType={setCategoryFilterType}
                                setSelectedCategoryFilter={setSelectedCategoryFilter}
                                setSelectedActiveStatusFilter={setSelectedActiveStatusFilter}
                                setSelectedStockStatusFilter={setSelectedStockStatusFilter}
                                categoryFilterType={categoryFilterType}
                                selectedCategoryFilter={selectedCategoryFilter}
                                selectedActiveStatusFilter={selectedActiveStatusFilter}
                                selectedStockStatusFilter={selectedStockStatusFilter}
                                filteredQuantity={products.length}
                                filterActivated={filterActivated}
                                clearFilters={clearFilters}
                              />
                            </Grid>
                          </Grid>
                          <FormHelperText error={errors.quillText !== false}>
                            {errors.quillText ? errors.quillText : null}
                          </FormHelperText>
                        </>
                      )}
                    </Grid>
                    <Grid item xs={12} container>
                      {tableConditionChecked() && (
                        <TableContainer>
                          <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell
                                  sx={{ width: '60%' }}
                                  style={{
                                    borderBottom: '1.5px solid rgba(224, 224, 224, 1)',
                                  }}
                                >
                                  Product
                                </TableCell>
                                <TableCell
                                  sx={{ width: '20%' }}
                                  align="right"
                                  style={{
                                    borderBottom: '1.5px solid rgba(224, 224, 224, 1)',
                                  }}
                                >
                                  Retail Price
                                </TableCell>
                                {!promotionType.bxgy_checked && (
                                  <TableCell
                                    sx={{ width: '20%' }}
                                    align="right"
                                    style={{
                                      borderBottom: '1.5px solid rgba(224, 224, 224, 1)',
                                    }}
                                  >
                                    Sale Price
                                  </TableCell>
                                )}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {selectedProducts.map(
                                ({
                                  name,
                                  retail_price: retailPrice,
                                  sale_price: salePrice,
                                  uuid,
                                }) => (
                                  <TableRow
                                    key={uuid}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    <TableCell
                                      style={{
                                        borderBottom: '0.5px solid rgba(224, 224, 224, 0.7)',
                                      }}
                                    >
                                      {name}
                                      <IconButton
                                        onClick={() => handleOpenProductModal(uuid)}
                                        style={{ positiona: 'relative', bottom: 1.8 }}
                                      >
                                        <InfoRoundedIcon fontSize="small" />
                                      </IconButton>
                                    </TableCell>
                                    <TableCell
                                      align="right"
                                      style={{
                                        borderBottom: '0.5px solid rgba(224, 224, 224, 0.7)',
                                      }}
                                    >
                                      RM {retailPrice}
                                    </TableCell>
                                    {!promotionType.bxgy_checked && (
                                      <TableCell
                                        align="right"
                                        style={{
                                          borderBottom: '0.5px solid rgba(224, 224, 224, 0.7)',
                                        }}
                                      >
                                        RM {salePrice.toFixed(2)}
                                      </TableCell>
                                    )}
                                  </TableRow>
                                )
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
            <ProductDetailsModal
              products={products}
              Swiper={Swiper}
              SwiperSlide={SwiperSlide}
              openModal={openProductModal}
              productIndex={productIndex}
              handleCloseModal={handleCloseProductModal}
              ReactQuill={ReactQuill}
            />
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
};

export default PromotionForm;

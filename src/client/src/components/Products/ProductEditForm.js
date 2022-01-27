import React, { useRef, useState, useEffect } from 'react';

import Barcoder from 'barcoder';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../assets/css/overrideQuill.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import SpeedIcon from '@mui/icons-material/Speed';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

import { makeStyles } from '@mui/styles';

import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

import '../../assets/css/swiper_override.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import { ReactComponent as ReactLogo } from '../../assets/svg/Upload-amico.svg';
import CategorySelect from '../Category/CategorySelect';
import ImageModal from '../Images/ImageModal';
import ItemDetailsModal from '../Items/ItemDetailsModal';

import useFirstRender from '../../hooks/useFirstRender';
import { getFileObject } from '../../utils/general';

import '../../assets/css/categorySelectOverride.css';

SwiperCore.use([Pagination, Navigation]);

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
  inputTiltle: {
    margin: '0px 0px 8px',
    'font-weight': '600',
    'line-height': '1.57143',
    'font-size': '0.875rem',
    'font-family': 'Public Sans, sans-serif',
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
  stockPaper: {
    boxShadow:
      '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12) !important',
  },
}));

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
const ProductForm = (props) => {
  const classes = useStyles();
  const quillModules = getEditorModules();
  const quillFormats = getEditorFormat();
  const isFirstRender = useFirstRender();
  const storeUUID = localStorage.getItem('storeUUID');

  const { onSubmit, categoryOptions, items, currentProduct } = props;

  const nameRef = useRef();
  const barcodeNumberRef = useRef();
  const measurementValueRef = useRef();
  const markupRef = useRef();
  const retailPriceRef = useRef();

  const [validationComplete, setValidationComplete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openItemModal, setOpenItemModal] = useState(false);
  const [itemIndex, setItemIndex] = useState();
  const [itemOptions, setItemOptions] = useState();
  const [quillText, setQuillText] = useState({ editorHtml: currentProduct.description });
  const [markup, setMarkup] = useState(0.0);
  const [retailPrice, setRetailPrice] = useState(0.0);
  const [productName, setProductName] = useState({
    value: currentProduct.name,
    error: false,
  });
  const [barcodeNumber, setBarcodeNumber] = useState({
    value: currentProduct.barcode_number,
    error: false,
  });
  const [measurementValue, setMeasurementValue] = useState({
    value: currentProduct.measurement_value,
    error: false,
  });
  const [selectedCategory, setSelectedCategory] = useState(
    currentProduct.sub_categories.map(({ category, name, ...uuid }) => uuid)
  );
  const [selectedMeasurementUnit, setSelectedMeasurementUnit] = useState(
    currentProduct.measurement_unit
  );
  const [selectedStockStatus, setSelectedStockStatus] = useState(currentProduct.stock_status);
  const [selectedProductItem, setSelectedProductItem] = useState({
    standard: null,
    bundle: [],
  });
  const [productType, setProductType] = useState({
    standard_checked: false,
    bundle_checked: false,
  });
  const [image, setImage] = useState({
    imgFiles: [],
    imgPreviews: [],
  });
  const [product, setProduct] = useState({
    standard: { supplyPrice: 0 },
    bundle: { totalSupplyPrice: 0, totalItemQuantity: 0 },
  });
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

  useEffect(() => {
    const itemOpt = items.map(
      ({
        created_at,
        images,
        note,
        store_uuid,
        sub_categories,
        updated_at,
        wholesale_price,
        ...remainingAtts
      }) => ({
        ...remainingAtts,
        quantity: 1,
        totalSupplyPrice: parseFloat(wholesale_price),
        wholesalePrice: parseFloat(wholesale_price),
      })
    );
    setItemOptions(itemOpt);
  }, []);

  /// ///////////////////    Validation    /////////////////// ///

  const validateName = (name) => {
    if (!name) {
      setProductName({
        ...productName,
        error: "Please enter the product's name",
      });
    } else {
      setProductName({
        value: name,
        error: false,
      });
    }
  };

  const validateBarcode = (barcode) => {
    // GTIN: Global Trade Item Number
    const validBarcode = Barcoder.validate(barcode);

    if (!barcode) {
      setBarcodeNumber({
        ...barcodeNumber,
        error: "Please enter the product's barcode number",
      });
    } else if (!validBarcode) {
      setBarcodeNumber({
        value: barcode,
        error: 'The code specified is invalid Global Trade Item Number (GTIN)',
      });
    } else {
      setBarcodeNumber({
        value: barcode,
        error: false,
      });
    }
  };

  const validateDescription = (value, currentError) => {
    const validQuillText = value;

    if (!validQuillText) {
      currentError = {
        ...currentError,
        quillText: 'Please enter product descriptions for your customers reference',
      };
    } else {
      currentError = {
        ...currentError,
        quillText: false,
      };
    }

    return currentError;
  };

  const validateCategory = (value, currentError) => {
    const validCategory = value.length > 0;

    if (!validCategory) {
      currentError = {
        ...currentError,
        category:
          'Please select category/categories for this product to ease your customer to filter their product search.',
      };
    } else {
      currentError = {
        ...currentError,
        category: false,
      };
    }

    return currentError;
  };

  const validateStockStatus = (value, currentError) => {
    const validStockStatus = value;

    if (!validStockStatus) {
      currentError = {
        ...currentError,
        stock: "Please select this product's stock status for your customers reference.",
      };
    } else {
      currentError = {
        ...currentError,
        stock: false,
      };
    }

    return currentError;
  };

  const validateMeasurementVal = (val) => {
    const reg = /^\d+(,\d{3})*(\.\d{1,3})?$/;
    const isValidValue = reg.test(val);

    if (!val) {
      setMeasurementValue({
        ...measurementValue,
        error: "Please enter the product's measurement",
      });
    } else if (!isValidValue) {
      setMeasurementValue({
        value: val,
        error: 'Value specified is invalid',
      });
    } else {
      setMeasurementValue({
        value: val,
        error: false,
      });
    }
  };

  const validateMeasurementUnit = (value, currentError) => {
    const validUnit = value;

    if (!validUnit) {
      currentError = {
        ...currentError,
        mUnit: 'Please enter the unit of measurement.',
      };
    } else {
      currentError = {
        ...currentError,
        mUnit: false,
      };
    }

    return currentError;
  };

  const validateProductType = (value, currentError) => {
    const validProductType = value.standard_checked || value.bundle_checked;

    if (!validProductType) {
      currentError = {
        ...currentError,
        productType: 'Please select the product type.',
      };
    } else {
      currentError = {
        ...currentError,
        productType: false,
      };
    }

    return currentError;
  };

  const validateProductItem = (value, currentError) => {
    let validProductItem;

    if (productType.standard_checked) {
      validProductItem = value.standard;
    } else {
      validProductItem = value.bundle.length > 0;
    }

    if (!validProductItem && productType.standard_checked) {
      currentError = {
        ...currentError,
        standardProductItem:
          'Please select an item from the inventory to act as a base for this product.',
      };
    } else if (!validProductItem && productType.bundle_checked) {
      currentError = {
        ...currentError,
        bundleProductItem:
          'Please select one or multiple item/s from the inventory to act as a base for this product.',
      };
    } else if (validProductItem && productType.standard_checked) {
      currentError = {
        ...currentError,
        standardProductItem: false,
      };
    } else if (validProductItem && productType.bundle_checked) {
      currentError = {
        ...currentError,
        bundleProductItem: false,
      };
    }

    return currentError;
  };

  const validateImages = ({ errors: currentError, files = [], validPicQty = true }) => {
    let errorMsg = false;

    for (const file of files) {
      const reg = /^(image\/)(png|jpg|jpeg)/;

      const validImgExt = reg.test(file.type);
      const validTotalUploads = image.imgFiles.length + files.length <= 12;
      const validFileSize = file.size / 1024 / 1024 < 1.5;

      if (!validImgExt) {
        errorMsg = 'Only jpg, jpeg or png are allowed';
        break;
      } else if (!validTotalUploads) {
        errorMsg = 'Max uploads is 12';
        break;
      } else if (!validFileSize) {
        errorMsg = 'File size exceeds 1.5 MB';
        break;
      }
    }

    if (!validPicQty) {
      errorMsg = 'Please provide some pictures for your customers reference';
    }

    currentError = {
      ...currentError,
      image: errorMsg,
    };

    return currentError;
  };

  const cleanProductItem = () => {
    const { standard_checked, bundle_checked } = productType;
    let productItem;

    if (standard_checked) {
      const { standard } = selectedProductItem;

      productItem = {
        uuid: standard.uuid,
        quantity: standard.quantity,
      };
    } else if (bundle_checked) {
      productItem = selectedProductItem.bundle.map(
        ({ barcode_number, name, totalSupplyPrice, wholesalePrice, ...remainingAttrs }) => ({
          ...remainingAttrs,
        })
      );
    }

    return productItem;
  };

  useEffect(() => {
    const reset = false;

    const passedTheTest =
      validationComplete === true &&
      !productName.error &&
      !barcodeNumber.error &&
      !measurementValue.error &&
      !errors.quillText &&
      !errors.category &&
      !errors.stock &&
      !errors.image &&
      !errors.mUnit &&
      !errors.productType &&
      !errors.standardProductItem &&
      !errors.bundleProductItem;

    if (passedTheTest) {
      const formData = new FormData();
      const productItem = cleanProductItem();

      formData.append('name', productName.value);
      formData.append('barcode_number', barcodeNumber.value);
      formData.append('description', quillText.editorHtml);
      formData.append('sub_category', JSON.stringify(selectedCategory));
      formData.append('stock_status', selectedStockStatus);
      formData.append('measurement_value', measurementValue.value);
      formData.append('measurement_unit', selectedMeasurementUnit);
      formData.append('product_item', JSON.stringify(productItem));
      formData.append('markup_percentage', markup);
      formData.append('retail_price', retailPrice);
      formData.append('store_uuid', storeUUID);
      formData.append('old_imgs', JSON.stringify(currentProduct.images));

      formData.append('product_type', productType.standard_checked ? 'Standard' : 'Bundle');

      formData.append(
        'supply_price',
        productType.standard_checked
          ? product.standard.supplyPrice
          : product.bundle.totalSupplyPrice
      );
      formData.append('multer_type', 'product');
      for (const key of Object.keys(image.imgFiles)) {
        formData.append('imgCollection', image.imgFiles[key], image.imgFiles[key].name);
      }

      onSubmit(formData);
    }

    setValidationComplete(reset);
  }, [validationComplete]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedError = errors;

    validateName(nameRef.current.value);
    validateBarcode(barcodeNumberRef.current.value);
    validateMeasurementVal(measurementValueRef.current.value);

    // custom fields
    updatedError = validateDescription(quillText.editorHtml, updatedError);
    updatedError = validateCategory(selectedCategory, updatedError);
    updatedError = validateStockStatus(selectedStockStatus, updatedError);
    updatedError = validateMeasurementUnit(selectedMeasurementUnit, updatedError);
    updatedError = validateProductType(productType, updatedError);
    updatedError = validateProductItem(selectedProductItem, updatedError);
    updatedError = validateImages({
      errors: updatedError,
      validPicQty: image.imgFiles.length > 0,
    });
    setErrors(updatedError);

    setValidationComplete(true);
  };

  /// ///////////////////    DOM Handler    /////////////////// ///

  useEffect(() => {
    if (!isFirstRender) {
      const updatedError = validateCategory(selectedCategory, errors);
      setErrors(updatedError);
    }
  }, [selectedCategory]);

  const handleCloseItemModal = () => setOpenItemModal(false);

  const handleOpenItemModal = (uuid) => {
    const index = items.findIndex((item) => item.uuid === uuid);

    setItemIndex(index);
    setOpenItemModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

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

  const onSelectStockStatus = ({ target: { value } }) => {
    setSelectedStockStatus(value);
    const updatedError = validateStockStatus(value, errors);
    setErrors(updatedError);
  };

  const onSelectUnit = (e, value) => {
    setSelectedMeasurementUnit(value);
    const updatedError = validateMeasurementUnit(value, errors);
    setErrors(updatedError);
  };

  const handleOpenModal = (e) => {
    if (e.target.tagName === 'IMG') {
      setOpenModal(true);
    }
  };

  const calMarkupNUpdate = (currentMarkup, unitCost) => {
    const retailPrices = (1 + currentMarkup / 100) * unitCost;

    retailPriceRef.current.value = retailPrices.toFixed(2);

    setMarkup(currentMarkup);
    setRetailPrice(retailPrices);
  };

  const calRetailPriceNUpdate = (currentRetailPrice, unitCost) => {
    const markupPencentage =
      ((currentRetailPrice - unitCost) / ((unitCost * 100) / 100)) * 100;

    markupRef.current.value = markupPencentage.toFixed(2);

    setMarkup(markupPencentage);
    setRetailPrice(currentRetailPrice);
  };

  const handleProductType = ({ target }) => {
    const { id: selectedProductType } = target;
    let updatedError;
    let updatedProductType;
    let updatedPrice;

    if (selectedProductType === 'standard') {
      updatedProductType = { standard_checked: true, bundle_checked: false };
      updatedError = validateProductType(updatedProductType, errors);
      updatedPrice = product.standard.supplyPrice;
    } else if (selectedProductType === 'bundle') {
      updatedProductType = { standard_checked: false, bundle_checked: true };
      updatedError = validateProductType(updatedProductType, errors);
      updatedPrice = product.bundle.totalSupplyPrice;
    }
    setProductType(updatedProductType);
    setErrors(updatedError);
    calMarkupNUpdate(parseFloat(markupRef.current.value), updatedPrice);
  };

  const handleInputChange = ({ target }) => {
    const { id, value } = target;

    if (id === 'barcode_number') {
      validateBarcode(value);
    } else if (id === 'name') {
      validateName(value);
    } else if (id === 'measurement_value') {
      validateMeasurementVal(value);
    }
  };

  const handleImagePreview = (files) => {
    const updatedImagesPreview = image.imgPreviews;

    files.forEach((img) => {
      updatedImagesPreview.push({ name: img.name, path: URL.createObjectURL(img) });
    });

    setImage({
      imgFiles: [...image.imgFiles, ...files],
      imgPreviews: [...updatedImagesPreview],
    });
  };

  const handleCapture = async ({ target }) => {
    const files = Object.values(target.files);
    const updatedError = validateImages({ errors, files });

    setErrors(updatedError);

    if (!updatedError.image) {
      handleImagePreview(files);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();

    const files = Object.values(e.dataTransfer.files);
    const updatedError = validateImages({ errors, files });

    setErrors(updatedError);

    if (!updatedError.image) {
      handleImagePreview(files);
    }
  };

  const removeImagesPreview = (e, selectedUrl, selectedImgName) => {
    let currentImagesPreview = image.imgPreviews;
    let currentImagesFiles = image.imgFiles;

    currentImagesPreview = currentImagesPreview.filter(({ path }) => path !== selectedUrl);
    currentImagesFiles = currentImagesFiles.filter(({ name }) => name !== selectedImgName);
    setImage({
      imgFiles: [...currentImagesFiles],
      imgPreviews: [...currentImagesPreview],
    });

    const updatedError = validateImages({
      errors,
      validPicQty: currentImagesFiles.length > 0,
    });

    setErrors(updatedError);
  };

  const updateStandardGeneralInfo = (item) => {
    if (item) {
      nameRef.current.value = item.name;
      barcodeNumberRef.current.value = item.barcode_number;

      setProductName({
        ...productName,
        value: item.name,
      });
      setBarcodeNumber({
        ...barcodeNumber,
        value: item.barcode_number,
      });
    } else {
      nameRef.current.value = '';
      barcodeNumberRef.current.value = '';

      setProductName({
        ...productName,
        value: '',
      });
      setBarcodeNumber({
        ...barcodeNumber,
        value: '',
      });
    }
  };

  const handleSelectItem = (e, value) => {
    let totalQty = 0;
    let totalPrice = 0;
    let updatedProductItem;
    let updatedProduct;
    let updatedPrice;

    if (productType.standard_checked) {
      const supPrice = value ? value.wholesalePrice : 0;

      updatedProductItem = {
        ...selectedProductItem,
        standard: value,
      };

      updatedProduct = {
        ...product,
        standard: { supplyPrice: supPrice },
      };

      updatedPrice = supPrice;
      updateStandardGeneralInfo(value);
    } else {
      updatedProductItem = {
        ...selectedProductItem,
        bundle: value,
      };

      value.forEach(({ quantity: qty, totalSupplyPrice }) => {
        totalQty += qty;
        totalPrice += totalSupplyPrice;
      });

      updatedProduct = {
        ...product,
        bundle: { totalSupplyPrice: totalPrice, totalItemQuantity: totalQty },
      };

      updatedPrice = totalPrice;
    }

    setSelectedProductItem(updatedProductItem);
    setProduct(updatedProduct);
    calMarkupNUpdate(parseFloat(markupRef.current.value), updatedPrice);

    const updatedError = validateProductItem(updatedProductItem, errors);
    setErrors(updatedError);
  };

  const handleQuantityChange = (e, index) => {
    const oldItem = selectedProductItem.bundle;
    const oldItemVal = oldItem[index];
    const quantity = parseInt(e.target.value, 10);
    let totalQty = 0;
    let totalPrice = 0;

    oldItem[index] = {
      ...oldItemVal,
      quantity,
      totalSupplyPrice: oldItemVal.wholesalePrice * quantity,
    };

    oldItem.forEach(({ quantity: qty, totalSupplyPrice }) => {
      totalQty += qty;
      totalPrice += totalSupplyPrice;
    });

    setSelectedProductItem({
      ...selectedProductItem,
      bundle: oldItem,
    });

    setProduct({
      ...product,
      bundle: { totalSupplyPrice: totalPrice, totalItemQuantity: totalQty },
    });

    calMarkupNUpdate(parseFloat(markupRef.current.value), totalPrice);
  };

  const handleMarkup = () => {
    const currentMarkup = parseFloat(markupRef.current.value);
    const unitCost = productType.standard_checked
      ? product.standard.supplyPrice
      : product.bundle.totalSupplyPrice;

    calMarkupNUpdate(currentMarkup, unitCost);
  };

  const handleRetailPrice = () => {
    const currentRetailPrice = parseFloat(retailPriceRef.current.value);
    const unitCost = productType.standard_checked
      ? product.standard.supplyPrice
      : product.bundle.totalSupplyPrice;

    calRetailPriceNUpdate(currentRetailPrice, unitCost);
  };

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (option) => option.name + option.barcode_number,
  });

  /// ///////////////////    Prep Default    /////////////////// ///

  const setDefaultProductItemDetails = () => {
    let defaultProductType;
    let defaultProduct;
    let defaultSelectedProductItem;
    let suppPrice;

    const selectedItem = currentProduct.items.map(
      ({
        created_at,
        images,
        note,
        store_uuid,
        sub_categories,
        updated_at,
        wholesale_price,
        ...remainingAtts
      }) => ({
        ...remainingAtts,
        totalSupplyPrice: parseFloat(wholesale_price) * remainingAtts.quantity,
        wholesalePrice: parseFloat(wholesale_price),
      })
    );

    if (currentProduct.product_type === 'Standard') {
      suppPrice = selectedItem[0].wholesalePrice;

      defaultProductType = { standard_checked: true, bundle_checked: false };
      defaultSelectedProductItem = { standard: selectedItem[0], bundle: [] };

      defaultProduct = {
        ...product,
        standard: { supplyPrice: suppPrice },
      };
    } else {
      let totalQty = 0;
      let totalPrice = 0;

      defaultProductType = { standard_checked: false, bundle_checked: true };
      defaultSelectedProductItem = { standard: null, bundle: selectedItem };

      selectedItem.forEach(({ quantity: qty, totalSupplyPrice }) => {
        totalQty += qty;
        totalPrice += totalSupplyPrice;
      });

      defaultProduct = {
        ...product,
        bundle: { totalSupplyPrice: totalPrice, totalItemQuantity: totalQty },
      };

      suppPrice = totalPrice;
    }

    setProductType(defaultProductType);
    setSelectedProductItem(defaultSelectedProductItem);
    setProduct(defaultProduct);

    markupRef.current.value = currentProduct.markup_percentage;
    calMarkupNUpdate(parseFloat(currentProduct.markup_percentage), suppPrice);
  };

  /* eslint-disable no-await-in-loop */
  useEffect(async () => {
    const selectedImages = [];

    for (const eachImage of currentProduct.images) {
      const file = await getFileObject(eachImage.path);
      selectedImages.push(file);
    }

    handleImagePreview(selectedImages);
    setDefaultProductItemDetails();
  }, []);

  return (
    <form
      id="product-form"
      className={classes.form}
      onSubmit={handleSubmit}
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
              <Grid item sm={12} md={4}>
                <h3 style={{ marginBottom: 5, marginTop: 0 }}>General</h3>
                <span style={{ fontSize: '0.9rem' }}>
                  Change general information regarding this product
                </span>
              </Grid>
              <Grid item sm={12} md={8} container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    defaultValue={currentProduct.name}
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                    error={productName.error !== false}
                    helperText={productName.error}
                    className={classes.inputFields}
                    inputRef={nameRef}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="barcode_number"
                    label="Barcode Number"
                    variant="outlined"
                    autoComplete="on"
                    defaultValue={currentProduct.barcode_number}
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                    error={barcodeNumber.error !== false}
                    helperText={barcodeNumber.error}
                    className={classes.inputFields}
                    inputRef={barcodeNumberRef}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <QrCodeScannerIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <p
                    className={classes.inputTiltle}
                    style={{ color: errors.quillText ? '#d32f2f' : 'black' }}
                  >
                    Description
                  </p>
                  <ReactQuill
                    value={quillText.editorHtml}
                    onChange={handleChange}
                    modules={quillModules}
                    formats={quillFormats}
                  />
                  <FormHelperText error={errors.quillText !== false}>
                    {errors.quillText ? errors.quillText : null}
                  </FormHelperText>
                </Grid>

                <Grid item xs={12}>
                  <CategorySelect
                    categoryOptions={categoryOptions}
                    setSelectedCategory={setSelectedCategory}
                    defaultValue={currentProduct.sub_categories}
                  />
                  <FormHelperText error={errors.category !== false}>
                    {errors.category ? errors.category : null}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="select-stock-status-label">Stock Status</InputLabel>
                    <Select
                      labelId="select-stock-status-label"
                      id="select-stock-status"
                      label="Stock Status"
                      onChange={onSelectStockStatus}
                      value={selectedStockStatus}
                      style={{ height: '56px' }}
                      MenuProps={{
                        PopoverClasses: {
                          paper: classes.stockPaper,
                        },
                      }}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          <Chip
                            label={selected}
                            style={{
                              fontWeight: 'bold',
                              paddingRight: 45,
                              paddingLeft: 30,
                              color: 'white',
                              backgroundColor:
                                selectedStockStatus === 'In Stock'
                                  ? '#39A388'
                                  : selectedStockStatus === 'Low Stock'
                                  ? '#F0A500'
                                  : '#FF5151',
                            }}
                          />
                        </Box>
                      )}
                    >
                      {['In Stock', 'Low Stock', 'Out of Stock'].map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormHelperText error={errors.stock !== false}>
                    {errors.stock ? errors.stock : null}
                  </FormHelperText>
                </Grid>
                <Grid item sm={7} xs={12}>
                  <TextField
                    id="measurement_value"
                    label="Measurement Value"
                    variant="outlined"
                    defaultValue={currentProduct.measurement_value}
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                    error={measurementValue.error !== false}
                    helperText={measurementValue.error}
                    className={classes.inputFields}
                    inputRef={measurementValueRef}
                    // inputProps={{ style: { textAlign: 'right' } }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SpeedIcon /> &nbsp;&nbsp;
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item sm={5} xs={12}>
                  <Autocomplete
                    id="measurement_unit"
                    disablePortal
                    autoSelect
                    freeSolo
                    defaultValue={currentProduct.measurement_unit}
                    options={['gram', 'kilogram', 'packet']}
                    sx={{ width: '100%' }}
                    onChange={onSelectUnit}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Measurement Unit"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <>
                              <InputAdornment position="start">
                                <DeviceThermostatIcon />
                              </InputAdornment>
                              {params.InputProps.startAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                  <FormHelperText error={errors.mUnit !== false}>
                    {errors.mUnit ? errors.mUnit : null}
                  </FormHelperText>
                </Grid>
                <Grid item sm={12}>
                  <p className={classes.inputTiltle}>Product Images</p>
                  <Box style={{ marginBottom: 30 }}>
                    <input
                      id="imgs"
                      name="imgCollection"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleCapture}
                      autoComplete="off"
                      style={{ display: 'none' }}
                    />
                    <label
                      htmlFor="imgs"
                      className={classes.inputImageBox}
                      onDrop={onDrop}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <ReactLogo style={{ width: '100%' }} />
                      <div style={{ fontSize: '0.8rem' }}>
                        Drop images here or click &nbsp;
                        <span style={{ color: '#004C99', textDecoration: 'underline' }}>
                          browse
                        </span>
                        &nbsp; to upload
                      </div>
                    </label>
                    <FormHelperText error={errors.image !== false}>
                      {errors.image
                        ? errors.image
                        : 'Only jpg, jpeg or png are allowed. Max 12 uploads (each must < 1.5 MB)'}
                    </FormHelperText>
                  </Box>
                  <p className={classes.inputTiltle}>Images Preview</p>
                  <Divider sx={{ mb: image.imgPreviews.length > 0 ? 3 : 10 }} />
                  <Grid container spacing={2}>
                    {image.imgPreviews.map(({ path, name }) => (
                      <Grid item sm={2} md={2} key={path}>
                        <Card
                          elevation={3}
                          // onClick={(e) => onClickUrl(e, path)}
                          onClick={handleOpenModal}
                          style={{
                            Width: '100px',
                            height: '110px',
                            borderRadius: 10,
                          }}
                        >
                          <Box style={{ position: 'absolute' }}>
                            <IconButton
                              className={classes.customHoverFocus}
                              onClick={(e) => removeImagesPreview(e, path, name)}
                            >
                              <RemoveCircleIcon
                                fontSize="small"
                                style={{
                                  color: 'white',
                                  backgroundColor: 'black',
                                  borderRadius: 50,
                                }}
                              />
                            </IconButton>
                          </Box>
                          <img
                            src={path}
                            alt="..."
                            style={{
                              width: '100px',
                              height: '110px',
                              objectFit: 'fill',
                            }}
                          />
                        </Card>
                      </Grid>
                    ))}
                    <ImageModal
                      images={image.imgPreviews}
                      Swiper={Swiper}
                      SwiperSlide={SwiperSlide}
                      openModal={openModal}
                      handleCloseModal={handleCloseModal}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
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
              <Grid item xs={12} sm={12} md={4}>
                <h3 style={{ marginBottom: 5, marginTop: 0 }}>Product Items</h3>
                <span style={{ fontSize: '0.9rem' }}>
                  Select item/s from the inventory to create <br /> a new product
                </span>
              </Grid>
              <Grid item xs={12} sm={12} md={8} container spacing={3}>
                <Grid item xs={12} container>
                  <Grid item xs={6} container justifyContent="center" alignItems="center">
                    <Box
                      id="standard"
                      style={{
                        border: productType.standard_checked
                          ? '1px solid #003366'
                          : '1px dashed rgba(145, 158, 171, 0.32)',
                        backgroundColor: productType.standard_checked
                          ? '#003366'
                          : 'rgb(244, 246, 248)',
                        color: productType.standard_checked ? 'white' : 'black',
                        width: '100%',
                        height: 100,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        borderRadius: '10px 0px 0px 10px',
                        cursor: 'pointer',
                      }}
                      onClick={handleProductType}
                    >
                      Standard Product
                    </Box>
                  </Grid>
                  <Grid item xs={6} container justifyContent="center" alignItems="center">
                    <Box
                      id="bundle"
                      style={{
                        border: productType.bundle_checked
                          ? '1px solid #003366'
                          : '1px dashed rgba(145, 158, 171, 0.32)',
                        backgroundColor: productType.bundle_checked
                          ? '#003366'
                          : 'rgb(244, 246, 248)',
                        color: productType.bundle_checked ? 'white' : 'black',
                        width: '100%',
                        height: 100,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        borderRadius: '0px 10px 10px 0px',
                        cursor: 'pointer',
                      }}
                      onClick={handleProductType}
                    >
                      Bundle Product
                    </Box>
                  </Grid>
                  <FormHelperText error={errors.productType !== false}>
                    {errors.productType ? errors.productType : null}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  {productType.standard_checked || productType.bundle_checked ? (
                    <>
                      <p className={classes.inputTiltle}>Search for item to add</p>
                      <Autocomplete
                        id="tags-outlined"
                        multiple={productType.bundle_checked}
                        disableCloseOnSelect
                        onChange={handleSelectItem}
                        value={
                          productType.standard_checked
                            ? selectedProductItem.standard
                            : selectedProductItem.bundle
                        }
                        filterOptions={filterOptions}
                        options={itemOptions}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) => {
                          if (
                            productType.standard_checked &&
                            selectedProductItem.standard === null
                          ) {
                            return true;
                          }

                          return option.uuid === value.uuid;
                        }}
                        sx={{ width: '100%' }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Item name/barcode"
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <>
                                  {productType.standard_checked &&
                                  selectedProductItem.standard ? (
                                    <InputAdornment position="start">
                                      <IconButton
                                        style={{ positiona: 'relative', bottom: 1.8 }}
                                        onClick={() => {
                                          handleOpenItemModal(
                                            selectedProductItem.standard.uuid
                                          );
                                        }}
                                      >
                                        <InfoRoundedIcon fontSize="small" />
                                      </IconButton>
                                    </InputAdornment>
                                  ) : (
                                    ''
                                  )}

                                  {params.InputProps.startAdornment}
                                </>
                              ),
                            }}
                          />
                        )}
                      />
                      <FormHelperText
                        error={
                          productType.standard_checked && errors.standardProductItem !== false
                        }
                      >
                        {productType.standard_checked && errors.standardProductItem
                          ? errors.standardProductItem
                          : null}
                      </FormHelperText>
                      <FormHelperText
                        error={
                          productType.bundle_checked && errors.bundleProductItem !== false
                        }
                      >
                        {productType.bundle_checked && errors.bundleProductItem
                          ? errors.bundleProductItem
                          : null}
                      </FormHelperText>
                    </>
                  ) : null}
                </Grid>
                <Grid item xs={12} container>
                  {selectedProductItem.bundle.length > 0 && productType.bundle_checked ? (
                    <TableContainer>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{ width: '55%' }}
                              style={{
                                borderBottom: '1.5px solid rgba(224, 224, 224, 1)',
                              }}
                            >
                              Item
                            </TableCell>
                            <TableCell
                              sx={{ width: '25%' }}
                              align="right"
                              style={{
                                borderBottom: '1.5px solid rgba(224, 224, 224, 1)',
                              }}
                            >
                              Quantity
                            </TableCell>
                            <TableCell
                              sx={{ width: '25%' }}
                              align="right"
                              style={{
                                borderBottom: '1.5px solid rgba(224, 224, 224, 1)',
                              }}
                            >
                              Supply Price
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedProductItem.bundle.map(
                            (
                              {
                                name,
                                totalSupplyPrice,

                                uuid,
                                quantity,
                              },
                              index
                            ) => (
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
                                    onClick={() => handleOpenItemModal(uuid)}
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
                                  <TextField
                                    id="name"
                                    size="small"
                                    variant="outlined"
                                    className={classes.inputFields}
                                    style={{ width: '80%' }}
                                    defaultValue={quantity}
                                    onChange={(e) => handleQuantityChange(e, index)}
                                    inputProps={{ style: { textAlign: 'right' } }}
                                  />
                                </TableCell>
                                <TableCell
                                  align="right"
                                  style={{
                                    borderBottom: '0.5px solid rgba(224, 224, 224, 0.7)',
                                  }}
                                >
                                  RM {totalSupplyPrice.toFixed(2)}
                                </TableCell>
                              </TableRow>
                            )
                          )}
                          <TableRow>
                            <TableCell align="right" style={{ borderBottom: 'none' }}>
                              TOTAL
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ borderBottom: 'none', paddingRight: 28 }}
                            >
                              {product.bundle.totalItemQuantity}
                            </TableCell>
                            <TableCell align="right" style={{ borderBottom: 'none' }}>
                              RM {product.bundle.totalSupplyPrice.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
            <ItemDetailsModal
              items={items}
              Swiper={Swiper}
              SwiperSlide={SwiperSlide}
              openModal={openItemModal}
              itemIndex={itemIndex}
              handleCloseModal={handleCloseItemModal}
              ReactQuill={ReactQuill}
            />
          </Paper>
        </Grid>
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
              <Grid item xs={12} sm={12} md={4}>
                <h3 style={{ marginBottom: 5, marginTop: 0 }}>Price</h3>
              </Grid>
              <Grid item xs={12} sm={12} md={8} container spacing={2}>
                <Grid item xs={12} sm={8}>
                  Supply Price
                </Grid>
                <Grid item xs={12} sm={4} style={{ textAlign: 'end', paddingRight: 10 }}>
                  RM &nbsp;
                  {productType.standard_checked
                    ? product.standard.supplyPrice.toFixed(2)
                    : product.bundle.totalSupplyPrice.toFixed(2)}
                </Grid>
                <Grid item xs={12} sm={8}>
                  <span style={{ position: 'relative', top: 7 }}>Markup</span>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  container
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <TextField
                    id="name"
                    size="small"
                    variant="outlined"
                    className={classes.inputFields}
                    style={{ width: '80%' }}
                    onChange={handleMarkup}
                    inputRef={markupRef}
                    defaultValue={markup.toFixed(2)}
                    inputProps={{ style: { textAlign: 'right' } }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <span style={{ position: 'relative', top: 7 }}>
                    Retail Price &nbsp;
                    <span style={{ fontSize: '0.75rem' }}>(Excluding Tax)</span>
                  </span>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  container
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <TextField
                    id="name"
                    size="small"
                    variant="outlined"
                    className={classes.inputFields}
                    style={{ width: '80%' }}
                    onChange={handleRetailPrice}
                    inputRef={retailPriceRef}
                    defaultValue={retailPrice.toFixed(2)}
                    inputProps={{ style: { textAlign: 'right' } }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">RM &nbsp;&nbsp;</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;

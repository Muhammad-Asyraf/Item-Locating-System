import React, { useRef, useState } from 'react';

import Barcoder from 'barcoder';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../assets/css/overrideQuill.css';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import CircularProgress from '@mui/material/CircularProgress';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

import { makeStyles } from '@mui/styles';

import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

import '../../assets/css/swiper_override.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import { ReactComponent as ReactLogo } from '../../assets/svg/upload-pana.svg';
import CategorySelect from '../Category/CategorySelect';
import ImageModal from '../Images/ImageModal';

SwiperCore.use([Pagination, Navigation]);

const getEditorModules = () => ({
  toolbar: [
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],

    ['link', 'clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
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
  'link',
];

function getDefaultValues() {
  return {
    value: '',
    error: false,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    padding: 30,
    marginTop: 20,
    marginBottom: theme.spacing(2),
    boxShadow:
      'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px !important',
    borderRadius: '16px !important',
    // flexGrow: '1 !important',
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
    width: '100%',
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
  customHoverFocus: {
    '&:hover, &.Mui-focusVisible': { backgroundColor: ' rgba(0, 0, 0, 0.05) !important' },
  },
}));

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-restricted-syntax */
const ItemCreate = (props) => {
  const classes = useStyles();
  const defaultVal = getDefaultValues();
  const quillModules = getEditorModules();
  const quillFormats = getEditorFormat();
  const storeUUID = localStorage.getItem('storeUUID');

  const { onSubmit, isLoading, categoryOptions } = props;

  const nameRef = useRef();
  const barcodeNumberRef = useRef();
  const wholesalePriceRef = useRef();

  const [itemName, setItemName] = useState(defaultVal);
  const [barcodeNumber, setBarcodeNumber] = useState(defaultVal);
  const [wholesalePrice, setWholesalePrice] = useState(defaultVal);
  const [quillText, setQuillText] = useState({ editorHtml: '' });
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState({
    imgFiles: [],
    imgPreviews: [],
    error: false,
  });

  const handleOpenModal = (e) => {
    if (e.target.tagName === 'IMG') {
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => setOpenModal(false);

  const validateBarcode = (barcode) => {
    // GTIN: Global Trade Item Number
    const validBarcode = Barcoder.validate(barcode);

    if (!barcode) {
      setBarcodeNumber({
        ...barcodeNumber,
        error: "Please enter the item's barcode number",
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

  const validatePrice = (price) => {
    const reg = /^\d+(,\d{3})*(\.\d{1,2})?$/;
    const isValidPrice = reg.test(price);

    if (!price) {
      setWholesalePrice({
        ...wholesalePrice,
        error: "Please enter the item's price",
      });
    } else if (!isValidPrice) {
      setWholesalePrice({
        value: price,
        error: 'Value specified is invalid',
      });
    } else {
      setWholesalePrice({
        value: price,
        error: false,
      });
    }
  };

  const validateName = (name) => {
    if (!name) {
      setItemName({
        ...itemName,
        error: "Please enter the item's name",
      });
    } else {
      setItemName({
        value: name,
        error: false,
      });
    }
  };

  const validateImages = (files) => {
    let valid = true;
    let errorMsg = false;

    for (const file of files) {
      const reg = /^(image\/)(png|jpg|jpeg)/;

      const isImgExtValid = reg.test(file.type);
      const totalUploadsValid = image.imgFiles.length + files.length <= 4;
      const fileSizeValid = file.size / 1024 / 1024 < 1.5;

      if (!isImgExtValid) {
        errorMsg = 'Only jpg, jpeg or png are allowed';
        valid = false;
        break;
      } else if (!totalUploadsValid) {
        errorMsg = 'Max uploads is 4';
        valid = false;
        break;
      } else if (!fileSizeValid) {
        errorMsg = 'File size exceeds 1.5 MB';
        valid = false;
        break;
      }
    }

    if (!valid) {
      setImage({
        ...image,
        error: errorMsg,
      });
    }
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateBarcode(barcodeNumberRef.current.value);
    validateName(nameRef.current.value);
    validatePrice(wholesalePriceRef.current.value);

    const formData = new FormData();

    formData.append('barcode_number', barcodeNumber.value);
    formData.append('name', itemName.value);
    formData.append('wholesale_price', wholesalePrice.value);
    formData.append('note', quillText.editorHtml);
    formData.append('sub_category', JSON.stringify(selectedCategory));
    formData.append('store_uuid', storeUUID);

    for (const key of Object.keys(image.imgFiles)) {
      formData.append('imgCollection', image.imgFiles[key]);
    }

    onSubmit(formData);
  };

  const handleChange = (value) => {
    setQuillText({ editorHtml: value });
  };

  const handleInputChange = ({ target }) => {
    const { id, value } = target;

    if (id === 'barcode_number') {
      validateBarcode(value);
    } else if (id === 'name') {
      validateName(value);
    } else if (id === 'wholesale_price') {
      validatePrice(value);
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
    const valid = validateImages(files);

    if (valid) {
      handleImagePreview(files);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();

    const files = Object.values(e.dataTransfer.files);
    const valid = validateImages(files);

    if (valid) {
      handleImagePreview(files);
    }
  };

  const removeImagesPreview = (e, selectedUrl, selectedImgName) => {
    let currentImagesPreview = image.imgPreviews;
    let currentImagesFiles = image.imgFiles;

    currentImagesPreview = currentImagesPreview.filter(
      ({ path }) => path !== selectedUrl
    );
    currentImagesFiles = currentImagesFiles.filter(
      ({ name }) => name !== selectedImgName
    );
    setImage({
      imgFiles: [...currentImagesFiles],
      imgPreviews: [...currentImagesPreview],
    });
  };

  // const onClickUrl = (e, path) => {
  //   if (e.target.tagName === 'IMG') {
  //     const newWindow = window.open(path, '_blank', 'noopener,noreferrer');
  //     if (newWindow) newWindow.opener = null;
  //   }
  // };

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit}
      autoComplete="off"
      style={{ flexGrow: 1 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper className={classes.paper} elevation={2}>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="barcode_number"
                  label="Barcode Number"
                  variant="outlined"
                  autoComplete="on"
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
              <Grid item xs={8}>
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  onChange={handleInputChange}
                  onBlur={handleInputChange}
                  error={itemName.error !== false}
                  helperText={itemName.error}
                  className={classes.inputFields}
                  inputRef={nameRef}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="wholesale_price"
                  label="Wholesale Price"
                  variant="outlined"
                  onChange={handleInputChange}
                  onBlur={handleInputChange}
                  error={wholesalePrice.error !== false}
                  helperText={wholesalePrice.error}
                  inputRef={wholesalePriceRef}
                  className={classes.inputFields}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <p className={classes.inputTiltle}>Note</p>
                <ReactQuill
                  value={quillText.editorHtml}
                  onChange={handleChange}
                  modules={quillModules}
                  formats={quillFormats}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper className={classes.paper} elevation={2} style={{ minHeight: '75vh' }}>
            <CategorySelect
              categoryOptions={categoryOptions}
              setSelectedCategory={setSelectedCategory}
            />
            <p className={classes.inputTiltle}>Add Images</p>
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
                <Box style={{ width: '250px', height: '400px' }}>
                  <ReactLogo />
                  <div style={{ fontSize: '0.8rem' }}>Drop images here or click</div>
                  <div style={{ fontSize: '0.8rem' }}>
                    <span style={{ color: '#3584A7', textDecoration: 'underline' }}>
                      browse
                    </span>
                    &nbsp; thorough your machine
                  </div>
                </Box>
              </label>

              <FormHelperText error={image.error}>
                {image.error
                  ? image.error
                  : 'Only jpg, jpeg or png are allowed. Max 4 uploads (each must < 1.5 MB)'}
              </FormHelperText>
            </Box>
            <p className={classes.inputTiltle}>Images Preview</p>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={2}>
              {image.imgPreviews.map(({ path, name }) => (
                <Grid item sm={2} md={3} key={path}>
                  <Card
                    elevation={6}
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
          </Paper>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={
              isLoading === true ||
              barcodeNumber.error !== false ||
              itemName.error !== false ||
              wholesalePrice.error !== false
            }
            className={classes.submitButton}
          >
            {isLoading ? <CircularProgress size={20}> </CircularProgress> : <>Add Item</>}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ItemCreate;

import React, { useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../assets/css/overrideQuill.css';

import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import '../../assets/css/swiper_override.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import DateRangePicker from '@mui/lab/DateRangePicker';
import DesktopTimePicker from '@mui/lab/DesktopTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import TodayIcon from '@mui/icons-material/Today';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';

import { makeStyles } from '@mui/styles';

import { ReactComponent as ReactLogo } from '../../assets/svg/online-ads-amico.svg';
import ImageModal from '../Images/ImageModal';

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
  paper: {
    width: '90%',
    padding: 30,
    marginTop: 20,
    marginBottom: theme.spacing(2),
    boxShadow:
      'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px !important',
    borderRadius: '16px !important',
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
}));

const CampaignForm = () => {
  const classes = useStyles();
  const quillModules = getEditorModules();
  const quillFormats = getEditorFormat();
  const currentDateTime = new Date().toLocaleString();

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDateTime, setStartDateTime] = useState(currentDateTime);
  const [endDateTime, setEndDateTime] = useState(null);
  const [description, setDescription] = useState({ editorHtml: '' });
  const [termsNconditions, setTermsNconditions] = useState({ editorHtml: '' });
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState({
    imgFiles: [],
    imgPreviews: [],
  });

  const [errors, setErrors] = useState({
    description: false,
    termsNcondition: false,
    category: false,
    stock: false,
    image: false,
    mUnit: false,
    productType: false,
    standardProductItem: false,
    bundleProductItem: false,
  });

  const handleCloseModal = () => setOpenModal(false);

  const handleOpenModal = (e) => {
    if (e.target.tagName === 'IMG') {
      setOpenModal(true);
    }
  };

  const validateDescription = (value, currentError) => {
    const validQuillText = value;

    if (!validQuillText) {
      currentError = {
        ...currentError,
        description: 'Please enter campaign descriptions for your customers reference',
      };
    } else {
      currentError = {
        ...currentError,
        description: false,
      };
    }

    return currentError;
  };

  const validateImages = ({ errors: currentError, files = [], validPicQty = true }) => {
    let errorMsg = false;

    files.every((file) => {
      const reg = /^(image\/)(png|jpg|jpeg)/;

      const validImgExt = reg.test(file.type);
      const validTotalUploads = image.imgFiles.length + files.length <= 12;
      const validFileSize = file.size / 1024 / 1024 < 1.5;

      if (!validImgExt) {
        errorMsg = 'Only jpg, jpeg or png are allowed';
        return false;
      }

      if (!validTotalUploads) {
        errorMsg = 'Max uploads is 12';
        return false;
      }

      if (!validFileSize) {
        errorMsg = 'File size exceeds 1.5 MB';
        return false;
      }

      return true;
    });

    if (!validPicQty) {
      errorMsg = 'Please provide some pictures for your customers reference';
    }

    currentError = {
      ...currentError,
      image: errorMsg,
    };

    return currentError;
  };

  const handleChange = (content, delta, source, editor) => {
    let updatedError = errors;

    if (editor.getText().length === 1) {
      setDescription({ editorHtml: '' });
      updatedError = validateDescription('', errors);
    } else {
      setDescription({ editorHtml: content });

      if (errors.description !== false) {
        updatedError = validateDescription(content, errors);
      }
    }

    setErrors(updatedError);
  };

  const handleTNCChange = (content, delta, source, editor) => {
    let updatedError = errors;

    if (editor.getText().length === 1) {
      setTermsNconditions({ editorHtml: '' });
      updatedError = validateDescription('', errors);
    } else {
      setTermsNconditions({ editorHtml: content });

      if (errors.description !== false) {
        updatedError = validateDescription(content, errors);
      }
    }

    setErrors(updatedError);
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

  return (
    <form
      id="campaign-form"
      className={classes.form}
      // onSubmit={handleSubmit}
      autoComplete="off"
      style={{ flexGrow: 1 }}
    >
      <Grid container spacing={2}>
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
                  Name the campaign, provide campaign details and specify the campaign period
                </span>
              </Grid>
              <Grid item sm={12} md={9} container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    id="title"
                    label="Campaign Title"
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
                <Grid item xs={12}>
                  <p
                    className={classes.inputTitle}
                    style={{ color: errors.description ? '#d32f2f' : 'black' }}
                  >
                    Short description
                  </p>
                  <ReactQuill
                    value={description.editorHtml}
                    onChange={handleChange}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Provide a short description to explain this campaign"
                  />
                  <FormHelperText error={errors.description !== false}>
                    {errors.description ? errors.description : null}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <p
                    className={classes.inputTitle}
                    style={{ color: errors.termsNcondition ? '#d32f2f' : 'black' }}
                  >
                    Terms & conditions
                  </p>
                  <ReactQuill
                    value={termsNconditions.editorHtml}
                    onChange={handleTNCChange}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Please list the terms & conditions apply"
                  />
                  <FormHelperText error={errors.termsNcondition !== false}>
                    {errors.termsNcondition ? errors.termsNcondition : null}
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
                <h3 style={{ marginBottom: 5, marginTop: 0 }}>Advertisement</h3>
                <span style={{ fontSize: '0.9rem' }}>
                  Upload the advertisement banner for this campaign
                </span>
              </Grid>
              <Grid item sm={12} md={9} container spacing={3}>
                <Grid item sm={12}>
                  <p
                    className={classes.inputTitle}
                    style={{ color: errors.termsNcondition ? '#d32f2f' : 'black' }}
                  >
                    Campaign Advertisement
                  </p>
                  <Box style={{ marginBottom: 30 }}>
                    <label
                      htmlFor="imgs"
                      className={classes.inputImageBox}
                      onDrop={onDrop}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <input
                        id="imgs"
                        name="imgCollection"
                        type="file"
                        // multiple
                        accept="image/*"
                        onChange={handleCapture}
                        autoComplete="off"
                        style={{ display: 'none' }}
                      />
                      <Box style={{ width: '315px', height: '450px' }}>
                        <ReactLogo />
                        <div style={{ fontSize: '0.8rem', position: 'relative', bottom: 7 }}>
                          Drop advertisement here or click &nbsp;
                          <span style={{ color: '#004C99', textDecoration: 'underline' }}>
                            browse
                          </span>
                          &nbsp; to upload
                        </div>
                      </Box>
                    </label>

                    <FormHelperText error={errors.image !== false}>
                      {errors.image
                        ? errors.image
                        : 'Only jpg, jpeg or png are allowed. Minimum height is 720px with 16:9 ratio  '}
                    </FormHelperText>
                  </Box>
                  <p className={classes.inputTiltle}>Preview Advertisement Banner</p>
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
      </Grid>
    </form>
  );
};

export default CampaignForm;

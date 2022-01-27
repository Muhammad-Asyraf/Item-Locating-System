import React, { useState, useRef } from 'react';

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
import PromoModal from '../Images/PromoModal';

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

const CampaignForm = (props) => {
  const classes = useStyles();
  const quillModules = getEditorModules();
  const quillFormats = getEditorFormat();
  const storeUUID = localStorage.getItem('storeUUID');
  const campaignTitleRef = useRef(null);

  const { onSubmit } = props;

  const [campaignTitle, setCampaignTitle] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [description, setDescription] = useState({ editorHtml: '' });
  const [termsNconditions, setTermsNconditions] = useState({ editorHtml: '' });
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState({
    img: null,
    imgFile: null,
    imgPreview: null,
  });

  const [errors, setErrors] = useState({
    campaignTitleError: false,
    descriptionError: false,
    termsNconditionError: false,
    startDateError: false,
    endDateError: false,
    startTimeError: false,
    endTimeError: false,
    imageError: false,
  });

  /// /////////////////////////// validators //////////////////////////////////////////////

  const validateDescription = (value, currentError) => {
    let descriptionError;

    if (!value) {
      descriptionError = 'Please enter the campaign descriptions for your customers reference';
    } else {
      descriptionError = false;
    }

    return {
      ...currentError,
      descriptionError,
    };
  };

  const validateTermsNCondition = (value, currentError) => {
    let termsNconditionError;

    if (!value) {
      termsNconditionError =
        'Please state the terms and condition of this campaign for your customers reference';
    } else {
      termsNconditionError = false;
    }

    return {
      ...currentError,
      termsNconditionError,
    };
  };

  const validateImage = ({ file, img, errors: currentError }) => {
    let { imageError } = currentError;
    const reg = /^(image\/)(png|jpg|jpeg)/;

    if (!file || !img) {
      imageError = 'Please upload the advertisement banner for this campaign';

      return {
        ...currentError,
        imageError,
      };
    }

    const validImgExt = reg.test(file.type);
    const validFileSize = file.size / 1024 / 1024 < 1.5;
    const validHeight = img.width > 720;

    if (!validImgExt) {
      imageError = 'Only jpg, jpeg or png are allowed';
    } else if (!validFileSize) {
      imageError = 'File size exceeds 1.5 MB';
    } else if (!validHeight) {
      imageError = 'Minimum height is 720px';
    } else {
      imageError = false;
    }

    return {
      ...currentError,
      imageError,
    };
  };

  const validateCampaignTitle = (value, currentError) => {
    let campaignTitleError;

    if (!value) {
      campaignTitleError = "Please enter the campaign's title";
    } else {
      campaignTitleError = false;
    }

    return {
      ...currentError,
      campaignTitleError,
    };
  };

  /// /////////////////////////// submission handlers //////////////////////////////////////////////

  const preparedPayload = () => {
    const formData = new FormData();

    // console.log('campaignTitle', campaignTitle);
    // console.log('description.editorHtml', description.editorHtml);
    // console.log('termsNconditions.editorHtml', termsNconditions.editorHtml);
    // console.log('dateRange[0]', dateRange[0]);
    // console.log('dateRange[1]', dateRange[1]);
    // console.log('startDateTime', startDateTime.getTime());
    // console.log('endDateTime', endDateTime.getTime());
    // console.log('image', image);

    formData.append('name', campaignTitle);
    formData.append('description', description.editorHtml);
    formData.append('terms_conditions', termsNconditions.editorHtml);
    formData.append('start_date', dateRange[0]);
    formData.append('end_date', dateRange[1]);
    formData.append('start_time', startDateTime);
    formData.append('end_time', endDateTime);
    formData.append('multer_type', 'ads');
    formData.append('adsBanner', image.imgFile, image.imgFile.name);
    formData.append('store_uuid', storeUUID);

    return formData;
  };

  /* eslint-disable no-restricted-syntax */
  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedError = errors;

    updatedError = validateCampaignTitle(campaignTitleRef.current.value, updatedError);
    updatedError = validateDescription(description.editorHtml, updatedError);
    updatedError = validateTermsNCondition(termsNconditions.editorHtml, updatedError);
    updatedError = validateImage({
      file: image.imgFile,
      img: image.img,
      errors: updatedError,
    });

    const passedTheTest =
      !updatedError.campaignTitleError &&
      !updatedError.descriptionError &&
      !updatedError.termsNconditionError &&
      !updatedError.startDateError &&
      !updatedError.endDateError &&
      !updatedError.startTimeError &&
      !updatedError.endTimeError &&
      !updatedError.imageError;

    if (passedTheTest) {
      const payload = preparedPayload();

      for (const pair of payload.entries()) {
        console.log('check', pair[0], pair[1]);
      }
      onSubmit(payload);
    } else {
      setErrors(updatedError);
    }
  };

  /// /////////////////////////// handlers //////////////////////////////////////////////

  const handleCloseModal = () => setOpenModal(false);

  const handleOpenModal = (e) => {
    if (e.target.tagName === 'IMG') {
      setOpenModal(true);
    }
  };

  const handleChange = (content, delta, source, editor) => {
    let updatedError = errors;

    if (editor.getText().length === 1) {
      setDescription({ editorHtml: '' });
      updatedError = validateDescription('', errors);
    } else {
      setDescription({ editorHtml: content });

      if (errors.descriptionError !== false) {
        updatedError = validateDescription(content, errors);
      }
    }

    setErrors(updatedError);
  };

  const handleTNCChange = (content, delta, source, editor) => {
    let updatedError = errors;

    if (editor.getText().length === 1) {
      setTermsNconditions({ editorHtml: '' });
      updatedError = validateTermsNCondition('', errors);
    } else {
      setTermsNconditions({ editorHtml: content });

      if (errors.termsNconditionError !== false) {
        updatedError = validateTermsNCondition(content, errors);
      }
    }

    setErrors(updatedError);
  };

  const handleImgPreviewNValidation = (file) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const updatedError = validateImage({ file, img, errors });
      setErrors(updatedError);

      if (!updatedError.imageError) {
        const updatedImagesPreview = { name: file.name, path: img.src };
        setImage({
          img,
          imgFile: file,
          imgPreview: updatedImagesPreview,
        });
      }
    };
  };

  const handleCapture = async ({ target: { files } }) => {
    const [file] = files;
    handleImgPreviewNValidation(file);
  };

  const handleOnDrop = (e) => {
    e.preventDefault();

    const {
      dataTransfer: { files },
    } = e;

    const [file] = files;

    handleImgPreviewNValidation(file);
  };

  const handleDateError = (error) => {
    let { startDateError, endDateError } = errors;
    const [startErr, endErr] = error;

    if (startErr) {
      startDateError = 'Invalid start date';
    } else if (!startErr) {
      startDateError = false;
    }

    if (endErr) {
      endDateError = 'Invalid end date';
    } else if (!endErr) {
      endDateError = false;
    }

    setErrors({
      ...errors,
      startDateError,
      endDateError,
    });
  };

  const handleStartTimeError = (error) => {
    let { startTimeError } = errors;

    if (error) {
      startTimeError = 'Invalid start time';
    } else {
      startTimeError = false;
    }

    setErrors({
      ...errors,
      startTimeError,
    });
  };

  const handleEndTimeError = (error) => {
    let { endTimeError } = errors;

    if (error) {
      endTimeError = 'Invalid end time';
    } else {
      endTimeError = false;
    }

    setErrors({
      ...errors,
      endTimeError,
    });
  };

  const handleInputChange = ({ target }) => {
    const { value } = target;

    const updatedError = validateCampaignTitle(value, errors);

    setCampaignTitle(value);
    setErrors(updatedError);
  };

  /// /////////////////////////// others //////////////////////////////////////////////

  const removeImagePreview = () => {
    setImage({
      imgFile: null,
      imgPreview: null,
    });

    const updatedError = validateImage({
      errors,
    });

    setErrors(updatedError);
  };

  return (
    <form
      id="campaign-form"
      className={classes.form}
      onSubmit={handleSubmit}
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
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                    error={errors.campaignTitleError !== false}
                    helperText={errors.campaignTitleError}
                    className={classes.inputFields}
                    inputRef={campaignTitleRef}
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
                    style={{ color: errors.descriptionError ? '#d32f2f' : 'black' }}
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
                  <FormHelperText error={errors.descriptionError !== false}>
                    {errors.descriptionError ? errors.descriptionError : null}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <p
                    className={classes.inputTitle}
                    style={{ color: errors.termsNconditionError ? '#d32f2f' : 'black' }}
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
                  <FormHelperText error={errors.termsNconditionError !== false}>
                    {errors.termsNconditionError ? errors.termsNconditionError : null}
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
                      onError={handleDateError}
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
                            required
                            error={errors.startDateError !== false}
                            helperText={errors.startDateError}
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
                            required
                            error={errors.endDateError !== false}
                            helperText={errors.endDateError}
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
                        onError={handleStartTimeError}
                        onChange={(newValue) => {
                          setStartDateTime(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            style={{ width: '93.5%' }}
                            required
                            error={errors.startTimeError !== false}
                            helperText={errors.startTimeError}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6} sx={{ pl: 3 }}>
                      <DesktopTimePicker
                        label="End Time"
                        value={endDateTime}
                        onError={handleEndTimeError}
                        onChange={(newValue) => {
                          setEndDateTime(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            style={{ width: '100%' }}
                            required
                            error={errors.endTimeError !== false}
                            helperText={errors.endTimeError}
                          />
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
                    style={{ color: errors.imageError ? '#d32f2f' : 'black' }}
                  >
                    Advertisement Banner
                  </p>
                  <Box style={{ marginBottom: 30 }}>
                    <label
                      htmlFor="imgs"
                      className={classes.inputImageBox}
                      onDrop={handleOnDrop}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <input
                        id="imgs"
                        name="imgCollection"
                        type="file"
                        accept="image/*"
                        onChange={handleCapture}
                        autoComplete="off"
                        style={{ display: 'none' }}
                      />
                      <ReactLogo style={{ width: '100%' }} />
                      <div style={{ fontSize: '0.8rem' }}>
                        Drop advertisement here or click &nbsp;
                        <span style={{ color: '#004C99', textDecoration: 'underline' }}>
                          browse
                        </span>
                        &nbsp; to upload
                      </div>
                    </label>

                    <FormHelperText error={errors.imageError !== false}>
                      {errors.imageError ? (
                        errors.imageError
                      ) : (
                        <>
                          <span>
                            Recommended size: 1920 x 1080 pixels. Minimum: 1280 x 720 pixels.
                            Uploaded image will be automatically resize to a 16:9 <br /> aspect
                            ratio.
                          </span>
                        </>
                      )}
                    </FormHelperText>
                  </Box>
                  <p className={classes.inputTiltle}>Preview Ads Banner</p>
                  <Divider sx={{ mb: 3 }} />
                  {image.imgPreview && (
                    <Grid container spacing={2}>
                      <Grid item sm={2} md={2} key={image.imgPreview.path}>
                        <Card
                          elevation={3}
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
                              onClick={removeImagePreview}
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
                            src={image.imgPreview.path}
                            alt="..."
                            style={{
                              width: '120px',
                              height: '110px',
                              objectFit: 'fill',
                            }}
                          />
                        </Card>
                      </Grid>
                      <PromoModal
                        image={image.imgPreview}
                        Swiper={Swiper}
                        SwiperSlide={SwiperSlide}
                        openModal={openModal}
                        handleCloseModal={handleCloseModal}
                      />
                    </Grid>
                  )}
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

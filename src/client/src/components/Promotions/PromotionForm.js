// import React, { useRef, useState, useEffect } from 'react';
import React, { useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../assets/css/overrideQuill.css';

// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';

// import Box from '@mui/material/Box';
// import Chip from '@mui/material/Chip';
// import Card from '@mui/material/Card';
// import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
// import DateRangePicker from '@mui/lab/DateRangePicker';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
// import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

// import SpeedIcon from '@mui/icons-material/Speed';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import { makeStyles } from '@mui/styles';

import SwiperCore, { Pagination, Navigation } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

import '../../assets/css/swiper_override.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

// import ImageModal from '../Images/ImageModal';

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

// function getDefaultValues() {
//   return {
//     value: '',
//     error: false,
//   };
// }

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
}));

const PromotionForm = (props) => {
  const classes = useStyles();
  // const defaultVal = getDefaultValues();
  const quillModules = getEditorModules();
  const quillFormats = getEditorFormat();

  const { products, categoryOptions } = props;

  // const [value, setValue] = useState([null, null]);
  const [quillText, setQuillText] = useState({ editorHtml: '' });
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

  console.log('products', products);
  console.log('categoryOptions', categoryOptions);

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
              <Grid item sm={12} md={4}>
                <h3 style={{ marginBottom: 5, marginTop: 0 }}>General</h3>
                <span style={{ fontSize: '0.9rem' }}>
                  Name the promotion and specify the dates for when it will apply
                </span>
              </Grid>
              <Grid item sm={12} md={8} container spacing={3}>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                  <p
                    className={classes.inputTiltle}
                    style={{ color: errors.quillText ? '#d32f2f' : 'black' }}
                  >
                    Short Description
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
                  Test
                  {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                      startText="Check-in"
                      endText="Check-out"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(startProps, endProps) => (
                        <React.Fragment>
                          <TextField {...startProps} />
                          <Box sx={{ mx: 2 }}> to </Box>
                          <TextField {...endProps} />
                        </React.Fragment>
                      )}
                    />
                  </LocalizationProvider> */}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
};

export default PromotionForm;

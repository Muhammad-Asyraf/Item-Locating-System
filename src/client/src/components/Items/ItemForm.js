import React, { useRef, useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../assets/overrideQuill.css';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import CircularProgress from '@mui/material/CircularProgress';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { makeStyles } from '@mui/styles';

import { ReactComponent as ReactLogo } from '../../assets/upload-pana.svg';
import CategorySelect from './CategorySelect';

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
const ItemCreate = (props) => {
  const classes = useStyles();
  const quillModules = getEditorModules();
  const quillFormats = getEditorFormat();
  const nameRef = useRef();
  const barcodeNumberRef = useRef();
  const quantityRef = useRef();
  const descriptionRef = useRef();
  const wholesalePriceRef = useRef();

  const [quillText, setQuillText] = useState({ editorHtml: '' });
  const [images, setImages] = useState([]);

  const { onSubmit, isLoading } = props;

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
      barcode_number: barcodeNumberRef.current.value,
      quantity: quantityRef.current.value,
      descriptions: descriptionRef.current.value,
      wholesale_price: wholesalePriceRef.current.value,
    };

    onSubmit(payload);
  };

  const handleChange = (value) => {
    setQuillText({ editorHtml: value });
  };

  // const readSaveImg = (files) => {
  //   files.forEach((pics) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       updatedImages.push(reader.result);
  //     };
  //     reader.readAsDataURL(pics);
  //   });

  //   updatedImages = [...new Set(updatedImages)];
  //   console.log('final', updatedImages);

  //   setImages(updatedImages);
  // };

  const readSaveImg = (files) => {
    const updatedImages = images;

    files.forEach((pics) => {
      updatedImages.push(URL.createObjectURL(pics));
    });

    setImages([...updatedImages]);
  };

  const handleCapture = async ({ target }) => {
    const files = Object.values(target.files);
    readSaveImg(files);
  };

  const onDrop = (e) => {
    e.preventDefault();

    const files = Object.values(e.dataTransfer.files);
    readSaveImg(files);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const removeImages = (e, url) => {
    let currentImages = images;
    currentImages = currentImages.filter((imgUrl) => imgUrl !== url);
    setImages([...currentImages]);
  };

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit}
      autoComplete="on"
      style={{ flexGrow: 1 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper className={classes.paper} elevation={2}>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  // error={fullName.error !== false}
                  // helperText={fullName.error}
                  className={classes.inputFields}
                  inputRef={nameRef}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="wholesale_price"
                  label="Wholesale Price"
                  variant="outlined"
                  // onBlur={() => validateEmail(true)}
                  // onChange={validateEmail}
                  // error={email.error !== false}
                  // helperText={email.error}
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
                <p className={classes.inputTiltle}>Description</p>
                <ReactQuill
                  value={quillText.editorHtml}
                  onChange={handleChange}
                  modules={quillModules}
                  formats={quillFormats}
                  // placeholder="Enter item descriptions"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper className={classes.paper} elevation={2} style={{ minHeight: '75vh' }}>
            <CategorySelect />
            <p className={classes.inputTiltle}>Add Images</p>
            <Box style={{ marginBottom: 30 }}>
              <input
                id="imgs"
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
                onDragOver={onDragOver}
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
            </Box>
            <p className={classes.inputTiltle}>Images Preview</p>
            <Divider sx={{ mb: 3 }} />
            <Grid container xs={12} spacing={2}>
              {images.map((url) => (
                <Grid item sm={2} md={3} key={url}>
                  <Card
                    elevation={6}
                    style={{
                      Width: '100px',
                      height: '110px',
                      borderRadius: 10,
                    }}
                  >
                    <Box style={{ position: 'absolute' }}>
                      <IconButton className={classes.customHoverFocus}>
                        <RemoveCircleIcon
                          fontSize="small"
                          onClick={(e) => removeImages(e, url)}
                          style={{
                            color: 'white',
                            backgroundColor: 'black',
                            borderRadius: 50,
                          }}
                        />
                      </IconButton>
                    </Box>
                    <img
                      src={url}
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
            </Grid>
          </Paper>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading === true}
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

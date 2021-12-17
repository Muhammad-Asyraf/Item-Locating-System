import React, { useState } from 'react';
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { useHistory, Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
// import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
// import LinearProgress from '@mui/material/LinearProgress';
// import CircularProgress from '@mui/material/CircularProgress';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
// import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

import { makeStyles } from '@mui/styles';

import Map from '../../components/StoreLayout/Editor';

const useStyles = makeStyles(() => ({
  linear: {
    position: 'relative',
    top: '10px !important',
    left: '-45px !important',
    width: '100vw',
    height: '7px !important',
  },
  floorLocked: {
    fontSize: '0.875rem',
    background: '#d32f2f',
    padding: '5px 10px 5px 10px',
    color: 'white',
    borderRadius: '5px',
    fontWeight: 'bold',
    position: 'absolute ',
    top: 218,
    left: 350,
    zIndex: '450',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  },
  zoomLevel: {
    fontSize: '0.875rem',
    background: 'black',
    padding: '5px 10px 5px 10px',
    color: 'white',
    borderRadius: '5px',
    fontWeight: 'bold',
    position: 'absolute ',
    top: 218,
    right: 120,
    zIndex: '450',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  },
}));

const LayoutEditor = () => {
  const classes = useStyles();

  // const storeUrl = localStorage.getItem('storeUrl');
  const [floorIsLocked, setFloorIsLocked] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [layers, setAllLayers] = useState([]);
  const storeName = localStorage.getItem('storeName');

  // if (isCategoryLoading) {
  //   return (
  //     <div>
  //       <LinearProgress
  //         className={classes.linear}
  //         sx={{
  //           backgroundImage: 'linear-gradient(-225deg, #473B7B 0%, #003366 51%, #30D2BE 100%)',
  //         }}
  //       />
  //     </div>
  //   );
  // }
  console.log('test lock', floorIsLocked);
  console.log('layers', layers);

  const saveLayout = (leafletLayers) => {
    setAllLayers(leafletLayers);
  };

  return (
    <Grid container spacing={2} style={{ marginTop: '30px' }}>
      <Grid item xs={8} container>
        <Grid item xs={12}>
          <h1 style={{ marginBottom: 1, marginTop: 3, fontSize: '2em' }}>
            <span>Layout Editor</span>
            <IconButton
              // component={Link}
              // to={`/${storeUrl}/product/list`}
              sx={{ position: 'relative', top: -3 }}
            >
              <KeyboardReturnRoundedIcon fontSize="large" color="primary" />
            </IconButton>
            <IconButton sx={{ position: 'relative', top: -3 }}>
              {/* <FileUploadRoundedIcon style={{ color: 'green' }} /> */}
              <MoreVertRoundedIcon fontSize="large" color="primary" />
            </IconButton>
          </h1>
          <Grid item xs={12} container>
            <Grid item xs={12}>
              <Breadcrumbs separator="•" aria-label="breadcrumb">
                <div style={{ fontSize: '0.875rem' }}>{storeName}&nbsp;&nbsp;</div>,
                <div style={{ fontSize: '0.875rem' }}>
                  &nbsp;&nbsp;Layout Editor&nbsp;&nbsp;
                </div>
              </Breadcrumbs>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={4}
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button
          form="layout-form"
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            textTransform: 'none',
            fontSize: '0.95rem',
            borderRadius: 3,
            height: 50,
            width: '30%',
            paddingRight: 3,
            boxShadow: 'rgba(53, 132, 167, 0.44) 0px 8px 16px 0px !important',
          }}
        >
          <SaveRoundedIcon style={{ marginRight: 10 }} fontSize="small" /> Saves
        </Button>
      </Grid>

      <Grid item xs={10}>
        {floorIsLocked ? <div className={classes.floorLocked}>Floor Locked</div> : null}
        <div className={classes.zoomLevel}>Zoom Level: {zoomLevel}</div>
        <Map
          setFloorIsLocked={setFloorIsLocked}
          setZoomLevel={setZoomLevel}
          saveLayout={saveLayout}
        />
      </Grid>
    </Grid>
  );
};

export default LayoutEditor;

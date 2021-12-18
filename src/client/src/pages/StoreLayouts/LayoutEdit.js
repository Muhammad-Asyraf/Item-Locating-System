import React, { useState, useEffect } from 'react';
// import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { useHistory, Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
// import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
// import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

import { makeStyles } from '@mui/styles';

import {
  selectLayout,
  selectIsLoading,
  processingRequest,
  processed,
} from '../../redux/features/layoutSlice';

import { addLayout, getLayout } from '../../redux/thunks/layoutThunk';
import { setNewNotification } from '../../redux/features/notificationSlice';

import LayoutEditor from '../../components/StoreLayout/LayoutEditor';

import { getFileObject } from '../../utils/general';

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

const LayoutEdit = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const history = useHistory();

  const [floorIsLocked, setFloorIsLocked] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [floorPlan, setFloorPlan] = useState();
  const [leafletLayers, setLeafletLayers] = useState([]);
  // const [layers, setAllLayers] = useState([]);

  const theLayout = useSelector(selectLayout);
  const isLayoutLoading = useSelector(selectIsLoading);

  const storeUrl = localStorage.getItem('storeUrl');
  const storeName = localStorage.getItem('storeName');

  useEffect(async () => {
    dispatch(processingRequest());
    // await dispatch(getLayout({ uuid: match.params.uuid }));
    await dispatch(getLayout({ uuid: '2bb25f34-cd11-409c-acaf-3781299f7305' }));
  }, []);

  useEffect(async () => {
    if (theLayout) {
      const path = theLayout.floor_plan_path;
      const file = await getFileObject(path);
      setFloorPlan({ file, path });
      setLeafletLayers(theLayout.layers);
      dispatch(processed());
    }
  }, [theLayout]);

  // console.log('The layout', theLayout);

  // console.log('test lock', floorIsLocked);
  // console.log('History', history);
  // console.log('layers', layers);

  const saveLayout = async (payload) => {
    dispatch(processingRequest());

    const { type, payload: resPayload } = await dispatch(addLayout({ payload }));

    if (type.includes('fulfilled')) {
      // history.push(`/${storeUrl}/layout/list`);
      await dispatch(
        setNewNotification({
          message: 'Layout successfully created',
          backgroundColor: 'green',
          severity: 'success',
        })
      );
    } else if (type.includes('rejected')) {
      await dispatch(
        setNewNotification({
          message: resPayload.message,
          backgroundColor: '#be0000',
          severity: 'error',
        })
      );
    }
    dispatch(processed());
  };

  const handleCapture = async ({ target }) => {
    // console.log('files', target.files);
    const uploadedFloorPlanPath = URL.createObjectURL(target.files[0]);

    // const path = URL.createObjectURL(img);
    // console.log('path', target.files[0]);
    // console.log('path');
    setFloorPlan({ file: target.files[0], path: uploadedFloorPlanPath });

    // const files = Object.values(target.files);
    // const updatedError = validateImages({ errors, files });

    // setErrors(updatedError);

    // if (!updatedError.image) {
    //   handleImagePreview(files);
    // }
  };

  console.log('isloadinglayout', isLayoutLoading);

  if (isLayoutLoading) {
    return (
      <div>
        <LinearProgress
          className={classes.linear}
          sx={{
            backgroundImage: 'linear-gradient(-225deg, #473B7B 0%, #003366 51%, #30D2BE 100%)',
          }}
        />
      </div>
    );
  }

  return (
    <Grid container spacing={2} style={{ marginTop: '30px' }}>
      <Grid item xs={8} container>
        <Grid item xs={12}>
          <h1 style={{ marginBottom: 1, marginTop: 3, fontSize: '2em' }}>
            <span>Layout Editor</span>
            <IconButton
              component={Link}
              to={`/${storeUrl}/layout/list`}
              sx={{ position: 'relative', top: -3 }}
            >
              <KeyboardReturnRoundedIcon fontSize="large" color="primary" />
            </IconButton>
            <IconButton sx={{ position: 'relative', top: -3 }} component="label">
              {/* <FileUploadRoundedIcon style={{ color: 'green' }} /> */}
              <MoreVertRoundedIcon fontSize="large" color="primary" />
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
          {isLayoutLoading ? (
            <CircularProgress size={25} style={{ color: 'white' }} />
          ) : (
            <>
              <SaveRoundedIcon style={{ marginRight: 10 }} fontSize="small" /> Save
            </>
          )}
        </Button>
      </Grid>

      <Grid item xs={10}>
        {floorIsLocked ? <div className={classes.floorLocked}>Floor Locked</div> : null}
        <div className={classes.zoomLevel}>Zoom Level: {zoomLevel}</div>
        <LayoutEditor
          floorPlan={floorPlan}
          setFloorIsLocked={setFloorIsLocked}
          setZoomLevel={setZoomLevel}
          saveLayout={saveLayout}
          leafletLayers={leafletLayers}
        />
      </Grid>
    </Grid>
  );
};

export default LayoutEdit;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
// import CircularProgress from '@mui/material/CircularProgress';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import LinearProgress from '@mui/material/LinearProgress';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import MyLocationRoundedIcon from '@mui/icons-material/MyLocationRounded';
import Tooltip from '@mui/material/Tooltip';

import { makeStyles } from '@mui/styles';

import {
  selectLayout,
  selectIsLoading,
  processingRequest,
  processed,
} from '../../redux/features/layoutSlice';

import { updateLayout, getLayout } from '../../redux/thunks/layoutThunk';
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

  const { uuid: LayoutUUID } = useParams();

  const [floorIsLocked, setFloorIsLocked] = useState(false);
  const [firstRefresh, setFirstRefresh] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [floorPlan, setFloorPlan] = useState(null);
  const [previousFloorPlan, setPreviuosFloorPlan] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [leafletLayers, setLeafletLayers] = useState([]);

  const theLayout = useSelector(selectLayout);
  const isLayoutLoading = useSelector(selectIsLoading);

  const storeUrl = localStorage.getItem('storeUrl');
  const storeName = localStorage.getItem('storeName');

  useEffect(async () => {
    const { type: layoutStatus, payload: layoutPayload } = await dispatch(
      getLayout({ uuid: LayoutUUID })
    );

    const requestStatusOk = layoutStatus.includes('fulfilled');
    const { layout } = layoutPayload;

    if (requestStatusOk) {
      const path = layout.floor_plan_path;

      if (path) {
        const file = await getFileObject(path);
        setFloorPlan({ file, path });
        setPreviuosFloorPlan({ path });
      }

      setLeafletLayers(layout.layers);
      dispatch(processed());
      setFirstRefresh(false);
    }
  }, []);

  const handleOpenDetailsDialog = () => setOpenDetailsDialog(true);
  const handleCloseDetailsDialog = () => setOpenDetailsDialog(false);

  const patchLayout = async (payload) => {
    const { type, payload: resPayload } = await dispatch(
      updateLayout({ uuid: LayoutUUID, payload })
    );

    if (type.includes('fulfilled')) {
      await dispatch(
        setNewNotification({
          message: 'Layout successfully updated',
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

  const uploadFloorPlan = ({ target }) => {
    const uploadedFloorPlanPath = URL.createObjectURL(target.files[0]);
    setFloorPlan({ file: target.files[0], path: uploadedFloorPlanPath });
  };

  const removeFloorPlan = () => {
    setFloorPlan(null);
  };

  const toProductMapping = () => {
    dispatch(processingRequest());
  };

  if (isLayoutLoading && firstRefresh) {
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
              sx={{ position: 'relative', top: -3, left: 5 }}
            >
              <KeyboardReturnRoundedIcon fontSize="large" color="primary" />
            </IconButton>
            <IconButton
              size="large"
              component={Link}
              onClick={toProductMapping}
              to={`/${storeUrl}/layout/product-mapping/${LayoutUUID}`}
              sx={{ position: 'relative', top: -5, left: 5 }}
            >
              <MyLocationRoundedIcon color="primary" sx={{ fontSize: '1.7rem' }} />
            </IconButton>
          </h1>
          <Grid item xs={12} container>
            <Grid item xs={12}>
              <Breadcrumbs separator="•" aria-label="breadcrumb">
                <div style={{ fontSize: '0.875rem' }}>{storeName}&nbsp;&nbsp;</div>,
                <div style={{ fontSize: '0.875rem' }}>
                  &nbsp;&nbsp;Layout Editor&nbsp;&nbsp;
                </div>
                {theLayout && (
                  <div style={{ fontSize: '0.875rem' }}>
                    &nbsp;&nbsp;{theLayout.name} ({theLayout.label})&nbsp;&nbsp;
                  </div>
                )}
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
        alignItems="flex-end"
      >
        <Box
          style={{
            padding: '3px 12px',
            borderRadius: 10,
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          }}
        >
          {floorPlan ? (
            <Tooltip title="Remove Layout" placement="top">
              <IconButton color="primary" onClick={removeFloorPlan} size="small">
                <RemoveCircleIcon style={{ color: '#d32f2f' }} fontSize="large" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Upload Floor Plan" placement="top">
              <IconButton
                component="label"
                sx={{ position: 'relative', top: 1.5 }}
                color="primary"
                size="small"
              >
                <FileUploadRoundedIcon color="primary" fontSize="large" />
                <input
                  id="imgs"
                  name="imgCollection"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={uploadFloorPlan}
                  autoComplete="off"
                  style={{ display: 'none' }}
                />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Save Layout" placement="top">
            <IconButton
              form="layout-form"
              variant="contained"
              color="primary"
              type="submit"
              size="small"
            >
              <SaveRoundedIcon color="primary" fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Layout Details" placement="top">
            <IconButton color="primary" size="small" onClick={handleOpenDetailsDialog}>
              <InfoRoundedIcon color="primary" fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>

      <Grid item xs={10}>
        {floorIsLocked ? <div className={classes.floorLocked}>Floor Locked</div> : null}
        <div className={classes.zoomLevel}>Zoom Level: {zoomLevel}</div>
        <LayoutEditor
          mode="edit"
          theLayout={theLayout}
          leafletLayers={leafletLayers}
          floorPlan={floorPlan}
          previousFloorPlan={previousFloorPlan}
          setFloorIsLocked={setFloorIsLocked}
          setZoomLevel={setZoomLevel}
          patchLayout={patchLayout}
          open={openDetailsDialog}
          handleClose={handleCloseDetailsDialog}
        />
      </Grid>
    </Grid>
  );
};

export default LayoutEdit;

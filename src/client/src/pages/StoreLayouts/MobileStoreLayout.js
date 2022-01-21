import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';

import { makeStyles } from '@mui/styles';

import {
  selectLayouts,
  selectIsLoading,
  processed as layoutProcessed,
} from '../../redux/features/layoutSlice';

import { getLayouts } from '../../redux/thunks/layoutThunk';

import LayoutProductViewer from '../../components/StoreLayout/LayoutProductViewer/Viewer';

import { getFileObject } from '../../utils/general';

const useStyles = makeStyles(() => ({
  linear: {
    position: 'relative',
    top: '0px !important',
    left: '0px !important',
    width: '100vw',
    height: '7px !important',
  },
  zoomLevel: {
    fontSize: '0.875rem',
    background: 'black',
    padding: '5px 10px 5px 10px',
    color: 'white',
    borderRadius: '5px',
    fontWeight: 'bold',
    position: 'absolute ',
    top: 20,
    right: 10,
    zIndex: '450',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  },
}));

const MobileStoreLayout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const leafletRef = useRef(null);

  const [searchParams] = useSearchParams();
  const [zoomLevel, setZoomLevel] = useState(0);
  const [floorPlan, setFloorPlan] = useState(null);
  const [leafletLayers, setLeafletLayers] = useState([]);
  const [currentLayout, setCurrentLayout] = useState(null);

  const { uuid: StoreUUID } = useParams();
  const authToken = searchParams.get('token');

  const layouts = useSelector(selectLayouts);
  const isLayoutLoading = useSelector(selectIsLoading);

  console.log('layouts', layouts);

  const initLayoutLayers = async (layouts_) => {
    const [selectedLayout] = layouts_;

    const { layers, floor_plan_path: path } = selectedLayout;

    if (path) {
      const file = await getFileObject(path);
      setFloorPlan({ file, path });
    }
    setCurrentLayout(selectedLayout);
    setLeafletLayers(layers);

    dispatch(layoutProcessed());
  };

  useEffect(async () => {
    const { type: layoutStatus, payload: layoutPayload } = await dispatch(
      getLayouts({ uuid: StoreUUID })
    );

    const requestStatusOk = layoutStatus.includes('fulfilled');

    if (requestStatusOk) {
      initLayoutLayers(layoutPayload.layouts);
    }
  }, []);

  console.log('authToken', authToken);
  console.log('StoreUUID', StoreUUID);

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
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <div className={classes.zoomLevel}>Zoom Level: {zoomLevel}</div>
        <LayoutProductViewer
          leafletRef={leafletRef}
          currentLayout={currentLayout}
          leafletLayers={leafletLayers}
          floorPlan={floorPlan}
          setZoomLevel={setZoomLevel}
        />
      </Grid>
    </Grid>
  );
};
export default MobileStoreLayout;

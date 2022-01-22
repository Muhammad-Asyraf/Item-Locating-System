import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LinearProgress from '@mui/material/LinearProgress';

import { makeStyles } from '@mui/styles';

import {
  selectLayouts,
  selectIsLoading,
  processed as layoutProcessed,
} from '../../redux/features/layoutSlice';

import { getLayouts } from '../../redux/thunks/layoutThunk';

import LayoutProductViewer from '../../components/StoreLayout/LayoutProductViewer/Viewer';
import PartitionProductModal from '../../components/StoreLayout/LayoutProductViewer/PartitionProductModal';

import { getFileObject } from '../../utils/general';

const useStyles = makeStyles(() => ({
  linear: {
    position: 'relative',
    top: '0px !important',
    left: '0px !important',
    width: '100vw',
    height: '7px !important',
  },
  layoutDropdown: {
    position: 'absolute ',
    top: 10,
    right: 10,
    zIndex: '450',
    width: '32vw',
    backgroundColor: 'white',
    borderRadius: 5,
  },
}));

const MobileStoreLayout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const leafletRef = useRef(null);

  const [searchParams] = useSearchParams();

  const [floorPlan, setFloorPlan] = useState(null);
  const [leafletLayers, setLeafletLayers] = useState([]);
  const [currentLayout, setCurrentLayout] = useState(null);
  const [openPartitionModal, setOpenPartitionModal] = useState(false);

  const { uuid: StoreUUID } = useParams();
  const authToken = searchParams.get('token');
  const planningCartUUID = searchParams.get('planning-cart');

  const layouts = useSelector(selectLayouts);
  const isLayoutLoading = useSelector(selectIsLoading);

  console.log('layouts', layouts);
  console.log('authToken', authToken);
  console.log('StoreUUID', StoreUUID);
  console.log('planningCartUUID', planningCartUUID);

  const handleOpen = () => setOpenPartitionModal(true);
  const handleClose = () => setOpenPartitionModal(false);

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
      getLayouts({ uuid: StoreUUID, authToken, planningCartUUID })
    );

    const requestStatusOk = layoutStatus.includes('fulfilled');

    if (requestStatusOk) {
      initLayoutLayers(layoutPayload.layouts);
    }
  }, []);

  const handleChangeLayout = async (e, selectedLayout) => {
    const { layers, floor_plan_path: path } = selectedLayout;

    if (path) {
      const file = await getFileObject(path);
      setFloorPlan({ file, path });
    } else {
      setFloorPlan(null);
    }
    setLeafletLayers(layers);
    setCurrentLayout(selectedLayout);
  };

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
        <Box className={classes.layoutDropdown}>
          <Autocomplete
            disablePortal
            disableClearable
            options={layouts}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} size="small" />}
            onChange={handleChangeLayout}
            value={currentLayout}
          />
        </Box>
        <LayoutProductViewer
          leafletRef={leafletRef}
          currentLayout={currentLayout}
          leafletLayers={leafletLayers}
          floorPlan={floorPlan}
          handleOpen={handleOpen}
        />
        <PartitionProductModal
          openPartitionModal={openPartitionModal}
          handleClose={handleClose}
        />
      </Grid>
    </Grid>
  );
};
export default MobileStoreLayout;
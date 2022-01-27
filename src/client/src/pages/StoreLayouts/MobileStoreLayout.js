import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import { makeStyles } from '@mui/styles';

import {
  selectLayouts,
  selectIsLoading,
  processed as layoutProcessed,
} from '../../redux/features/layoutSlice';
import {
  // selectProducts,
  // selectIsLoading,
  processed as productProcessed,
} from '../../redux/features/productSlice';

import { getLayouts } from '../../redux/thunks/layoutThunk';
import { getProductsByPlanningCart } from '../../redux/thunks/productThunk';

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
    top: 15,
    right: 10,
    zIndex: '450',
    width: '32vw',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  paper: {
    right: '10px !important',
    boxShadow:
      '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12) !important',
  },
}));

const MobileStoreLayout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const leafletRef = useRef(null);

  const [searchParams] = useSearchParams();

  const [floorPlan, setFloorPlan] = useState(null);
  const [products, setProducts] = useState([]);
  const [leafletLayers, setLeafletLayers] = useState([]);
  const [currentLayout, setCurrentLayout] = useState(null);
  const [openPartitionModal, setOpenPartitionModal] = useState(false);

  const { uuid: storeUUID } = useParams();
  const authToken = searchParams.get('token');
  const planningCartUUID = searchParams.get('cart');

  const layouts = useSelector(selectLayouts);
  const isLayoutLoading = useSelector(selectIsLoading);

  // console.log('layouts', layouts);
  // console.log('authToken', authToken);
  // console.log('storeUUID', storeUUID);
  // console.log('products', products);

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
    dispatch(productProcessed());
  };

  const groupBy = (arr) => {
    const result = arr.reduce((acc, currentValue) => {
      if (!acc[currentValue.layer.layout.name]) {
        acc[currentValue.layer.layout.name] = [];
      }
      acc[currentValue.layer.layout.name].push(currentValue);
      return acc;
    }, {});

    const final = Object.entries(result).map((e) => ({
      label: e[0],
      data: e[1],
    }));
    return final;
  };

  useEffect(async () => {
    const { type: layoutStatus, payload: layoutPayload } = await dispatch(
      getLayouts({ storeUUID, authToken })
    );
    const { type: productStatus, payload: productPayload } = await dispatch(
      getProductsByPlanningCart({ storeUUID, planningCartUUID, authToken })
    );

    const requestStatusOk =
      layoutStatus.includes('fulfilled') && productStatus.includes('fulfilled');

    if (requestStatusOk) {
      initLayoutLayers(layoutPayload.layouts);
      setProducts(productPayload.products);

      const productsByFloor = groupBy(productPayload.products);

      try {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: 'init', products: productsByFloor })
        );
      } catch (ignore) {
        // browser does not support doing this, so catch error and continue
      }
    }
  }, []);

  const handleChangeLayout = async ({ target: { value: selectedLayout } }) => {
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
          <FormControl fullWidth>
            <InputLabel id="select-layout-label">Layout</InputLabel>
            <Select
              labelId="select-layout-label"
              id="select-layout"
              value={currentLayout}
              label="Layout"
              onChange={handleChangeLayout}
              style={{ height: '45px' }}
              MenuProps={{
                PopoverClasses: {
                  paper: classes.paper,
                },
              }}
            >
              {layouts.map((layout) => (
                <MenuItem key={layout.uuid} value={layout}>
                  {layout.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <Autocomplete
            disablePortal
            disableClearable
            options={layouts}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} size="small" />}
            onChange={handleChangeLayout}
            value={currentLayout}
          /> */}
        </Box>
        <LayoutProductViewer
          leafletRef={leafletRef}
          layouts={layouts}
          currentLayout={currentLayout}
          handleChangeLayout={handleChangeLayout}
          leafletLayers={leafletLayers}
          floorPlan={floorPlan}
          handleOpen={handleOpen}
          products={products}
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

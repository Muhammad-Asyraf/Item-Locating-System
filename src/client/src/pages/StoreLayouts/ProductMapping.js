import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
// import CircularProgress from '@mui/material/CircularProgress';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import LinearProgress from '@mui/material/LinearProgress';

import { makeStyles } from '@mui/styles';

import {
  selectLayouts,
  selectIsLoading,
  processed as layoutProcessed,
  processingRequest,
} from '../../redux/features/layoutSlice';
import {
  // selectProducts,
  // selectIsLoading as productLoading,
  processed as productProccessed,
} from '../../redux/features/productSlice';
import {
  // selectIsLoading as categoryLoading,
  selectSubcategory,
  processed as categoryProcessed,
} from '../../redux/features/categorySlice';
import { setNewNotification } from '../../redux/features/notificationSlice';

import {
  getProducts,
  // patchMultipleProducts,
} from '../../redux/thunks/productThunk';
import { getLayouts } from '../../redux/thunks/layoutThunk';
import { getSubcategories } from '../../redux/thunks/categoryThunk';

import ProductMapper from '../../components/StoreLayout/ProductMapper_';
import PartitionBucket from '../../components/StoreLayout/PartitionBucket';
// import ProductMapper from '../../components/StoreLayout/ProductMapper/index';

import SideMenu from '../../components/StoreLayout/SideMenu';
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
    right: 60,
    zIndex: '450',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  },
  sideMenu: {
    backdropFilter: 'blur(6px)',
    backgroundColor: 'rgba(255, 255, 255, 0.64)',
    right: '0px',
    top: ' 50%',
    position: 'fixed',
    marginTop: '-24px',
    padding: 0,
    zIndex: '1202',
    overflow: 'hidden',
    borderRadius: '10px 0px 0px 10px',
    boxShadow:
      // 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px !important',
      'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px !important',
  },
  sideMenuButton: {
    padding: 0,
    minWidth: 0,
    backgroundColor: 'transparent',
  },
  productSearch: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
  productBucket: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
}));

const ProductMapping = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const partitionBucketRef = useRef([]);
  const [partitionBuckets, setPartitionBuckets] = useState([]);

  const productsRef = useRef([]);
  const [products, setProducts] = useState([]);

  const [firstRefresh, setFirstRefresh] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [floorPlan, setFloorPlan] = useState(null);
  const [leafletLayers, setLeafletLayers] = useState([]);
  const [currentLayout, setCurrentLayout] = useState(null);

  const layouts = useSelector(selectLayouts);
  // const initProducts = useSelector(selectProducts);
  const categoryOptions = useSelector(selectSubcategory);
  // const isProductLoading = useSelector(productLoading);
  const isLayoutLoading = useSelector(selectIsLoading);

  const storeUrl = localStorage.getItem('storeUrl');
  const storeName = localStorage.getItem('storeName');

  const {
    match: {
      params: { uuid },
    },
  } = props;

  // console.log('layouts', layouts);
  // console.log('currentLayout', currentLayout);

  // console.log('products', products);
  // console.log('layouts', layouts);
  // console.log('initProducts', initProducts);
  // console.log('leafletLayers', leafletLayers);
  // console.log('setZoomLevel', setZoomLevel);
  // console.log('currentLayout', currentLayout);
  // console.log('floorPlan', floorPlan);
  // console.log('products', products);
  // console.log('///////////////////////////');
  // console.log('isProductLoading', isProductLoading);
  console.log('firstRefresh', firstRefresh);
  // console.log('isLayoutLoading', isLayoutLoading);

  const initLayoutLayers = async (layouts_) => {
    let selectedLayout;

    if (uuid) {
      selectedLayout = layouts_.find((layout) => layout.uuid === uuid);
    } else {
      [selectedLayout] = layouts_;
    }

    const { layers, floor_plan_path: path } = selectedLayout;

    if (path) {
      const file = await getFileObject(path);
      setFloorPlan({ file, path });
    }
    setCurrentLayout(selectedLayout);
    setLeafletLayers(layers);

    dispatch(categoryProcessed());
    dispatch(productProccessed());
    dispatch(layoutProcessed());
    setFirstRefresh(false);
  };

  useEffect(async () => {
    const { type: layoutStatus, payload: layoutPayload } = await dispatch(getLayouts());
    const { type: productStatus, payload: productPayload } = await dispatch(getProducts());
    const { type: subCatStatus } = await dispatch(getSubcategories());

    const requestStatusOk =
      layoutStatus.includes('fulfilled') &&
      productStatus.includes('fulfilled') &&
      subCatStatus.includes('fulfilled');

    if (requestStatusOk) {
      productsRef.current = productPayload.products;
      setProducts(productPayload.products);
      initLayoutLayers(layoutPayload.layouts);
    }
  }, []);

  // const handleOpenDetailsDialog = () => setOpenDetailsDialog(true);
  // const handleCloseDetailsDialog = () => setOpenDetailsDialog(false);

  const updateProducts = async (payload) => {
    const { type, payload: resPayload } = await dispatch();
    // updateLayout({ uuid: match.params.uuid, payload })
    console.log(payload);

    if (type.includes('fulfilled')) {
      await dispatch(
        setNewNotification({
          message: 'Product mapping successfully updated',
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
    dispatch(productProccessed());
  };

  const toProductEditor = () => {
    dispatch(processingRequest());
  };

  const removePartitionBucket = (layerUUID) => {
    let updatedPartitionBucketList = [...partitionBucketRef.current];

    updatedPartitionBucketList = updatedPartitionBucketList.filter(
      ({ layer: { id: layerId } }) => layerId !== layerUUID
    );

    partitionBucketRef.current = updatedPartitionBucketList;
    setPartitionBuckets([...updatedPartitionBucketList]);
  };

  const addPartitionBucket = (layer) => {
    const bucketAlreadyOpen = partitionBucketRef.current.find(
      ({ layer: { id: layerId } }) => layerId === layer.id
    );

    if (bucketAlreadyOpen) {
      removePartitionBucket(layer.id);
      return;
    }

    const updatedPartitionBucketList = [...partitionBucketRef.current, { layer }];

    partitionBucketRef.current = updatedPartitionBucketList;
    setPartitionBuckets([...updatedPartitionBucketList]);
  };

  const handleChangeLayout = async (e, selectedLayout) => {
    console.log('selectedLayout', selectedLayout);

    const { layers, floor_plan_path: path } = selectedLayout;

    if (path) {
      const file = await getFileObject(path);
      setFloorPlan({ file, path });
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
    <Grid container spacing={2} style={{ marginTop: '30px' }}>
      <Grid item xs={8} container>
        <Grid item xs={12}>
          <h1 style={{ marginBottom: 1, marginTop: 3, fontSize: '2em' }}>
            <span>Product Mapping</span>
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
              onClick={toProductEditor}
              to={`/${storeUrl}/layout/edit/${currentLayout.uuid}`}
              sx={{ position: 'relative', top: -5, left: 5 }}
            >
              <ModeEditOutlineRoundedIcon color="primary" sx={{ fontSize: '1.8rem' }} />
            </IconButton>
          </h1>
          <Grid item xs={12} container>
            <Grid item xs={12}>
              <Breadcrumbs separator="•" aria-label="breadcrumb">
                <div style={{ fontSize: '0.875rem' }}>{storeName}&nbsp;&nbsp;</div>,
                <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;Layout&nbsp;&nbsp;</div>
                <div style={{ fontSize: '0.875rem' }}>
                  &nbsp;&nbsp;Product Mapping&nbsp;&nbsp;
                </div>
                {currentLayout && (
                  <div style={{ fontSize: '0.875rem' }}>
                    &nbsp;&nbsp;{currentLayout.name}&nbsp;&nbsp;
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
        alignItems="center"
      >
        <Grid item xs={6}>
          <Autocomplete
            disablePortal
            disableClearable
            options={layouts}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Layout" />}
            onChange={handleChangeLayout}
            value={currentLayout}
          />
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
            type="button"
            component={Link}
            to={`/${storeUrl}/layout/create`}
            sx={{
              textTransform: 'none',
              fontSize: '0.95rem',
              borderRadius: 3,
              height: 50,
              paddingRight: 3,
              boxShadow: 'rgba(53, 132, 167, 0.44) 0px 8px 16px 0px !important',
            }}
          >
            <SaveRoundedIcon style={{ marginRight: 10 }} fontSize="small" />
            Save
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <div className={classes.zoomLevel}>Zoom Level: {zoomLevel}</div>
        <SideMenu
          layouts={layouts}
          productsRef={productsRef}
          initProducts={products}
          setInitProducts={setProducts}
          categoryOptions={categoryOptions}
          currentLayout={currentLayout}
        />
        <ProductMapper
          currentLayout={currentLayout}
          leafletLayers={leafletLayers}
          floorPlan={floorPlan}
          setZoomLevel={setZoomLevel}
          updateProducts={updateProducts}
          productsRef={productsRef}
          initProducts={products}
          setInitProducts={setProducts}
          addPartitionBucket={addPartitionBucket}
        />
        {partitionBuckets.map(({ layer }) => (
          <div key={layer.id}>
            <PartitionBucket
              layer={layer}
              currentLayoutId={currentLayout.uuid}
              productsRef={productsRef}
              initProducts={products}
              setInitProducts={setProducts}
              categoryOptions={categoryOptions}
              removePartitionBucket={removePartitionBucket}
            />
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

export default ProductMapping;

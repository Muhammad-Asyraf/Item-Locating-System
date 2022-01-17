import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-geometryutil';

import Button from '@mui/material/Button';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';

import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

import { makeStyles } from '@mui/styles';

import '../../assets/css/leafletOverride.css';
import {
  mapBounds,
  floorPlanBounds,
  mapComponent,
  mapDefaultConfig,
  mapStyles,
  recenterBtn,
} from './utils/mapConfig';

const useStyles = makeStyles(() => ({
  refreshButton: {
    position: 'absolute !important',
    top: 300,
    left: 296,
    zIndex: '400 !important',
    backgroundColor: 'white !important',
  },
}));

/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
const ProductMapper = (props) => {
  const classes = useStyles();
  const storeUUID = localStorage.getItem('storeUUID');

  const {
    leafletRef,
    currentLayout,
    leafletLayers,
    floorPlan,
    setZoomLevel,
    productsRef,
    setInitProducts,
    addPartitionBucket,
  } = props;

  // const productsRef = useRef(initProducts);
  const mapRef = useRef(null);
  const floorLayers = useRef([]);
  const shelfLayers = useRef([]);
  const shelfPartitionLayers = useRef([]);
  // const savedLayers = useRef([]);
  const storeViewport = [50, 50];

  const {
    floor: { config: floorConfig },
    shelf: { config: shelfConfig },
    shelfPartition: { config: shelfPartitionConfig },
  } = mapComponent;

  const { styles: floorStyles } = floorConfig;
  const { styles: shelfStyles } = shelfConfig;
  const { styles: shelfPartitionStyles } = shelfPartitionConfig;

  const floorShapes = floorConfig.shapes;
  const shelfShapes = shelfConfig.shapes;
  const shelfPartitionShapes = shelfPartitionConfig.shapes;

  const reCenter = () => {
    mapRef.current.flyTo(storeViewport, 2.8);
  };

  const initShapeObj = (layer, shape) => {
    const isPartitionLayer = shelfPartitionShapes.includes(shape);
    const isShelfLayer = shelfShapes.includes(shape);

    if (isPartitionLayer) {
      layer._path.ondrop = (event) => {
        layer.setStyle({ ...shelfPartitionStyles });
        const updatedProducts = [...productsRef.current];

        const { sourceId, payload } = JSON.parse(event.dataTransfer.getData('dragPayload'));
        event.dataTransfer.clearData();

        if (sourceId === layer.id) {
          return;
        }

        payload.forEach((selectedProductUUID) => {
          const selectedProductIndex = updatedProducts.findIndex(
            ({ uuid }) => uuid === selectedProductUUID
          );

          const updatedSelectedProduct = { ...updatedProducts[selectedProductIndex] };
          updatedSelectedProduct.layout_uuid = currentLayout.uuid;
          updatedSelectedProduct.partition_uuid = layer.id;
          updatedProducts[selectedProductIndex] = updatedSelectedProduct;
        });

        productsRef.current = updatedProducts;
        setInitProducts(updatedProducts);
      };

      layer._path.ondragover = (event) => {
        event.preventDefault();
        const zoomlevel = mapRef.current.getZoom();
        const adjustedZoomLevel = (zoomlevel - 2).toFixed(1);

        if (adjustedZoomLevel >= 0.9 && isPartitionLayer) {
          layer.setStyle({ ...shelfPartitionStyles, fillColor: '#d7e75c' });
        } else if (adjustedZoomLevel < 0.9 && isShelfLayer) {
          layer.setStyle({ ...shelfStyles, fillColor: '#d7e75c' });
        }
      };

      layer._path.ondragleave = () => {
        const zoomlevel = mapRef.current.getZoom();
        const adjustedZoomLevel = (zoomlevel - 2).toFixed(1);

        if (adjustedZoomLevel >= 0.9 && isPartitionLayer) {
          layer.setStyle({ ...shelfPartitionStyles });
        } else if (adjustedZoomLevel < 0.9 && isShelfLayer) {
          layer.setStyle({ ...shelfStyles });
        }
      };
    }

    layer._path.onclick = () => {
      if (isPartitionLayer) {
        addPartitionBucket(layer);
      }
    };

    layer._path.onmouseover = () => {
      document.myParam = layer;
      const zoomlevel = mapRef.current.getZoom();
      const adjustedZoomLevel = (zoomlevel - 2).toFixed(1);

      if (adjustedZoomLevel >= 0.9 && isPartitionLayer) {
        layer.setStyle({ ...shelfPartitionStyles, fillColor: '#d7e75c' });
      } else if (adjustedZoomLevel < 0.9 && isShelfLayer) {
        layer.setStyle({ ...shelfStyles, fillColor: '#d7e75c' });
      }

      // console.log('Mouse is over the  layer', layer);
      // document.addEventListener('mouseup', mouseRelease);
    };

    layer._path.onmouseleave = () => {
      document.myParam = layer;
      const zoomlevel = mapRef.current.getZoom();
      const adjustedZoomLevel = (zoomlevel - 2).toFixed(1);

      if (adjustedZoomLevel >= 0.9 && isPartitionLayer) {
        layer.setStyle({ ...shelfPartitionStyles });
      } else if (adjustedZoomLevel < 0.9 && isShelfLayer) {
        layer.setStyle({ ...shelfStyles });
      }

      // console.log('Mouse is leaving the  layer', layer);
      // document.removeEventListener('mouseup', mouseRelease);
    };
  };

  const initLayoutLayers = (shape, pane, latLngs, meta_data, styles) => {
    const isRectangle = shape.includes('Rectangle');
    const isPolygon = shape.includes('Polygon');
    const isCircle = shape.includes('Circle');
    const isPolyline = shape.includes('Line');

    const { angle, radius } = meta_data;

    let newLayer;

    if (isRectangle) {
      newLayer = L.rectangle(Object.values(latLngs), { ...styles, pane });
    } else if (isPolygon) {
      newLayer = L.polygon(Object.values(latLngs), { ...styles, pane });
    } else if (isCircle) {
      newLayer = L.circle(latLngs, { ...styles, pane, radius });
    } else if (isPolyline) {
      newLayer = L.polyline(latLngs, { ...styles, pane });
    }

    newLayer.pm._shape = shape;
    newLayer.addTo(mapRef.current);

    // if its a rotated shape, adjust angle
    if (angle) {
      newLayer.pm.rotateLayerToAngle(angle);
    }

    return newLayer;
  };

  // const handleKeyDown = (evt) => {
  //   const { shiftKey, key, repeat } = evt;

  //   if (repeat) return;

  //   console.log('key is pressed', key);

  //   if (shiftKey) {
  //     // get all layers except 1st index since its the floor plan layer
  //     let allLayers;

  //     if (floorPlan) {
  //       allLayers = mapRef.current.pm.getGeomanLayers().slice(2);
  //     } else {
  //       allLayers = mapRef.current.pm.getGeomanLayers().slice(1);
  //     }

  //     allLayers.forEach(({ _path }) => {
  //       _path.shiftKeyHold = true;
  //     });
  //   }
  // };

  // const handleKeyUp = ({ key }) => {
  //   if (key === 'Alt') {
  //     console.log('key is released', key);
  //   }

  //   if (key === 'Shift') {
  //     console.log('key is released', key);
  //   }
  // };

  // const handleDblClick = ({ target }) => {
  //   console.log('double Click', target, target.className);
  //   if (!target.className.baseVal) {
  //     console.log('double Click outside');
  //   }
  // };

  const loadLayers = (layers) => {
    layers.forEach(({ layer_coordinate: latLngs, meta_data, shape, uuid }) => {
      const floorPaneShapes = floorShapes.includes(shape);
      const shelfPaneShapes = shelfShapes.includes(shape);
      const shelfPartitionPaneShapes = shelfPartitionShapes.includes(shape);

      let newLayer;

      if (floorPaneShapes) {
        newLayer = initLayoutLayers(shape, 'floor', latLngs, meta_data, floorStyles);
        floorLayers.current = [...floorLayers.current, newLayer];
      } else if (shelfPaneShapes) {
        newLayer = initLayoutLayers(shape, 'shelf', latLngs, meta_data, shelfStyles);
        shelfLayers.current = [...shelfLayers.current, newLayer];
      } else if (shelfPartitionPaneShapes) {
        newLayer = initLayoutLayers(
          shape,
          'shelfPartition',
          latLngs,
          meta_data,
          shelfPartitionStyles
        );

        shelfPartitionLayers.current = [...shelfPartitionLayers.current, newLayer];
      }
      newLayer.id = uuid;
      initShapeObj(newLayer, shape);
    });
  };

  const reconstructLayers = (layer) => {
    const {
      pm: { _shape: shape },
      id,
      pm,
    } = layer;

    const isCircle = shape.includes('Circle');
    const isPolyline = shape.includes('Line');

    let latLngs = null;
    let radius = null;
    let initialAngle = null;

    if (isCircle) {
      latLngs = layer.getLatLng();
      radius = layer.getRadius();
    } else {
      initialAngle = pm.getAngle();

      // rotate to 0 degree to get oriLatLngs of the object
      pm.rotateLayerToAngle(0);

      if (isPolyline) {
        latLngs = layer.getLatLngs();
      } else {
        [latLngs] = layer.getLatLngs();
      }

      // rotate back to previous rotation angle
      pm.rotateLayerToAngle(initialAngle);
    }

    return {
      uuid: id,
      shape,
      layer_coordinate: Array.isArray(latLngs) ? { ...latLngs } : latLngs,
      meta_data: { radius, angle: initialAngle, parentShelf: layer.parentShelf },
    };
  };

  const prepareSavedLayers = () => {
    const _floorLayers = floorLayers.current.map((layer) => reconstructLayers(layer));
    const _shelfLayers = shelfLayers.current.map((layer) => reconstructLayers(layer));
    const _shelfPartitionLayers = shelfPartitionLayers.current.map((layer) => {
      return reconstructLayers(layer);
    });

    return [..._floorLayers, ..._shelfLayers, ..._shelfPartitionLayers];
  };

  const initMap = () => {
    const map = L.map('map', mapDefaultConfig).setView(storeViewport, 2);
    map.fitBounds(mapBounds);

    leafletRef.current = { map, leaflet: L };
    mapRef.current = map;
  };

  const initCustomPane = () => {
    const map = mapRef.current;

    map.createPane('floor').style.zIndex = 350;
    map.createPane('shelf').style.zIndex = 370;
    map.createPane('shelfPartition').style.zIndex = 390;

    map._getPaneRenderer('floor').options.padding = 100;
    map._getPaneRenderer('shelf').options.padding = 100;
    map._getPaneRenderer('shelfPartition').options.padding = 100;
  };

  const initFloorPlan = () => {
    const map = mapRef.current;

    if (floorPlan) {
      L.imageOverlay(floorPlan.path, floorPlanBounds, { pane: 'floor' }).addTo(map);
    }
    // map.flyTo(storeViewport, 2.8);
  };

  const setZoomBehavior = () => {
    const map = mapRef.current;

    map.on('zoomend', () => {
      const zoomlevel = map.getZoom();
      const adjustedZoomLevel = (zoomlevel - 2).toFixed(1);
      setZoomLevel(adjustedZoomLevel);
      console.log('zoomlevel', adjustedZoomLevel);

      if (adjustedZoomLevel >= 0.9) {
        shelfLayers.current.forEach((currentLayer) => {
          currentLayer.setStyle({ ...shelfStyles, weight: 0 });
        });

        shelfPartitionLayers.current.forEach((currentLayer) => {
          L.DomUtil.addClass(currentLayer._path, 'leaflet-interactive');
          currentLayer.setStyle({ ...shelfPartitionStyles });
        });
      } else if (adjustedZoomLevel < 0.9) {
        shelfLayers.current.forEach((currentLayer) => {
          currentLayer.setStyle({ ...shelfStyles });
        });

        shelfPartitionLayers.current.forEach((currentLayer) => {
          L.DomUtil.removeClass(currentLayer._path, 'leaflet-interactive');
          currentLayer.setStyle({
            ...shelfPartitionStyles,
            weight: 0,
            fillColor: 'transparent',
          });
        });
      }
    });
  };

  useEffect(() => {
    initMap();
    initCustomPane();
    initFloorPlan();

    loadLayers(leafletLayers);

    // if (savedLayers.current) {
    //   loadLayers(savedLayers.current);
    // }

    setZoomBehavior();

    // document.addEventListener('keydown', handleKeyDown);
    // document.addEventListener('dblclick', handleDblClick);
    // document.addEventListener('keyup', handleKeyUp);

    return () => {
      // savedLayers.current = prepareSavedLayers();

      floorLayers.current = [];
      shelfLayers.current = [];
      shelfPartitionLayers.current = [];

      // document.removeEventListener('keydown', handleKeyDown);
      // document.removeEventListener('dblclick', handleDblClick);
      // document.removeEventListener('keyup', handleKeyUp);

      mapRef.current.remove();
    };
  }, [currentLayout]);

  /// save logic //////////////////

  const handleSavelayout = (e) => {
    e.preventDefault();
    const layers = prepareSavedLayers();

    console.log(layers);
    console.log(storeUUID);
    console.log(currentLayout);
  };

  return (
    <>
      <div id="map" style={mapStyles} />
      <Button onClick={reCenter} sx={recenterBtn} className={classes.refreshButton}>
        <CenterFocusStrongIcon sx={{ color: 'black' }} />
      </Button>
      <form id="layout-form" onSubmit={handleSavelayout} style={{ display: 'hidden' }} />
    </>
  );
};

export default ProductMapper;

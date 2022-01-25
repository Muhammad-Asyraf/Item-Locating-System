import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-geometryutil';

import icons from 'leaflet-color-number-markers';

import Button from '@mui/material/Button';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';

import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

import { makeStyles } from '@mui/styles';

import '../../../assets/css/leafletOverride.css';
import {
  // mapBounds,
  floorPlanBounds,
  mapComponent,
  mapDefaultConfig,
  recenterBtn,
} from '../utils/mapConfig';
import { groupBy } from '../../../utils/general';

const useStyles = makeStyles(() => ({
  refreshButton: {
    position: 'absolute !important',
    top: 100,
    left: 10,
    zIndex: '400 !important',
    backgroundColor: 'white !important',
  },
}));

/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
const Viewer = (props) => {
  const classes = useStyles();

  const { leafletRef, currentLayout, leafletLayers, floorPlan, products } = props;

  const mapRef = useRef(null);
  const markerGroupRef = useRef(null);
  const floorLayers = useRef([]);
  const shelfLayers = useRef([]);
  const shelfPartitionLayers = useRef([]);
  const selectedPartition = useRef([]);
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
    mapRef.current.flyTo(storeViewport, 3.5);
  };

  const addLookupProductMarker = (latLng, number) => {
    const markerGroup = markerGroupRef.current;

    const marker = L.marker(latLng, { icon: icons.red.numbers[number] });
    markerGroup.addLayer(marker);
  };

  window.addEventListener('message', (message) => {
    console.log('message', message.data);
    // const partitionViewport = JSON.parse(message);
    // mapRef.current.flyTo(partitionViewport, 3);
  });

  const initMarkers = () => {
    const map = mapRef.current;
    const markerGroup = markerGroupRef.current;

    markerGroup.clearLayers();
    map.removeLayer(markerGroup);

    if (products.length > 0) {
      const productsByLayer = groupBy(products, 'partition_uuid');
      const selectedLayer = Object.keys(productsByLayer);

      const { layers } = currentLayout;

      selectedLayer.forEach((uuid) => {
        const layer = layers.find(({ uuid: layerUUID }) => layerUUID === uuid);

        if (layer) {
          const {
            meta_data: { center },
          } = layer;

          const latLng = Object.values(center);
          const productQty = productsByLayer[uuid].length;

          addLookupProductMarker(latLng, productQty);
        }
      });

      markerGroup.addTo(map);
    }
  };

  const initShapeObj = (layer, shape) => {
    const isPartitionLayer = shelfPartitionShapes.includes(shape);
    const isShelfLayer = shelfShapes.includes(shape);

    if (isPartitionLayer) {
      const locatedShelf = products.some(
        ({ partition_uuid: partitionUUID }) => partitionUUID === layer.id
      );

      if (locatedShelf) {
        layer.setStyle({ ...shelfPartitionStyles, fillColor: '#d7e75c' });
        selectedPartition.current = [...selectedPartition.current, layer.id];
      }

      layer._path.ontouchend = (e) => {
        e.preventDefault();

        const layerProduct = products.filter(
          ({ partition_uuid: partitionUUID }) => partitionUUID === layer.id
        );

        window.postMessage(JSON.stringify(layerProduct));
      };
    }

    layer._path.onmouseover = () => {
      document.myParam = layer;
      const zoomlevel = mapRef.current.getZoom();
      const adjustedZoomLevel = (zoomlevel - 2).toFixed(1);

      if (adjustedZoomLevel >= 0.9 && isPartitionLayer) {
        layer.setStyle({ ...shelfPartitionStyles, fillColor: '#d7e75c' });
      } else if (adjustedZoomLevel < 0.9 && isShelfLayer) {
        layer.setStyle({ ...shelfStyles, fillColor: '#d7e75c' });
      }
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

  const initMap = () => {
    const map = L.map('map', mapDefaultConfig).setView(storeViewport, 4.5);
    map.flyTo(storeViewport, 3);
    // map.fitBounds(mapBounds);

    leafletRef.current = { map, leaflet: L };
    mapRef.current = map;
    markerGroupRef.current = L.layerGroup();
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

      if (adjustedZoomLevel >= 0.9) {
        shelfPartitionLayers.current.forEach((currentLayer) => {
          L.DomUtil.addClass(currentLayer._path, 'leaflet-interactive');

          const locatedShelf = selectedPartition.current.includes(currentLayer.id);

          if (locatedShelf) {
            currentLayer.setStyle({ ...shelfPartitionStyles, fillColor: '#d7e75c' });
          } else {
            currentLayer.setStyle({ ...shelfPartitionStyles });
          }
        });
      } else if (adjustedZoomLevel < 0.9) {
        shelfPartitionLayers.current.forEach((currentLayer) => {
          L.DomUtil.removeClass(currentLayer._path, 'leaflet-interactive');

          const locatedShelf = selectedPartition.current.includes(currentLayer.id);

          if (locatedShelf) {
            currentLayer.setStyle({
              ...shelfPartitionStyles,
              fillColor: '#d7e75c',
              weight: 0.5,
            });
          } else {
            currentLayer.setStyle({ ...shelfPartitionStyles, weight: 0.5 });
          }
        });
      }
    });
  };

  useEffect(() => {
    initMap();
    initCustomPane();
    initFloorPlan();

    loadLayers(leafletLayers);
    setZoomBehavior();

    initMarkers();

    return () => {
      floorLayers.current = [];
      shelfLayers.current = [];
      shelfPartitionLayers.current = [];
      selectedPartition.current = [];
      markerGroupRef.current = null;

      mapRef.current.remove();
    };
  }, [currentLayout]);

  return (
    <>
      <div
        id="map"
        style={{
          overflow: 'hidden',
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0)',
        }}
      />
      <Button onClick={reCenter} sx={recenterBtn} className={classes.refreshButton}>
        <CenterFocusStrongIcon sx={{ color: 'black' }} />
      </Button>
    </>
  );
};

export default Viewer;

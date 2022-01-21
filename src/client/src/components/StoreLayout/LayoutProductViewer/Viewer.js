import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-geometryutil';

import Button from '@mui/material/Button';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';

import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

import { makeStyles } from '@mui/styles';

import '../../../assets/css/leafletOverride.css';
import {
  mapBounds,
  floorPlanBounds,
  mapComponent,
  mapDefaultConfig,
  recenterBtn,
} from '../utils/mapConfig';

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

  const { leafletRef, currentLayout, leafletLayers, floorPlan, setZoomLevel } = props;

  const mapRef = useRef(null);
  const floorLayers = useRef([]);
  const shelfLayers = useRef([]);
  const shelfPartitionLayers = useRef([]);
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

    setZoomBehavior();

    return () => {
      floorLayers.current = [];
      shelfLayers.current = [];
      shelfPartitionLayers.current = [];

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

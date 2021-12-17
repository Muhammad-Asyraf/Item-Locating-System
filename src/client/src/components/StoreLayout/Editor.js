import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-geometryutil';

import { v4 as uuidv4 } from 'uuid';

import Button from '@mui/material/Button';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import FlipToFrontRoundedIcon from '@mui/icons-material/FlipToFrontRounded';
import FlipToBackRoundedIcon from '@mui/icons-material/FlipToBackRounded';

import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

import { makeStyles } from '@mui/styles';

import '../../assets/css/leafletOverride.css';
import {
  mapBounds,
  floorPlanBounds,
  mapComponent,
  mapDefaultConfig,
  geomanConfig,
  geomanGlobalOpt,
  mapStyles,
  firstBtn,
  lastBtn,
} from './mapConfig';

const useStyles = makeStyles(() => ({
  refreshButton: {
    position: 'absolute !important',
    top: 300,
    left: 296,
    zIndex: '400 !important',
    backgroundColor: 'white !important',
  },
  floorLockButton: {
    position: 'absolute !important',
    top: 338,
    left: 296,
    zIndex: '400 !important',
    backgroundColor: 'white !important',
  },
  bringToFrontButton: {
    position: 'absolute !important',
    top: 390,
    left: 296,
    zIndex: '400 !important',
    backgroundColor: 'white !important',
  },
  bringToBackButton: {
    position: 'absolute !important',
    top: 428,
    left: 296,
    zIndex: '400 !important',
    backgroundColor: 'white !important',
  },
}));

/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const Editor = (props) => {
  const classes = useStyles();
  const mapRef = useRef(null);
  // const mapBoxTileRef = useRef(null);
  const editedShapesRef = useRef([]);
  const isDrawingRef = useRef(false);
  const floorLockToggle = useRef(false);
  const floorLayers = useRef([]);
  const shelfLayers = useRef([]);
  const shelfPartitionLayers = useRef([]);
  // const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const storeViewport = [50, 50];
  // const storeViewport = [3.1717115606179553, 101.69704167783205];

  const {
    floor: { shapes: floorComponent, config: floorConfig },
    shelf: { shapes: shelfComponent, config: shelfConfig },
    shelfPartition: { shapes: shelfPartitionComponent, config: shelfPartitionConfig },
  } = mapComponent;

  const { styles: floorStyles } = floorConfig;
  const { styles: shelfStyles } = shelfConfig;
  const { styles: shelfPartitionStyles } = shelfPartitionConfig;

  const floorShapes = floorConfig.shapes;
  const shelfShapes = shelfConfig.shapes;
  const shelfPartitionShapes = shelfPartitionConfig.shapes;

  const { setFloorIsLocked, setZoomLevel, saveLayout } = props;
  // const mapboxTileURL =
  //   'https://api.mapbox.com/styles/v1/loketla/ckwt0h82z3pvu14mkkjoypl6h/tiles/{z}/{x}/{y}@2x?access_token={accessToken}';

  // styles/loketla/ckwt0h82z3pvu14mkkjoypl6h

  useEffect(() => {
    const map = L.map('map', mapDefaultConfig).setView(storeViewport, 2);
    map.flyTo(storeViewport, 2.8);
    L.marker([50, 50]).addTo(map);
    map.fitBounds(mapBounds);
    console.log(floorPlanBounds);

    // override default hidden tile by creating a plugin and create a visible tile
    L.GridLayer.GridDebug = L.GridLayer.extend({
      createTile: () => {
        const tile = document.createElement('div');
        tile.style.outline = '1px solid rgba(0,0,0,0.1)';
        return tile;
      },
    });

    L.gridLayer.gridDebug = (opts) => new L.GridLayer.GridDebug(opts);

    map.addLayer(L.gridLayer.gridDebug());

    // map.flyTo(storeViewport, 15);

    // const mapBoxTile = L.tileLayer(mapboxTileURL, {
    //   maxZoom: 23.5,
    //   minZoom: 15,
    //   tileSize: 512,
    //   zoomOffset: -1,
    //   accessToken: mapboxToken,
    // }).addTo(map);

    map.createPane('floor').style.zIndex = 350;
    map.createPane('shelf').style.zIndex = 370;
    map.createPane('shelfPartition').style.zIndex = 390;

    map._getPaneRenderer('floor').options.padding = 100;
    map._getPaneRenderer('shelf').options.padding = 100;
    map._getPaneRenderer('shelfPartition').options.padding = 100;

    // Others
    // const floorPlanSVG = '/app/public/uploaded_layout/floorPlan.svg';
    // const floorPlanSVG = '/app/public/uploaded_layout/layout-1.svg';
    // const floorPlanSVG = '/app/public/uploaded_layout/layout-2.svg';
    // const floorPlanSVG = '/app/public/uploaded_layout/layout-3.svg';
    const floorPlanSVG = '/app/public/uploaded_layout/layout-4.svg';

    L.imageOverlay(floorPlanSVG, floorPlanBounds, { pane: 'floor' }).addTo(map);

    map.pm.addControls(geomanConfig);
    map.pm.Toolbar.copyDrawControl('Polyline', floorComponent.line);
    map.pm.Toolbar.copyDrawControl('Rectangle', floorComponent.rectangle);
    map.pm.Toolbar.copyDrawControl('Polygon', floorComponent.polygon);

    map.pm.Toolbar.copyDrawControl('Circle', shelfComponent.circle);
    map.pm.Toolbar.copyDrawControl('Rectangle', shelfComponent.rectangle);
    map.pm.Toolbar.copyDrawControl('Polygon', shelfComponent.polygon);

    map.pm.Toolbar.copyDrawControl('Circle', shelfPartitionComponent.circle);
    map.pm.Toolbar.copyDrawControl('Rectangle', shelfPartitionComponent.rectangle);
    map.pm.Toolbar.copyDrawControl('Polygon', shelfPartitionComponent.polygon);

    map.pm.setPathOptions(floorStyles, {
      ignoreShapes: floorConfig.ignoreShapes,
    });
    map.pm.setPathOptions(shelfStyles, {
      ignoreShapes: shelfConfig.ignoreShapes,
    });
    map.pm.setPathOptions(shelfPartitionStyles, {
      ignoreShapes: shelfPartitionConfig.ignoreShapes,
    });

    map.pm.setGlobalOptions(geomanGlobalOpt);

    map.on('zoomend', () => {
      const zoomlevel = map.getZoom();
      // const floorStyles = mapComponent.floor.config.styles.pathOptions;
      // const { ignoreShapes: floorIgnoreShapes } = mapComponent.floor.config;
      console.log('The layers', zoomlevel);
      setZoomLevel(Math.round(zoomlevel) - 2);

      if (zoomlevel >= 23) {
        // map.removeLayer(mapBoxTile);
      } else if (zoomlevel < 23 && zoomlevel > 21) {
        // if (!map.hasLayer(mapBoxTile)) {
        //   map.addLayer(mapBoxTile);
        // }
      }

      // console.log('ada tak', map.hasLayer(mapBoxTile));

      // if (zoomlevel < 21) {
      //   mapRef.current.pm.disableGlobalEditMode();
      //   layers.forEach((layer) => {
      //     if (!floorIgnoreShapes.includes(layer.pm._shape)) {
      //       layer.setStyle({ ...floorStyles, stroke: false });
      //     }
      //   });
      // } else {
      //   layers.forEach((layer) => {
      //     if (!floorIgnoreShapes.includes(layer.pm._shape)) {
      //       layer.setStyle({ ...floorStyles, stroke: true });
      //     }
      //   });
      // }
    });

    mapRef.current = map;
    // mapBoxTileRef.current = mapBoxTile;
    return () => {
      map.remove();
    };
  }, []);

  const reCenter = () => {
    mapRef.current.flyTo(storeViewport, 2.8);
  };

  const bringToFront = () => {
    editedShapesRef.current.forEach((currentLayer) => {
      currentLayer.bringToFront();
    });
  };

  const bringToBack = () => {
    editedShapesRef.current.forEach((currentLayer) => {
      currentLayer.bringToBack();
    });
  };

  const toogleFloorLock = () => {
    const toggleFloorLock = !floorLockToggle.current;

    if (floorLayers.current.length > 0) {
      mapRef.current.pm.Toolbar.setButtonDisabled('FloorLine', toggleFloorLock);
      mapRef.current.pm.Toolbar.setButtonDisabled('RectangleFloor', toggleFloorLock);
      mapRef.current.pm.Toolbar.setButtonDisabled('PolygonFloor', toggleFloorLock);
      setFloorIsLocked(toggleFloorLock);

      floorLayers.current.forEach(({ _path, pm }) => {
        pm.disable();
        if (toggleFloorLock) {
          L.DomUtil.removeClass(_path, 'leaflet-interactive');
        } else {
          L.DomUtil.addClass(_path, 'leaflet-interactive');
        }
      });
    }

    floorLockToggle.current = toggleFloorLock;
  };

  const enableEdit = ({ currentTarget }) => {
    const { myParam: layer } = currentTarget;

    console.log(
      'Im up click?',
      layer.pm.rotateEnabled(),
      'shiftKey? ',
      layer._path.shiftKeyHold
    );

    // console.log('check dis mododdoodod edit', isDrawingRef.current);

    if (!layer.pm.rotateEnabled() && !isDrawingRef.current) {
      // console.log('Eh eh babi ni ter triggered');

      layer._path.isFromRotate = false;

      if (!layer._path.shiftKeyHold) {
        mapRef.current.pm.disableGlobalEditMode();
        editedShapesRef.current = [];
      }
      mapRef.current.pm.disableGlobalRotateMode();

      layer.pm.disableLayerDrag();
      layer.pm.enable({
        allowEditing: true,
      });
    }
  };

  // layer._path.myParam = layer;
  // L.DomEvent.on(layer._path, 'keydown', handleEditKeyDown);

  const initShapeObj = (layer, shape) => {
    layer._path.isFromRotate = false;

    const floorPaneShapes = floorShapes.includes(shape);
    const shelfPaneShapes = shelfShapes.includes(shape);
    const shelfPartitionPaneShapes = shelfPartitionShapes.includes(shape);

    layer.on('pm:enable', ({ layer: editedLayer }) => {
      // console.log('will add to list', editedLayer, !editedLayer._path.isFromRotate);

      if (floorPaneShapes) {
        editedLayer.setStyle({ ...floorStyles, dashArray: '10' });
      } else if (shelfPaneShapes) {
        editedLayer.setStyle({ ...shelfStyles });
      } else if (shelfPartitionPaneShapes) {
        editedLayer.setStyle({ ...shelfPartitionStyles });
      }

      if (!editedLayer._path.isFromRotate) {
        const editedList = [...editedShapesRef.current, editedLayer];
        editedShapesRef.current = editedList;
        editedLayer.pm.setOptions({
          ...geomanGlobalOpt,
          syncLayersOnDrag: editedList,
        });
      }
    });

    layer.on('pm:disable', ({ layer: disabledLayer }) => {
      console.log(
        'will remove from list',
        disabledLayer,
        layer._leaflet_id,
        !disabledLayer._path.isFromRotate
      );

      if (floorPaneShapes) {
        disabledLayer.setStyle({ ...floorStyles });
      } else if (shelfPaneShapes) {
        disabledLayer.setStyle({ ...shelfStyles });
      } else if (shelfPartitionPaneShapes) {
        disabledLayer.setStyle({ ...shelfPartitionStyles });
      }

      if (!disabledLayer._path.isFromRotate) {
        const editedList = editedShapesRef.current.filter(
          ({ _leaflet_id }) => layer._leaflet_id !== _leaflet_id
        );
        editedShapesRef.current = editedList;
        disabledLayer.pm.setOptions({
          ...geomanGlobalOpt,
          syncLayersOnDrag: editedList,
        });
      }
    });

    layer.on('pm:rotateend', ({ angle }) => {
      editedShapesRef.current.forEach((currentLayer) => {
        currentLayer.pm.rotateLayerToAngle(angle);
      });
    });

    layer._path.onmousedown = ({ srcElement }) => {
      console.log('shape mouse down?', layer.pm.rotateEnabled());
      // console.log('check dis mododdoodod', isDrawingRef.current);
      if (!layer.pm.rotateEnabled() && !isDrawingRef.current) {
        layer.pm.enableLayerDrag();
        if (!layer._path.shiftKeyHold) {
          editedShapesRef.current.forEach((currentLayer) => {
            currentLayer.pm.disable();
          });
        }

        // mapRef.current.pm.disableGlobalEditMode();
        // after enableLayerDrag, find the mousedown event of the el & triggers it
        const firstKey = Object.keys(srcElement._leaflet_events)[0];
        srcElement._leaflet_events[firstKey]();
      }
    };

    layer._path.onmouseover = () => {
      document.myParam = layer;
      // console.log(layer);
      document.addEventListener('mouseup', enableEdit);
    };

    layer._path.onmouseleave = () => {
      document.myParam = layer;
      document.removeEventListener('mouseup', enableEdit);
    };
  };

  const drawLayer = (shape, pane, styles, layer) => {
    let duplicateLayer;
    let latLngs;
    let radius;

    const isRectangle = shape.includes('Rectangle');
    const isPolygon = shape.includes('Polygon');
    const isCircle = shape.includes('Circle');
    const isPolyline = shape.includes('Line');
    const initialAngle = layer.pm.getAngle();

    if (isCircle) {
      latLngs = layer.getLatLng();
      radius = layer.getRadius();
    } else {
      // rotate to 0 degree to get oriLatLngs of the object
      layer.pm.rotateLayerToAngle(0);

      if (isPolyline) {
        latLngs = layer.getLatLngs();
      } else {
        [latLngs] = layer.getLatLngs();
      }

      // rotate back to previous rotation angle
      layer.pm.rotateLayerToAngle(initialAngle);
    }

    // adjust duplicate shape's latlngs to be few meters away
    // const adjustedLatLngs = oriLatLngs.map((latlng) => ({
    //   lat: latlng.lat,
    //   lng: latlng.lng,
    // }));

    if (isRectangle) {
      duplicateLayer = L.rectangle(latLngs, { ...styles, pane });
    } else if (isPolygon) {
      duplicateLayer = L.polygon(latLngs, { ...styles, pane });
    } else if (isCircle) {
      duplicateLayer = L.circle(latLngs, { ...styles, pane, radius });
    } else if (isPolyline) {
      duplicateLayer = L.polyline(latLngs, { ...styles, pane });
    }

    duplicateLayer.pm._shape = shape;
    duplicateLayer.addTo(mapRef.current);

    // if its a rotated shape, adjust angle
    if (layer.pm._angle) {
      duplicateLayer.pm.rotateLayerToAngle(initialAngle);
    }

    return duplicateLayer;
  };

  const duplicateShapes = () => {
    editedShapesRef.current.forEach((currentLayer) => {
      const { _shape: shape } = currentLayer.pm;
      const floorPaneShapes = floorShapes.includes(shape);
      const shelfPaneShapes = shelfShapes.includes(shape);
      const shelfPartitionPaneShapes = shelfPartitionShapes.includes(shape);

      let newLayer;
      console.log('duplicate layer', currentLayer);

      if (floorPaneShapes) {
        newLayer = drawLayer(shape, 'floor', floorStyles, currentLayer);
        newLayer.id = `FL-${uuidv4()}`;
        floorLayers.current = [...floorLayers.current, newLayer];
      } else if (shelfPaneShapes) {
        newLayer = drawLayer(shape, 'shelf', shelfStyles, currentLayer);
        newLayer.id = `SH-${uuidv4()}`;
        shelfLayers.current = [...shelfLayers.current, newLayer];
      } else if (shelfPartitionPaneShapes) {
        newLayer = drawLayer(shape, 'shelfPartition', shelfPartitionStyles, currentLayer);
        newLayer.id = `SP-${uuidv4()}`;
        shelfPartitionLayers.current = [...shelfPartitionLayers.current, newLayer];
      }

      initShapeObj(newLayer);
    });
  };

  const handleKeyDown = (evt) => {
    const { altKey, ctrlKey, shiftKey, key, repeat } = evt;

    if (repeat) return;
    // console.log('pressed key checked', key, editedShapesRef.current);
    if (altKey && editedShapesRef.current.length > 0) {
      editedShapesRef.current.forEach(({ pm, _path }) => {
        _path.isFromRotate = true;
        pm.disable();
        pm.disableLayerDrag();
        pm.enableRotate();
      });
    }

    if (shiftKey) {
      // get all layers except 1st index since its the floor plan layer
      const allLayers = mapRef.current.pm.getGeomanLayers();
      allLayers.shift();

      allLayers.forEach(({ _path }) => {
        _path.shiftKeyHold = true;
      });
      // console.log(allLayers);
    }

    if (ctrlKey && key === 'd') {
      evt.preventDefault();

      duplicateShapes();
      mapRef.current.pm.disableGlobalEditMode();
      mapRef.current.pm.disableGlobalRotateMode();
    }

    if (key === 'Delete') {
      document.removeEventListener('mouseup', enableEdit);
      editedShapesRef.current.forEach(({ pm: { _shape }, pm, id }) => {
        const floorPaneShapes = floorShapes.includes(_shape);
        const shelfPaneShapes = shelfShapes.includes(_shape);
        const shelfPartitionPaneShapes = shelfPartitionShapes.includes(_shape);

        if (floorPaneShapes) {
          floorLayers.current = floorLayers.current.filter((layer) => layer.id !== id);
        } else if (shelfPaneShapes) {
          shelfLayers.current = shelfLayers.current.filter((layer) => layer.id !== id);
        } else if (shelfPartitionPaneShapes) {
          shelfPartitionLayers.current = shelfPartitionLayers.current.filter(
            (layer) => layer.id !== id
          );
        }

        pm.remove();
      });
    }
  };

  const handleKeyUp = ({ key }) => {
    // console.log('pressed up:', key);

    if (key === 'Alt' && editedShapesRef.current.length > 0) {
      editedShapesRef.current.forEach(({ pm }) => {
        pm.disableRotate();
        pm.enable({
          allowEditing: true,
        });
      });
    }

    if (key === 'Shift') {
      const allLayers = mapRef.current.pm.getGeomanLayers();
      allLayers.shift();

      allLayers.forEach(({ _path }) => {
        _path.shiftKeyHold = false;
      });

      // mapRef.current.pm.disableGlobalEditMode();
      // editedShapesRef.current = [];
    }
  };

  const handleDblClick = ({ target }) => {
    // mapRef.current.pm.disableGlobalEditMode();

    if (!target.className.baseVal && editedShapesRef.current.length > 0) {
      editedShapesRef.current.forEach(({ _path, pm }) => {
        _path.isFromRotate = false;
        pm.disable();
        // pm.disableRotate();
      });
    }
  };

  useEffect(() => {
    mapRef.current.on('pm:drawstart', () => {
      isDrawingRef.current = true;
      // { workingLayer, shape }
      // workingLayer.options.pane = 'shelfPartition';

      // console.log('lllllllllllll', workingLayer, shape);
    });

    mapRef.current.on('pm:drawend', () => {
      isDrawingRef.current = false;
    });

    mapRef.current.on('pm:create', (e) => {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('dblclick', handleDblClick);
      document.addEventListener('keyup', handleKeyUp);

      console.log(e);
      const currentLayer = e.layer;
      const { shape } = e;

      // mapRef.current.removeLayer(currentLayer);
      currentLayer.remove();

      const floorPaneShapes = floorShapes.includes(shape);
      const shelfPaneShapes = shelfShapes.includes(shape);
      const shelfPartitionPaneShapes = shelfPartitionShapes.includes(shape);

      // console.log('shape', shape);
      // console.log('floorPaneShapes', floorShapes, floorPaneShapes);
      // console.log('shelfPaneShapes', shelfShapes, shelfPaneShapes);
      // console.log('shelfPartitionPaneShapes', shelfPartitionShapes, shelfPartitionPaneShapes);

      if (floorPaneShapes) {
        currentLayer.options.pane = 'floor';
        currentLayer.id = `FL-${uuidv4()}`;
        floorLayers.current = [...floorLayers.current, currentLayer];
      } else if (shelfPaneShapes) {
        currentLayer.options.pane = 'shelf';
        currentLayer.id = `SH-${uuidv4()}`;
        shelfLayers.current = [...shelfLayers.current, currentLayer];
      } else if (shelfPartitionPaneShapes) {
        currentLayer.options.pane = 'shelfPartition';
        currentLayer.id = `SP-${uuidv4()}`;
        shelfPartitionLayers.current = [...shelfPartitionLayers.current, currentLayer];
      }

      // console.log('mari menengok', currentLayer.id);
      // console.log('mari menengok floorLayers', floorLayers.current);
      // console.log('mari menengok shelfLayers', shelfLayers.current);
      // console.log('mari menengok shelfPartitionLayers', shelfPartitionLayers.current);
      currentLayer.addTo(mapRef.current);

      if (shelfPartitionPaneShapes && shelfLayers.current.length > 0) {
        const center = shape.includes('Circle')
          ? currentLayer.getLatLng()
          : currentLayer.getCenter();

        const parentShelf = L.GeometryUtil.closestLayer(
          mapRef.current,
          shelfLayers.current,
          center
        );
        console.log('parentShelf', parentShelf.layer._path);
      }
      initShapeObj(currentLayer, shape);
    });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dblclick', handleDblClick);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const preparePayload = (layer) => {
    const {
      pm: { _shape: shape },
      id,
      pm,
    } = layer;

    const isCircle = shape.includes('Circle');
    const isPolyline = shape.includes('Line');
    // const shelfPartitionPaneShapes = shelfPartitionShapes.includes(shape);

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
      id,
      shape,
      latLngs,
      radius,
      angle: initialAngle,
    };
  };

  /* eslint-disable arrow-body-style */
  const handleSavelayout = (e) => {
    e.preventDefault();

    const _floorLayers = floorLayers.current.map((layer) => preparePayload(layer));
    const _shelfLayers = shelfLayers.current.map((layer) => preparePayload(layer));
    const _shelfPartitionLayers = shelfPartitionLayers.current.map((layer) => {
      return preparePayload(layer);
    });

    saveLayout({ _floorLayers, _shelfLayers, _shelfPartitionLayers });
  };

  return (
    <>
      <div id="map" style={mapStyles} />
      <Button onClick={reCenter} sx={firstBtn} className={classes.refreshButton}>
        <CenterFocusStrongIcon sx={{ color: 'black' }} />
      </Button>
      <Button onClick={toogleFloorLock} sx={lastBtn} className={classes.floorLockButton}>
        <LockRoundedIcon sx={{ color: 'black' }} />
      </Button>
      <Button onClick={bringToFront} sx={firstBtn} className={classes.bringToFrontButton}>
        <FlipToFrontRoundedIcon sx={{ color: 'black' }} />
      </Button>
      <Button onClick={bringToBack} sx={lastBtn} className={classes.bringToBackButton}>
        <FlipToBackRoundedIcon sx={{ color: 'black' }} />
      </Button>
      <form id="layout-form" onSubmit={handleSavelayout} style={{ display: 'hidden' }} />
    </>
  );
};

export default Editor;

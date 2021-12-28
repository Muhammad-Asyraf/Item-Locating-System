import React, { useState, useEffect, useRef } from 'react';
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

import LayoutDetailsDialogue from './LayoutDetailsDialogue';

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
  checkeredTileLayer,
} from './utils/mapConfig';

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

/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
const Editor = (props) => {
  const classes = useStyles();
  const storeUUID = localStorage.getItem('storeUUID');

  const mapRef = useRef(null);
  const editedShapesRef = useRef([]);
  const isDrawingRef = useRef(false);
  const floorLockToggle = useRef(false);
  const floorLayers = useRef([]);
  const shelfLayers = useRef([]);
  const shelfPartitionLayers = useRef([]);
  const savedLayers = useRef([]);
  const storeViewport = [50, 50];

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

  const {
    floorPlan,
    previousFloorPlan,
    setFloorIsLocked,
    setZoomLevel,
    saveLayout,
    patchLayout,
    leafletLayers,
    mode,
    open,
    handleClose,
    theLayout,
  } = props;

  const [name, setName] = useState(theLayout ? theLayout.name : '');
  const [label, setLabel] = useState(theLayout ? theLayout.label : '');

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

    if (!layer.pm.rotateEnabled() && !isDrawingRef.current) {
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

  const getnClosestPartitionShelf = (currentLayer) => {
    const {
      pm: { _shape: shape },
    } = currentLayer;

    const center = shape.includes('Circle')
      ? currentLayer.getLatLng()
      : currentLayer.getCenter();

    const nClosestPartitionShelf = L.GeometryUtil.nClosestLayers(
      mapRef.current,
      shelfPartitionLayers.current,
      center,
      10
    );
    console.log('nClosestPartitionShelf', nClosestPartitionShelf);
    return nClosestPartitionShelf;
  };

  const setParentShelf = (currentLayer) => {
    const {
      pm: { _shape: shape },
    } = currentLayer;

    const center = shape.includes('Circle')
      ? currentLayer.getLatLng()
      : currentLayer.getCenter();

    const parentShelf = L.GeometryUtil.closestLayer(
      mapRef.current,
      shelfLayers.current,
      center
    );

    currentLayer.parentShelf = parentShelf.layer.id;
    currentLayer.parentShelfPath = parentShelf.layer._path;

    console.log('currentLayer', currentLayer);
  };

  const initShapeObj = (layer, shape) => {
    const isFloorLayer = floorShapes.includes(shape);
    const isShelfLayer = shelfShapes.includes(shape);
    const isPartitionLayer = shelfPartitionShapes.includes(shape);
    layer._path.isFromRotate = false;

    layer.on('pm:enable', ({ layer: editedLayer }) => {
      if (isFloorLayer) {
        editedLayer.setStyle({ ...floorStyles, dashArray: '10' });
      } else if (isShelfLayer) {
        editedLayer.setStyle({ ...shelfStyles, fillColor: '#d7e75c' });
      } else if (isPartitionLayer) {
        editedLayer.setStyle({ ...shelfPartitionStyles, fillColor: '#d7e75c' });
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
      if (isFloorLayer) {
        disabledLayer.setStyle({ ...floorStyles });
      } else if (isShelfLayer) {
        disabledLayer.setStyle({ ...shelfStyles });
      } else if (isPartitionLayer) {
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

    layer.on('pm:dragend', ({ layer: currentLayer, shape: currentShape }) => {
      if (shelfPartitionShapes.includes(currentShape) && shelfLayers.current.length > 0) {
        setParentShelf(currentLayer);
      } else if (
        shelfShapes.includes(currentShape) &&
        shelfPartitionLayers.current.length > 0
      ) {
        const nClosestPartitionShelf = getnClosestPartitionShelf(currentLayer);
        nClosestPartitionShelf.forEach(({ layer: layer_ }) => setParentShelf(layer_));
      }
    });

    layer.on('pm:rotateend', ({ angle }) => {
      editedShapesRef.current.forEach((currentLayer) => {
        currentLayer.pm.rotateLayerToAngle(angle);
      });
    });

    layer._path.onmousedown = ({ srcElement }) => {
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
      const zoomlevel = mapRef.current.getZoom();
      const adjustedZoomLevel = (zoomlevel - 2).toFixed(1);
      console.log('enter hover', layer);
      console.log('isPartitionLayer', isPartitionLayer);

      if (adjustedZoomLevel >= 0.8 && isPartitionLayer) {
        layer.setStyle({ ...shelfPartitionStyles, fillColor: '#d7e75c' });
      } else if (adjustedZoomLevel < 0.8 && isShelfLayer) {
        layer.setStyle({ ...shelfStyles, fillColor: '#d7e75c' });
      }

      document.addEventListener('mouseup', enableEdit);
    };

    layer._path.onmouseleave = () => {
      document.myParam = layer;
      const zoomlevel = mapRef.current.getZoom();
      const adjustedZoomLevel = (zoomlevel - 2).toFixed(1);
      const currentlyEdit = layer.pm.enabled();

      console.log('edit?', layer.pm.enabled());

      if (adjustedZoomLevel >= 0.8 && isPartitionLayer && !currentlyEdit) {
        layer.setStyle({ ...shelfPartitionStyles });
      } else if (adjustedZoomLevel < 0.8 && isShelfLayer && !currentlyEdit) {
        layer.setStyle({ ...shelfStyles });
      }

      document.removeEventListener('mouseup', enableEdit);
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

  const duplicateShapes = (listToDuplicates) => {
    listToDuplicates.forEach((currentLayer) => {
      const { _shape: shape } = currentLayer.pm;
      const floorPaneShapes = floorShapes.includes(shape);
      const shelfPaneShapes = shelfShapes.includes(shape);
      const shelfPartitionPaneShapes = shelfPartitionShapes.includes(shape);

      let newLayer;

      if (floorPaneShapes) {
        newLayer = drawLayer(shape, 'floor', floorStyles, currentLayer);
        floorLayers.current = [...floorLayers.current, newLayer];
      } else if (shelfPaneShapes) {
        newLayer = drawLayer(shape, 'shelf', shelfStyles, currentLayer);
        shelfLayers.current = [...shelfLayers.current, newLayer];
      } else if (shelfPartitionPaneShapes) {
        newLayer = drawLayer(shape, 'shelfPartition', shelfPartitionStyles, currentLayer);
        shelfPartitionLayers.current = [...shelfPartitionLayers.current, newLayer];
      }

      newLayer.id = uuidv4();
      initShapeObj(newLayer, shape);
    });
  };

  const handleKeyDown = (evt) => {
    const { altKey, ctrlKey, shiftKey, key, repeat } = evt;

    if (repeat) return;

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
      let allLayers;

      if (floorPlan) {
        allLayers = mapRef.current.pm.getGeomanLayers().slice(2);
      } else {
        allLayers = mapRef.current.pm.getGeomanLayers().slice(1);
      }

      allLayers.forEach(({ _path }) => {
        _path.shiftKeyHold = true;
      });
    }

    if (ctrlKey && key === 'd') {
      evt.preventDefault();

      duplicateShapes(editedShapesRef.current);
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
    if (key === 'Alt' && editedShapesRef.current.length > 0) {
      editedShapesRef.current.forEach(({ pm }) => {
        pm.disableRotate();
        pm.enable({
          allowEditing: true,
        });
      });
    }

    if (key === 'Shift') {
      let allLayers;

      if (floorPlan) {
        allLayers = mapRef.current.pm.getGeomanLayers().slice(2);
      } else {
        allLayers = mapRef.current.pm.getGeomanLayers().slice(1);
      }

      allLayers.forEach(({ _path }) => {
        _path.shiftKeyHold = false;
      });
    }
  };

  const handleDblClick = ({ target }) => {
    if (!target.className.baseVal && editedShapesRef.current.length > 0) {
      editedShapesRef.current.forEach(({ _path, pm }) => {
        _path.isFromRotate = false;
        pm.disable();
        // pm.disableRotate();
      });
    }
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

    L.imageOverlay(checkeredTileLayer.path, checkeredTileLayer.bounds, {
      pane: 'tilePane',
    }).addTo(map);

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

  const initGeoman = () => {
    const map = mapRef.current;

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

    map.pm.setGlobalOptions(geomanGlobalOpt);
  };

  const initFloorPlan = () => {
    const map = mapRef.current;

    if (floorPlan) {
      L.imageOverlay(floorPlan.path, floorPlanBounds, { pane: 'floor' }).addTo(map);
    }
    // map.flyTo(storeViewport, 2.8);
  };

  const initDrawLayerStyles = () => {
    const map = mapRef.current;

    map.pm.setPathOptions(floorStyles, {
      ignoreShapes: floorConfig.ignoreShapes,
    });
    map.pm.setPathOptions(shelfStyles, {
      ignoreShapes: shelfConfig.ignoreShapes,
    });
    map.pm.setPathOptions(shelfPartitionStyles, {
      ignoreShapes: shelfPartitionConfig.ignoreShapes,
    });
  };

  const setZoomBehavior = () => {
    const map = mapRef.current;

    map.on('zoomend', () => {
      const zoomlevel = map.getZoom();
      const adjustedZoomLevel = (zoomlevel - 2).toFixed(1);
      setZoomLevel(adjustedZoomLevel);
      console.log('zoomlevel', adjustedZoomLevel);

      if (adjustedZoomLevel >= 0.8) {
        shelfLayers.current.forEach((currentLayer) => {
          currentLayer.setStyle({ ...shelfStyles, weight: 0 });
        });

        shelfPartitionLayers.current.forEach((currentLayer) => {
          L.DomUtil.addClass(currentLayer._path, 'leaflet-interactive');
          currentLayer.setStyle({ ...shelfPartitionStyles });
        });
      } else if (adjustedZoomLevel < 0.8) {
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

  const initLayersEvent = () => {
    mapRef.current.on('pm:drawstart', () => {
      isDrawingRef.current = true;
    });

    mapRef.current.on('pm:drawend', () => {
      isDrawingRef.current = false;
    });

    mapRef.current.on('pm:create', ({ layer: currentLayer, shape }) => {
      const floorPaneShapes = floorShapes.includes(shape);
      const shelfPaneShapes = shelfShapes.includes(shape);
      const shelfPartitionPaneShapes = shelfPartitionShapes.includes(shape);

      currentLayer.remove();

      if (floorPaneShapes) {
        currentLayer.options.pane = 'floor';
        floorLayers.current = [...floorLayers.current, currentLayer];
      } else if (shelfPaneShapes) {
        currentLayer.options.pane = 'shelf';
        shelfLayers.current = [...shelfLayers.current, currentLayer];
      } else if (shelfPartitionPaneShapes) {
        currentLayer.options.pane = 'shelfPartition';
        shelfPartitionLayers.current = [...shelfPartitionLayers.current, currentLayer];
      }

      currentLayer.id = uuidv4();
      currentLayer.addTo(mapRef.current);

      if (shelfPartitionPaneShapes && shelfLayers.current.length > 0) {
        setParentShelf(currentLayer);
      }

      initShapeObj(currentLayer, shape);
    });
  };

  useEffect(() => {
    initMap();
    initCustomPane();
    initFloorPlan();
    initGeoman();
    initDrawLayerStyles();

    if (mode === 'edit') {
      loadLayers(leafletLayers);
    }

    if (savedLayers.current) {
      loadLayers(savedLayers.current);
    }

    setZoomBehavior();
    initLayersEvent();

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dblclick', handleDblClick);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      savedLayers.current = prepareSavedLayers();

      floorLayers.current = [];
      shelfLayers.current = [];
      shelfPartitionLayers.current = [];

      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dblclick', handleDblClick);
      document.removeEventListener('keyup', handleKeyUp);

      mapRef.current.remove();
    };
  }, [floorPlan]);

  /// save logic //////////////////

  const handleSavelayout = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const layers = prepareSavedLayers();

    console.log('layers', layers);

    formData.append('multer_type', 'layout');
    formData.append('name', name);
    formData.append('label', label);
    formData.append('store_uuid', storeUUID);
    formData.append('layers_', JSON.stringify(layers));

    if (floorPlan) {
      formData.append('floorPlanSVG', floorPlan.file, floorPlan.file.name);
    }

    switch (mode) {
      case 'create':
        saveLayout(formData);
        break;
      case 'edit':
        if (previousFloorPlan) {
          formData.append('oldFloorPlanPath', JSON.stringify(previousFloorPlan));
        }
        patchLayout(formData);
        break;
      default:
      // code block
    }
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
      <LayoutDetailsDialogue
        open={open}
        handleClose={handleClose}
        name={name}
        label={label}
        setName={setName}
        setLabel={setLabel}
      />
    </>
  );
};

export default Editor;

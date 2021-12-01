import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

import Button from '@mui/material/Button';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';

import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

import { makeStyles } from '@mui/styles';

// import '../../assets/css/leafletOverride.css';

// Config
const mapConfig = {
  crs: L.CRS.Simple,
  center: [50, 50],
  zoom: 3.5,
  maxZoom: 7,
  minZoom: 3,
  zoomSnap: 0.1,
  attributionControl: false,
  renderer: L.svg({ padding: 100 }),
  doubleClickZoom: false,
};

const geomanConfig = {
  position: 'topright',
  drawCircle: false,
  drawMarker: false,
  drawCircleMarker: false,
  dragMode: false,
  editMode: false,
  rotateMode: false,
  cutPolygon: false,
};

const geomanGlobalOpt = {
  snappable: false,
  finishOn: 'dblclick',
};

// Styling
const mapStyles = {
  overflow: 'hidden',
  width: '77.5vw',
  height: '100vh',
  borderRadius: 10,
  backgroundColor: 'rgba(0,0,0,0)',
  border: '2px solid rgba(0,0,0,0.2)',
  // backgroundColor: 'rgba(0,0,0,0.01)',
  boxShadow:
    'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px',
};

const pathStyles = {
  strokeOpacity: '1',
  color: 'rgba(0,0,0,0.2)',
  // color: 'black',
  fillColor: 'white',
  fillOpacity: 1,
};

const reCenterBtn = {
  padding: '4px',
  height: 38,
  minWidth: 25,
  border: '2px solid rgba(0,0,0,0.2)',
};

const useStyles = makeStyles(() => ({
  refreshButton: {
    position: 'absolute !important',
    top: 300,
    left: 296,
    zIndex: '400 !important',
    backgroundColor: 'white !important',
  },
}));

// Others
// const imageUrl = '/app/public/uploaded_layout/floorPlan.svg';
// const imageUrl = '/app/public/uploaded_layout/layout-1.svg';
// const imageUrl = '/app/public/uploaded_layout/layout-2.svg';
// const imageUrl = '/app/public/uploaded_layout/layout-3.svg';
const imageUrl = '/app/public/uploaded_layout/layout-4.svg';

const imageBounds = [
  [0, 0],
  [100, 100],
];

/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const Map = () => {
  const classes = useStyles();
  const mapRef = useRef(null);
  const editedShapesRef = useRef([]);
  // const [currentlyEditShapes, setCurrentlyEditShapes] = useState([]);

  useEffect(() => {
    mapRef.current = L.map('map', mapConfig);

    L.imageOverlay(imageUrl, imageBounds).addTo(mapRef.current);

    mapRef.current.pm.addControls(geomanConfig);
    mapRef.current.pm.setGlobalOptions(geomanGlobalOpt);
    mapRef.current.pm.setPathOptions(pathStyles);

    // const bounds = [
    //   [54.559322, -5.767822],
    //   [56.1210604, -3.02124],
    // ];
    // // create an orange rectangle
    // L.rectangle(bounds, { color: '#ff7800', weight: 1 }).addTo(mapRef.current);

    return () => {
      mapRef.current.remove();
    };
  }, []);

  const reCenter = () => {
    mapRef.current.flyTo([50, 50], 3.5);
    const test = mapRef.current.pm.getGeomanLayers();
    const test2 = mapRef.current.pm.getGeomanDrawLayers();

    console.log(test);
    console.log(test2);
  };

  const enableDrag = ({ key, repeat, currentTarget }) => {
    if (repeat) return;
    const { myParam: layer } = currentTarget;

    if (layer.pm.enabled() && key === 'z') {
      layer.pm.disable();
    }

    if (key === 'z') {
      layer.pm.enableLayerDrag();
    }
  };

  const disableDrag = ({ key, currentTarget }) => {
    const { myParam: layer } = currentTarget;
    if (key === 'z') {
      layer.pm.disableLayerDrag();
    }
  };

  const initShapeObj = (layer) => {
    layer.on('pm:enable', ({ layer: editedLayer }) => {
      console.log('enabled edit', editedLayer);
      if (!layer.pm.rotateEnabled()) {
        editedShapesRef.current = [...editedShapesRef.current, editedLayer];
      }
    });

    layer.on('pm:disable', () => {
      console.log('disabled', layer._leaflet_id);

      if (!layer.pm.rotateEnabled()) {
        editedShapesRef.current = editedShapesRef.current.filter(
          ({ _leaflet_id }) => layer._leaflet_id !== _leaflet_id
        );
      }
    });

    layer._path.onmouseover = () => {
      // console.log('triggered in');
      document.myParam = layer;
      document.addEventListener('keydown', enableDrag);
      document.addEventListener('keyup', disableDrag);
    };

    layer._path.onmouseleave = () => {
      // console.log('triggered out');
      document.myParam = layer;
      document.removeEventListener('keydown', enableDrag);
      document.removeEventListener('keyup', disableDrag);
    };

    layer._path.onclick = () => {
      layer.pm.toggleEdit();

      if (layer.pm.enabled()) {
        layer.pm.disableLayerDrag();
        layer.pm.disableRotate();
      }
    };
  };

  const handleKeyDown = (e) => {
    const { altKey, ctrlKey, key, repeat } = e;

    if (repeat) return;

    if (ctrlKey && key === 'd') {
      e.preventDefault();
      console.log('’Cmd+/’ was pressed');
    }

    if (altKey && editedShapesRef.current.length > 0) {
      editedShapesRef.current.forEach(({ pm }) => {
        pm.enableRotate();
        pm.disable();
      });
    }
  };

  const handleKeyUp = ({ key }) => {
    if (key === 'Alt' && editedShapesRef.current.length > 0) {
      editedShapesRef.current.forEach(({ pm }) => {
        pm.toggleEdit();
        pm.disableRotate();
      });
    }
  };

  const handleDblClick = ({ target }) => {
    if (!target.className.baseVal && editedShapesRef.current.length > 0) {
      editedShapesRef.current.forEach(({ pm }) => {
        pm.disable();
      });
    }
  };

  useEffect(() => {
    mapRef.current.on('pm:create', (e) => {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
      document.addEventListener('dblclick', handleDblClick);

      console.log(e);
      const currentLayer = e.layer;

      initShapeObj(currentLayer);
      e.layer.pm.toggleEdit();
    });
  }, []);

  return (
    <>
      <div id="map" style={mapStyles} />
      <Button onClick={reCenter} sx={reCenterBtn} className={classes.refreshButton}>
        <CenterFocusStrongIcon sx={{ color: 'black' }} />
      </Button>
    </>
  );
};

export default Map;

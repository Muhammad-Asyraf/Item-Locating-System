import L from 'leaflet';

export const mapComponent = {
  floor: {
    shapes: {
      line: {
        name: 'FloorLine',
        block: 'draw',
        title: "Draw the floor's line",
        className: 'leaflet-line-floor',
      },
      rectangle: {
        name: 'RectangleFloor',
        block: 'draw',
        title: 'Draw a rectangle shape floor',
        className: 'leaflet-rectangle-floor',
      },
      polygon: {
        name: 'PolygonFloor',
        block: 'draw',
        title: 'Free drawing the floor',
        className: 'leaflet-polygon-floor',
      },
    },
    config: {
      styles: {
        strokeOpacity: '1',
        lineJoin: 'round',
        lineCap: 'round',
        weight: 3,
        stroke: true,
        color: 'black',
        // color: 'rgb(210, 210, 210)',
        fillColor: 'transparent',
        // fillOpacity: 1,
        dashArray: '0',
      },
      shapes: ['FloorLine', 'RectangleFloor', 'PolygonFloor'],
      ignoreShapes: [
        'CircleShelf',
        'RectangleShelf',
        'PolygonShelf',
        'CircleShelfPartition',
        'RectangleShelfPartition',
        'PolygonShelfPartition',
      ],
    },
  },
  shelf: {
    shapes: {
      circle: {
        name: 'CircleShelf',
        block: 'edit',
        title: "Draw a circle's shape shelf",
        className: 'leaflet-circle-shelf',
      },
      rectangle: {
        name: 'RectangleShelf',
        block: 'edit',
        title: 'Draw a rectangle shape shelf',
        className: 'leaflet-rectangle-shelf',
      },
      polygon: {
        name: 'PolygonShelf',
        block: 'edit',
        title: 'Draw custom shape shelf',
        className: 'leaflet-polygon-shelf',
      },
    },
    config: {
      styles: {
        strokeOpacity: '1',
        stroke: true,
        color: 'black',
        weight: 2,
        fillColor: '#e84393',
        // fillColor: '#161853',

        fillOpacity: 1,
        lineJoin: 'round',
        lineCap: 'round',
        dashArray: '0',
      },
      shapes: ['CircleShelf', 'RectangleShelf', 'PolygonShelf'],
      ignoreShapes: [
        'FloorLine',
        'RectangleFloor',
        'PolygonFloor',
        'CircleShelfPartition',
        'RectangleShelfPartition',
        'PolygonShelfPartition',
      ],
    },
  },
  shelfPartition: {
    shapes: {
      circle: {
        name: 'CircleShelfPartition',
        block: 'custom',
        title: "Draw a circle's shape shelf partition",
        className: 'leaflet-circle-shelf-partition',
      },
      rectangle: {
        name: 'RectangleShelfPartition',
        block: 'custom',
        title: 'Draw a rectangle shape partition',
        className: 'leaflet-rectangle-shelf-partition',
      },
      polygon: {
        name: 'PolygonShelfPartition',
        block: 'custom',
        title: 'Free drawing the shelf partition',
        className: 'leaflet-polygon-shelf-partition',
      },
    },
    config: {
      styles: {
        strokeOpacity: '1',
        stroke: true,
        color: 'black',
        fillColor: '#6c5ce7',
        weight: 2,
        fillOpacity: 1,
        lineJoin: 'round',
        lineCap: 'round',
        dashArray: '0',
      },
      shapes: ['CircleShelfPartition', 'RectangleShelfPartition', 'PolygonShelfPartition'],
      ignoreShapes: [
        'FloorLine',
        'RectangleFloor',
        'PolygonFloor',
        'CircleShelf',
        'RectangleShelf',
        'PolygonShelf',
      ],
    },
  },
};

// Config

export const mapBounds = [
  [0, 0],
  [100, 100],
];

export const floorPlanBounds = [
  [100, 130],
  [0, -30],
];

export const checkeredTileLayer = {
  path: '/app/public/uploaded_layout/tileLayer.svg',
  bounds: [
    [600, 600],
    [-600, -600],
  ],
};

export const mapDefaultConfig = {
  crs: L.CRS.Simple,
  maxZoom: 7,
  minZoom: 2,
  zoomSnap: 0.1,
  attributionControl: false,
  doubleClickZoom: false,
  boxZoom: false,
  maxBounds: [
    [149, 208],
    [-49, -108],
  ],
};

export const geomanConfig = {
  position: 'topright',
  drawRectangle: false,
  drawPolygon: false,
  drawPolyline: false,
  drawCircle: false,
  drawMarker: false,
  drawCircleMarker: false,
  dragMode: false,
  editMode: false,
  rotateMode: false,
  cutPolygon: false,
  removalMode: false,
};

export const geomanGlobalOpt = {
  snappable: true,
  finishOn: 'dblclick',
  snapDistance: 10,
  templineStyle: {
    color: 'black',
    // color: 'rgba(0,0,0,0.2)',
  },
  hintlineStyle: {
    color: 'black',
    // color: 'rgba(0,0,0,0.2)',
    dashArray: '10',
  },
};

// Styling
export const mapStyles = {
  overflow: 'hidden',
  width: '77.5vw',
  height: '100vh',
  borderRadius: 10,
  // backgroundColor: '#ecf3f4',
  backgroundColor: 'rgba(0,0,0,0)',
  border: '2px solid rgba(0,0,0,0.2)',
  // backgroundSize: '80px 80px',
  // backgroundImage: 'radial-gradient(circle, #000000 1px, rgba(0, 0, 0, 0) 1px)',
  // backgroundImage:
  //   'linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
  //   linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)',
  // backgroundColor: 'rgba(0,0,0,0.01)',
  boxShadow:
    'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px',
};

// export const pathStyles = {
//   strokeOpacity: '1',
//   color: 'rgba(0,0,0,0.2)',
//   fillColor: 'white',
//   fillOpacity: 1,
// };

export const firstBtn = {
  padding: '2px',
  height: 40,
  minWidth: 40,
  border: '2px solid rgba(0,0,0,0.2)',
  borderRadius: '7px 7px 0px 0px !important',
};

export const lastBtn = {
  padding: '2px',
  height: 40,
  minWidth: 40,
  border: '2px solid rgba(0,0,0,0.2)',
  borderRadius: '0px 0px 7px 7px !important',
};

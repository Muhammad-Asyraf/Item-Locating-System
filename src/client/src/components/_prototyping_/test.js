import React, { useRef, useEffect, useState } from 'react';

import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import mapboxgl from '../../services/mapbox';

const useStyles = makeStyles(() => ({
  container: {
    height: 300,
    // outline: '1px solid black !important',
  },
  sidebar: {
    backgroundColor: 'rgba(35, 55, 75, 0.9)',
    color: '#fff',
    padding: '6px 12px',
    fontFamily: 'monospace',
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 12,
    borderRadius: 4,
  },
}));

const StoreLocator = () => {
  const classes = useStyles();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(101.7132);
  const [lat, setLat] = useState(3.1493);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
    });

    /* eslint-disable no-unused-vars */
    const marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([lng, lat])
      .addTo(map.current);
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  // const onDragEnd = () => {
  //   const lngLat = marker.getLngLat();
  //   coordinates.style.display = 'block';
  //   coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
  // };

  // marker.on('dragend', onDragEnd);

  return (
    <Grid item sm={12}>
      <div ref={mapContainer} className={classes.container} />
    </Grid>
  );
};

export default StoreLocator;

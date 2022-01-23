import React, { useState, useRef, useCallback } from 'react';

import MapGL, { Marker } from 'react-map-gl';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import HttpRoundedIcon from '@mui/icons-material/HttpRounded';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '90%',
    padding: 30,
    marginTop: 20,
    marginBottom: theme.spacing(2),
    boxShadow:
      'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px !important',
    borderRadius: '16px !important',
  },
  map: {
    overflow: 'hidden',
    borderRadius: '15px',
    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
  },
  coordinate: {
    position: 'relative',
    top: 10,
    left: 10,
    borderRadius: '8px',
    padding: '8px 12px',
    color: 'white',
    backgroundColor: 'black',
    opacity: 0.7,
    fontSize: '12px',
    width: '220px',
  },
}));

const StoreInfo = (props) => {
  const classes = useStyles();
  const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const { store } = props;

  const [localViewport, setLocalViewport] = useState({ ...store.store_coordinate, zoom: 18 });

  const mapRef = useRef();

  const handleViewportChange = useCallback((newViewport) => {
    setLocalViewport({
      ...newViewport,
    });
  }, []);

  return (
    <Grid
      item
      xs={12}
      md={12}
      container
      justifyContent="center"
      alignItems="center"
      direction="row"
    >
      <Paper className={classes.paper}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <div className={classes.map}>
              <MapGL
                ref={mapRef}
                {...localViewport}
                width="100%"
                height="500px"
                maxZoom={20}
                mapStyle="mapbox://styles/loketla/ckwt0h82z3pvu14mkkjoypl6h"
                onViewportChange={handleViewportChange}
                mapboxApiAccessToken={mapboxToken}
              >
                <Marker
                  latitude={store.store_coordinate.latitude}
                  longitude={store.store_coordinate.longitude}
                  offsetTop={-30}
                  offsetLeft={-20}
                >
                  <LocationOnRoundedIcon
                    sx={{
                      fontSize: 40,
                      position: 'absolute',
                      filter: 'drop-shadow(3px 3px 1px #262626)',
                    }}
                    color="gradient"
                  />
                </Marker>
                <div className={classes.coordinate}>
                  Latitude: {store.store_coordinate.latitude} <br />
                  Longitude: {store.store_coordinate.longitude}
                </div>
              </MapGL>
            </div>
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }} />
          <Grid item xs={4}>
            <h4 style={{ marginBottom: 10, marginTop: 10, marginLeft: 30 }}>
              <StoreRoundedIcon
                sx={{ position: 'relative', top: 5, mr: 1.5 }}
                color="primary"
              />
              Store Name
            </h4>
          </Grid>
          <Grid item xs={8}>
            <p>: &nbsp;&nbsp;{store.store_name}</p>
          </Grid>
          <Grid item xs={4}>
            <h4 style={{ marginBottom: 10, marginTop: 10, marginLeft: 30 }}>
              <BusinessRoundedIcon
                sx={{ position: 'relative', top: 5, mr: 1.5 }}
                color="primary"
              />
              Business Address
            </h4>
          </Grid>
          <Grid item xs={8}>
            <p>: &nbsp;&nbsp;{store.store_address}</p>
          </Grid>
          <Grid item xs={4}>
            <h4 style={{ marginBottom: 10, marginTop: 7, marginLeft: 30 }}>
              <HttpRoundedIcon
                sx={{ position: 'relative', top: 5, mr: 1.5 }}
                fontSize="large"
                color="primary"
              />
              <span style={{ position: 'relative', bottom: 7 }}>Store URL</span>
            </h4>
          </Grid>
          <Grid item xs={8}>
            <p>: &nbsp;&nbsp;{store.store_url}</p>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default StoreInfo;

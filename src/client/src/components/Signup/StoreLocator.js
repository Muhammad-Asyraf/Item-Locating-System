import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MapGL, { Marker } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';

import { makeStyles } from '@mui/styles';

import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';

import { selectLocation } from '../../redux/features/mapBoxSlice';
import getLocation from '../../redux/thunks/mapBoxThunk';

import useFirstRender from '../../hooks/useFirstRender';

const useStyles = makeStyles(() => ({
  map: {
    overflow: 'hidden',
    borderRadius: '15px',
    boxShadow:
      'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
    // boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
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

const StoreLocator = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isFirstRender = useFirstRender();
  const locationData = useSelector(selectLocation);
  const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const mapRef = useRef();
  const { stepsData, setStepsData, updateBusinessFormLocation } = props;
  const [localMarkerCoord, setLocalMarkerCoor] = useState({
    ...stepsData.storeCoordinate,
  });
  const [localViewport, setLocalViewport] = useState({ ...stepsData.viewport });

  useEffect(() => {
    if (!isFirstRender) {
      updateBusinessFormLocation(locationData);
    }
  }, [locationData]);

  const handleViewportChange = useCallback((newViewport) => {
    setLocalViewport({
      ...newViewport,
    });
  }, []);

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 2000 };
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
        zoom: 18,
      });
    },
    [handleViewportChange]
  );

  const closeSearchResult = async () => {
    const button = await document.querySelector('.mapboxgl-ctrl-geocoder--button');
    button.click();
  };

  const forwardGeocode = async (longitude, latitude) => {
    await dispatch(
      getLocation({
        longitude,
        latitude,
        mapboxToken,
      })
    );
  };

  const handleSearch = (e) => {
    const longitude = e.result.center[0];
    const latitude = e.result.center[1];

    setStepsData({
      ...stepsData,
      storeCoordinate: {
        longitude,
        latitude,
      },
      viewport: {
        longitude,
        latitude,
        zoom: 18,
      },
    });

    closeSearchResult();
    forwardGeocode(longitude, latitude);
  };

  const onDragEnd = () => {
    const { longitude, latitude } = localMarkerCoord;

    setStepsData({
      ...stepsData,
      storeCoordinate: {
        longitude,
        latitude,
      },
      viewport: {
        longitude,
        latitude,
        zoom: 18,
      },
    });

    setLocalMarkerCoor({
      longitude,
      latitude,
    });

    forwardGeocode(longitude, latitude);
  };

  const onDrag = (e) => {
    setLocalMarkerCoor({
      longitude: e.lngLat[0],
      latitude: e.lngLat[1],
    });
  };

  return (
    <div className={classes.map}>
      <MapGL
        ref={mapRef}
        {...localViewport}
        width="100%"
        height="500px"
        maxZoom={18}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={mapboxToken}
      >
        <Marker
          latitude={stepsData.storeCoordinate.latitude}
          longitude={stepsData.storeCoordinate.longitude}
          offsetTop={-30}
          offsetLeft={-20}
          draggable
          onDragEnd={onDragEnd}
          onDrag={onDrag}
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
        <Geocoder
          mapRef={mapRef}
          trackProximity
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={mapboxToken}
          position="top-right"
          countries="my"
          marker={false}
          limit={8}
          onResult={handleSearch}
          placeholder="Search your store..."
        />
        <div className={classes.coordinate}>
          Latitude: {localMarkerCoord.latitude} <br />
          Longitude: {localMarkerCoord.longitude}
        </div>
      </MapGL>
    </div>
  );
};

export default StoreLocator;

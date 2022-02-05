// Components
import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import CartDropdown from '../components/navigation/CartDropdown';
import LoadingSheet from '../components/core/LoadingSheet';
import Carousel from 'react-native-snap-carousel';
import RouteDetails from '../components/navigation/RouteDetails';
import EnRouteDetails from '../components/navigation/EnRouteDetails';
import marker from '../assets/icons/location-pin.png';

// Redux
import { useSelector } from 'react-redux';

// Utilities
import MapboxGL from '@react-native-mapbox-gl/maps';
import DirectionsProvider from '@mapbox/mapbox-sdk/services/directions';
import { createBounds, calculateCenterCoordinate } from '../utils/Optimization';
import { getAllCartsForUser } from '../services/LoketlistService';
import { getOptimizedPathForCart } from '../services/OptimizationService';

// Configurations
import { mapboxAPIKey } from '../environment';
import { Theme } from '../styles/Theme';

export default function Navigate({ navigation, route }) {
  // Initialize Mapbox access token
  MapboxGL.setAccessToken(mapboxAPIKey);
  const directionsProvider = DirectionsProvider({ accessToken: mapboxAPIKey });
  const params = route.params ? route.params : {};

  const { width: screenWidth } = Dimensions.get('window');
  const { uuid, position } = useSelector((state) => state.user);
  const [isCartLoading, setCartLoading] = useState(true);
  const [iconLoading, setIconLoading] = useState(true);

  // Populate cart dropdown items
  const [cartList, setCartList] = useState();

  // Track cart dropdown choice
  const [cartID, setCartID] = useState();

  // Total price for cart
  const totalPrice = useRef(null);

  // Store current optimized route
  const [path, setPath] = useState([]);

  // Store current route geometry
  const [geometry, setGeometry] = useState();

  // Camera bounds
  const [bounds, setBounds] = useState();

  // Message field for loading sheet
  const [message, setMessage] = useState();

  /** FLOW STATE
   * -1 -Idle
   * 0-Load cart
   * 1-Load path
   * 2-Path Overview
   * 3-En route
   */
  const [flowState, setFlowState] = useState(0);

  const camera = useRef();

  const [mapboxImages, setMapboxImages] = useState({});

  // Get all user's carts
  const fetchAllCarts = async () => {
    setMessage('Getting your carts');
    setCartLoading(true);

    let res = await getAllCartsForUser(uuid);
    let carts;
    if (res.length != 0) {
      carts = res.map((item) => {
        let label = item.name;
        if (item.is_default) {
          label = 'Your Current Cart';
        }
        return {
          label,
          value: item.uuid,
        };
      });
    }
    setCartList(carts);
    setCartLoading(false);
  };

  const fetchPath = async () => {
    setMessage('Calculating route');

    let directionsRequest = {
      profile: 'driving-traffic',
      geometries: 'geojson',
    };
    let mapboxWaypoints = [];
    let directions;
    let geoJSON = {};

    try {
      let { totalPrice: price, path } = await getOptimizedPathForCart(
        position,
        cartID
      );

      totalPrice.current = price;

      // Set waypoint for Directions API
      mapboxWaypoints = path.map((point) => {
        return {
          coordinates: [point.coordinate[0], point.coordinate[1]],
        };
      });
      directionsRequest.waypoints = mapboxWaypoints;

      setPath(path);
    } catch (error) {
      console.log(`getOptimizedPathForCart Error! :: ${error}`);
    }

    try {
      directions = await directionsProvider
        .getDirections(directionsRequest)
        .send();

      geoJSON = directions.body.routes[0].geometry;
      setBounds(createBounds(geoJSON));
      // console.log(`Bounds: ${JSON.stringify(bounds)}`);
      //console.log(directions.body.waypoints);
    } catch (error) {
      console.log(`getDirections Error! :: ` + error);
    }

    setGeometry(geoJSON);
  };

  useEffect(() => {
    console.log(`Position: ${position}`);

    // if ('cart_uuid' in params && params?.cart_uuid != '') {
    //   setCartID(params.cart_uuid);
    //   setFlowState(1);
    // }

    if (flowState == 0) {
      if (camera.current != null) {
        camera.current.setCamera({
          centerCoordinate: position,
          animationDuration: 1000,
          zoomLevel: 16,
        });
      }
    }

    if (flowState == 2) {
      // console.log(`Bounds: ${JSON.stringify(bounds)}`);
      focusRoute();
    }
    const run = async () => {
      // Get all user's carts
      if (flowState == 0) {
        await fetchAllCarts();
      }

      if (flowState == 1) {
        await fetchPath();
      }
    };

    run().then(() => {
      if (path.length != 0) {
        setFlowState(2);
        // DEBUG: Ensure route is stored properly
        //console.log(`(Navigate.js)Route: ${JSON.stringify(route)}`);
      } else {
        setFlowState(0);
      }
    });

    if (iconLoading) {
      setMapboxImages({ ...mapboxImages, pin: marker });
      setIconLoading(false);
    }
  }, [flowState]);

  const setCart = (value) => {
    console.log(`${value} selected`);
    setCartID(value);
    setFlowState(1);
  };

  const renderDirections = () => {
    //console.log(JSON.stringify(geometry));
    const style = {
      lineCap: 'round',
      lineJoin: 'round',
      lineColor: Theme.colors.primary,
      lineWidth: 4,
    };

    if (geometry != null) {
      return (
        <MapboxGL.ShapeSource id="routeSource" shape={geometry}>
          <MapboxGL.LineLayer id="routeLines" style={style} />
        </MapboxGL.ShapeSource>
      );
    }
  };

  const renderPoints = () => {
    let storesPoint = path.slice();
    storesPoint.shift();
    storesPoint.pop();

    // Create geoJSON
    let geoJSON = {
      type: 'MultiPoint',
      coordinates: storesPoint.map((value) => {
        return [value.coordinate[0], value.coordinate[1]];
      }),
    };

    //console.log(JSON.stringify(geoJSON));

    const style = {
      icon: {
        iconImage: 'pin',
        iconSize: 0.3,
        iconAnchor: 'bottom',
      },
    };
    return (
      <MapboxGL.ShapeSource id="pointSource" shape={geoJSON}>
        <MapboxGL.SymbolLayer
          id="storePoint"
          aboveLayerID="routeLines"
          style={style.icon}
        />
      </MapboxGL.ShapeSource>
    );
  };

  const renderCarousel = ({ item, index }) => {
    if (index == 0) {
      return <RouteDetails routeDetails={item} total={totalPrice.current} />;
    } else {
      return (
        <EnRouteDetails
          store={{ ...item, totalStops: path.length - 2, key: index, cartID }}
        />
      );
    }
  };

  const getData = () => {
    let storesDetails = path.slice();
    storesDetails.shift();
    storesDetails.pop();
    return [path, ...storesDetails];
  };

  const focusStoreMarker = (slideIndex) => {
    if (slideIndex == 0) {
      focusRoute();
    } else {
      camera.current.setCamera({
        centerCoordinate: path[slideIndex].coordinate,
        zoomLevel: 17,
        animationDuration: 1000,
      });
    }
  };

  const focusRoute = () => {
    //console.log(`Bounds: ${JSON.stringify(bounds)}`);

    calculateCenterCoordinate([bounds.ne, bounds.sw])
      .then((center) => {
        //console.log(`Center point: ${JSON.stringify(center)}`);
        if (camera.current != null) {
          camera.current.setCamera({
            centerCoordinate: center,
            animationDuration: 1000,
            zoomLevel: 14,
            padding: 48,
          });
        }
      })
      .catch((error) => {
        console.log(`calculateCenterCoordinate() call error`);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      {/* Cart Dropdown */}
      {!isCartLoading ? (
        <CartDropdown
          containerStyle={styles.dropdownContainer}
          list={cartList}
          value={cartID}
          setValue={setCart}
        />
      ) : (
        <LoadingSheet text={message} style={styles.bottomSheets} />
      )}

      {flowState == 1 && (
        <LoadingSheet text={message} style={styles.bottomSheets} />
      )}
      {flowState == 2 && path != null && (
        <Carousel
          containerCustomStyle={styles.carousel}
          contentContainerCustomStyle={styles.carouselContent}
          data={getData()}
          renderItem={renderCarousel}
          sliderWidth={screenWidth}
          itemWidth={screenWidth - 44}
          onSnapToItem={focusStoreMarker}
        />
      )}

      <MapboxGL.MapView style={{ flexGrow: 1 }}>
        <MapboxGL.UserLocation />
        <MapboxGL.Camera
          ref={camera}
          zoomLevel={16}
          animationMode="flyTo"
          animationDuration={1000}
          centerCoordinate={position}
        />

        <MapboxGL.Images images={mapboxImages} />

        {renderDirections()}
        {renderPoints()}
      </MapboxGL.MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 16,
    right: 0,
    left: 0,
    marginTop: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  bottomSheets: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    marginBottom: 16,
  },
  carouselContent: {
    alignItems: 'flex-end',
  },
});

// Components
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import CartDropdown from '../components/navigation/CartDropdown';
import LoadingSheet from '../components/core/LoadingSheet';
import RouteDetails from '../components/navigation/RouteDetails';
import EnRouteDetails from '../components/navigation/EnRouteDetails';

// Utilities
import MapboxGL from '@react-native-mapbox-gl/maps';
import { getLocation } from '../utils/Geolocation';
import { getStatusBarHeight } from 'react-native-status-bar-height';

// Configurations
import { mapboxAPIKey } from '../environment';

export default function Navigate({ navigation }) {
  // Initialize Mapbox access token
  MapboxGL.setAccessToken(mapboxAPIKey);

  const [cartList, setCartList] = useState([
    {
      label: 'Cart 1',
      value: 'cart1',
    },
    {
      label: 'Cart 2',
      value: 'cart2',
    },
  ]);
  const [coordinate, setCoordinate] = useState(null);
  const [cartID, setCartID] = useState(cartList[0].label);
  const [route, setRoute] = useState();

  /** FLOW STATE
   * 0-Choose cart
   * 1-Load path
   * 2-Path Overview
   * 3-En route
   */
  const [flowState, setFlowState] = useState(0);

  useEffect(() => {
    if (true) {
      setCoordinate(getLocation());
      console.log('Position : ' + coordinate);
    }
  }, []);

  const setCart = (value) => {
    setCartID(value);
    setFlowState(1);
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
      <CartDropdown
        containerStyle={styles.dropdownContainer}
        list={cartList}
        value={cartID}
        setValue={setCart}
      />

      {flowState == 1 && (
        <LoadingSheet text={'Calculating route'} style={styles.bottomSheets} />
      )}
      {flowState == 2 && <RouteDetails style={styles.bottomSheets} />}
      {flowState == 3 && <EnRouteDetails style={styles.bottomSheets} />}

      <MapboxGL.MapView style={{ flexGrow: 1 }}>
        <MapboxGL.UserLocation />
        {coordinate !== null ? (
          <MapboxGL.Camera zoomLevel={17} followUserLocation={true} />
        ) : null}
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
});

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RouteStoreItem from './RouteStoreItem';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import openMap from 'react-native-open-maps';
import { useNavigation } from '@react-navigation/native';

import { Theme, TextStyle } from '../../styles/Theme';

export default function EnRouteDetails({ style, currentRoute }) {
  /**
   * currentRoute object: {currentStop, totalStops, storeID, storeName, price, distance, itemCount, lat, lng}
   */
  //const [isExpanded, setExpanded] = useState(false);
  const [currentStop, setCurrentStop] = useState(0);
  const [totalStops, setTotalStops] = useState(0);
  const [price, setPrice] = useState(0);
  const [storeID, setStoreID] = useState('STORE_ID');
  const [storeName, setStoreName] = useState('STORE_NAME');
  const [distance, setDistance] = useState('DISTANCE');
  const [itemCount, setItemCount] = useState('ITEM_COUNT');
  const navigation = useNavigation();

  const openMaps = () => {
    openMap({
      provider: 'google',
      latitude: 3.3269192256373805,
      longitude: 101.54644046731136,
    });
  };

  const openFloorMap = () => {
    navigation
      .dangerouslyGetParent()
      .navigate('Floor Plan', { storeID: 'test' });
  };

  return (
    <View style={styles.container} {...style}>
      <View style={styles.routeContentContainer}>
        <Text style={[TextStyle.overline1, styles.overlineText]}>
          {`En Route \u00B7 ${currentStop} / ${totalStops} stops`}
        </Text>
        <Text style={[TextStyle.headline6, styles.containerTitle]}>
          {storeName}
        </Text>
        <View style={styles.storeDetailContainer}>
          <View style={styles.storeDetailItem}>
            <Icon2
              name={'map-marker-distance'}
              size={16}
              color={Theme.colors.placeholder}
            />
            <Text style={[TextStyle.caption, styles.text, styles.detailText]}>
              {distance}
            </Text>
          </View>
          <View style={styles.storeDetailItem}>
            <Icon1
              name={'shopping-cart'}
              size={16}
              color={Theme.colors.placeholder}
            />
            <Text style={[TextStyle.caption, styles.text, styles.detailText]}>
              {itemCount}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="outlined" onPress={openMaps}>
          Open Maps
        </Button>
        <Button mode="contained" onPress={openFloorMap}>
          View Floor Plan
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.roundness,
    backgroundColor: Theme.colors.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    padding: 16,

    elevation: 2,
  },
  containerTitle: {
    textAlign: 'center',
    marginVertical: 8,
  },
  routeContentContainer: {
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeStartText: {
    marginStart: 8,
    color: 'white',
  },
  overlineText: {
    textAlign: 'center',
    color: Theme.colors.primary,
    textTransform: 'uppercase',
  },
  storeDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  storeDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: 4,
  },
  text: {
    textAlign: 'left',
    marginHorizontal: 8,
  },
  detailText: {
    color: Theme.colors.placeholder,
  },
});

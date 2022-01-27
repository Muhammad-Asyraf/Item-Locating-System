import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import { useSelector } from 'react-redux';

// Utilities
import openMap from 'react-native-open-maps';
import { useNavigation } from '@react-navigation/native';
import * as turf from '@turf/turf';
import { getCartById } from '../../services/LoketlistService';

import { Theme, TextStyle } from '../../styles/Theme';

export default function EnRouteDetails({ style, store }) {
  /**
   * store object: {key(currentStop), totalStops, uuid, name, price, distance, itemCount, coordinates, cartID}
   */
  //const [isExpanded, setExpanded] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [storeDetail, setStoreDetail] = useState(store);
  const navigation = useNavigation();
  const { position } = useSelector((state) => state.user);

  const openMaps = () => {
    openMap({
      provider: 'google',
      latitude: storeDetail.coordinate[1],
      longitude: storeDetail.coordinate[0],
    });
  };

  const openFloorMap = () => {
    navigation.dangerouslyGetParent().navigate('Floor Plan', {
      store: {
        uuid: storeDetail.uuid,
      },
      cart: {
        uuid: storeDetail.cartID,
      },
    });
  };

  const load = () => {
    //console.log(`storeDetail: ${JSON.stringify(store)}`);
    console.log(
      `[EnRouteDetails.js/load] Store :${JSON.stringify(storeDetail)}`
    );
    const coordinates = storeDetail.coordinate;
    const storePoint = turf.point([coordinates[0], coordinates[1]]);
    const userPoint = turf.point([position[0], position[1]]);

    getCartById(storeDetail.cartID, storeDetail.uuid).then((data) => {
      setStoreDetail({
        ...storeDetail,
        distance: turf.distance(userPoint, storePoint),
        itemCount: data.products.length,
      });

      setLoading(false);
    });
  };

  useEffect(() => {
    if (isLoading) {
      load();
    }
  }, [isLoading]);

  return (
    <View style={styles.container} {...style}>
      <View style={styles.routeContentContainer}>
        <Text style={[TextStyle.overline1, styles.overlineText]}>
          {`En Route \u00B7 ${storeDetail.key} / ${storeDetail.totalStops} stops`}
        </Text>
        <Text style={[TextStyle.headline6, styles.containerTitle]}>
          {storeDetail.name}
        </Text>
        <View style={styles.storeDetailContainer}>
          <View style={styles.storeDetailItem}>
            <Icon2
              name={'map-marker-distance'}
              size={16}
              color={Theme.colors.placeholder}
            />
            <Text style={[TextStyle.caption, styles.text, styles.detailText]}>
              {`${parseFloat(storeDetail.distance).toFixed(2)} km`}
            </Text>
          </View>
          <View style={styles.storeDetailItem}>
            <Icon1
              name={'shopping-cart'}
              size={16}
              color={Theme.colors.placeholder}
            />
            <Text style={[TextStyle.caption, styles.text, styles.detailText]}>
              {storeDetail.itemCount}
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
    backgroundColor: 'white',
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

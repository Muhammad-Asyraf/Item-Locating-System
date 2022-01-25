import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import openMap from 'react-native-open-maps';
import { useNavigation } from '@react-navigation/native';

import { Theme, TextStyle } from '../../styles/Theme';

export default function EnRouteDetails({ style, store }) {
  /**
   * store object: {key(currentStop), totalStops, uuid, name, price, distance, itemCount, coordinates, cartID}
   */
  //const [isExpanded, setExpanded] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [storeDetail, setStoreDetail] = useState(store);
  const navigation = useNavigation();

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

    setLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      load();
    }
  });

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
              {storeDetail.distance}
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

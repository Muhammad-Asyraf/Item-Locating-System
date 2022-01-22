import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, TouchableRipple, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Redux
import { useSelector } from 'react-redux';

// Utilities
import { useNavigation } from '@react-navigation/native';
import * as turf from '@turf/turf';

// Styling
import { Theme, TextStyle } from '../../styles/Theme';

/**
 *
 * @param {store} Store Object
 * @returns
 */
export default function StoreCard({ store }) {
  const [isLoading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { position } = useSelector((state) => state.user);
  const [images, setImages] = useState([
    'https://tinyurl.com/27wk7pdz',
    'https://tinyurl.com/2s37dtph',
  ]);
  const [storeDistance, setStoreDistance] = useState();

  useEffect(() => {
    //TODO: Get the distance of the store
    if (isLoading) {
      const coordinates = store.store_coordinate;
      const storePoint = turf.point([
        coordinates.longitude,
        coordinates.latitude,
      ]);
      const userPoint = turf.point([position[0], position[1]]);
      console.log(
        `[StoreCard.js/useEffect] Coordinates: ${JSON.stringify(coordinates)}`
      );

      const distance = turf.distance(userPoint, storePoint);

      setStoreDistance(`${distance.toFixed(2)} km away`);
      setLoading(false);
    }
  }, [isLoading]);

  const openStoreCatalog = () => {
    navigation.navigate('Store', { store });
  };

  return (
    <Surface style={styles.container}>
      <TouchableRipple
        onPress={openStoreCatalog}
        style={StyleSheet.absoluteFill}
      >
        {isLoading ? (
          <View></View>
        ) : (
          <View style={[StyleSheet.absoluteFill, styles.contentContainer]}>
            <Image source={{ uri: images[1] }} style={[styles.storeImage]} />
            <View style={styles.storeDetailsContainer}>
              <Text
                style={[TextStyle.caption, styles.storeNameText]}
                numberOfLines={2}
              >
                {store.store_name}
              </Text>
              <View style={styles.storeDetail}>
                <Icon
                  name={'map-marker-distance'}
                  size={16}
                  color={Theme.colors.placeholder}
                />
                <Text style={[TextStyle.caption, styles.distanceText]}>
                  {storeDistance}
                </Text>
              </View>
            </View>
          </View>
        )}
      </TouchableRipple>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 128,
    width: 280,
    borderRadius: Theme.roundness,
    marginEnd: 16,
    marginVertical: 4,
    elevation: 1,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  storeImage: {
    borderTopLeftRadius: Theme.roundness,
    borderBottomLeftRadius: Theme.roundness,
    width: 128,
    height: 128,
  },
  storeDetailsContainer: {
    flexDirection: 'column',
    flexShrink: 1,
    justifyContent: 'flex-end',
    padding: 12,
  },
  storeDetail: {
    flexDirection: 'row',
    flexShrink: 1,
  },
  storeNameText: {
    marginBottom: 18,
  },
  distanceText: {
    marginStart: 8,
    color: Theme.colors.placeholder,
  },
});

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RouteStoreItem from './RouteStoreItem';

import { Theme, TextStyle } from '../../styles/Theme';

export default function RouteDetails({ style }) {
  const [isExpanded, setExpanded] = useState(false);
  const [noOfStops, setNoOfStops] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [storeList, setStoreList] = useState();

  if (isExpanded) {
    return (
      <View style={styles.container} {...style}>
        <View style={styles.routeContentContainer}>
          <Text style={[TextStyle.overline1, styles.overlineText]}>
            {'3 STOPS \u00B7 RM300.00 in total'}
          </Text>
          <Text style={[TextStyle.headline5, styles.containerTitle]}>
            Your Route Details
          </Text>
          <RouteStoreItem />
          <RouteStoreItem />
        </View>
        <View style={styles.routeStartContainer}>
          <Icon name="gesture-swipe-left" size={20} color="white" />
          <Text style={[TextStyle.subhead2, styles.routeStartText]}>
            Swipe left to start your journey
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container} {...style}>
      <View style={styles.routeContentContainer}>
        <Text style={[TextStyle.overline1, styles.overlineText]}>
          {'3 STOPS \u00B7 RM300.00 in total'}
        </Text>
        <Text style={[TextStyle.headline5, styles.containerTitle]}>
          Your Route Details
        </Text>
        <RouteStoreItem />
        <RouteStoreItem />
      </View>
      <View style={styles.routeStartContainer}>
        <Icon name="gesture-swipe-left" size={20} color="white" />
        <Text style={[TextStyle.subhead2, styles.routeStartText]}>
          Swipe left to start your journey
        </Text>
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

    elevation: 2,
  },
  containerTitle: {
    marginTop: 6,
    marginBottom: 8,
  },
  routeContentContainer: {
    padding: 16,
  },
  routeStartContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: Theme.roundness,
    borderBottomRightRadius: Theme.roundness,
    backgroundColor: Theme.colors.primary,
  },
  routeStartText: {
    marginStart: 8,
    color: 'white',
  },
  overlineText: {
    color: Theme.colors.primary,
    textTransform: 'uppercase',
  },
});

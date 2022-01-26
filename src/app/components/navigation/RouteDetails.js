import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RouteStoreItem from './RouteStoreItem';

import { Theme, TextStyle } from '../../styles/Theme';

/**
 *
 * @param {Array} storesInfo : Contains all of the route's info
 * @returns
 */
export default function RouteDetails({ routeDetails, total, style }) {
  /**
   * routeDetails array : [{storeUUID,storeName,totalPrice}]
   */
  const [isLoading, setLoading] = useState(true);
  const [isExpanded, setExpanded] = useState(false);
  const totalPrice = useRef(0);
  const [storeList, setStoreList] = useState();

  const load = () => {
    let stores = routeDetails.slice();
    stores.pop();
    stores.shift();

    setStoreList(stores);
    setLoading(false);
  };

  useEffect(() => {
    //console.log(`Route Details: ${JSON.stringify(routeDetails)}`);
    if (isLoading) {
      load();
    }
  }, [isLoading]);

  // IMPLEMENT
  // if (isExpanded) {
  //   return (
  //     <View style={styles.container} {...style}>
  //       <View style={styles.routeContentContainer}>
  //         <Text style={[TextStyle.overline1, styles.overlineText]}>
  //           {`${noOfStops} STORE(S) \u00B7 ${totalPrice} in total`}
  //         </Text>
  //         <Text style={[TextStyle.headline5, styles.containerTitle]}>
  //           Your Route Details
  //         </Text>
  //         {/* ScrollList here */}
  //       </View>
  //       <View style={styles.routeStartContainer}>
  //         <Icon name="gesture-swipe-left" size={20} color="white" />
  //         <Text style={[TextStyle.subhead2, styles.routeStartText]}>
  //           Swipe left to start your journey
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container} {...style}>
      <View style={styles.routeContentContainer}>
        <Text style={[TextStyle.overline1, styles.overlineText]}>
          {`${routeDetails.length - 2} STORE(S) \u00B7 RM${total} in total`}
        </Text>
        <Text style={[TextStyle.headline5, styles.containerTitle]}>
          Your Route Details
        </Text>
        {/* ScrollList here */}
        <FlatList
          data={storeList}
          renderItem={({ item }) => {
            return <RouteStoreItem storeDetail={{ name: item.name }} />;
          }}
        />
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
    backgroundColor: 'white',
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

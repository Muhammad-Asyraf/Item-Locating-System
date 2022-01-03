import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import SmallTextChip from '../core/SmallTextChip';

import { Theme, TextStyle } from '../../styles/Theme';

export default function RouteStoreItem({ expand = false, storeDetail }) {
  /**
   * storeDetail object: {name, price, distance, itemCount}
   */
  const [isExpanded, setExpanded] = useState(expand);
  const [store, setStore] = useState(storeDetail);

  return (
    <View style={styles.container}>
      <View style={styles.storeContainer}>
        <View style={styles.storeNameContainer}>
          <Icon1 name={'location-pin'} size={20} color={Theme.colors.primary} />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[TextStyle.subhead2, styles.text]}
          >
            {store.name}
          </Text>
        </View>
        {store.price != undefined && (
          <SmallTextChip fill={true} text={'RM' + store.price} />
        )}
      </View>
      {expand && (
        <View style={styles.storeDetailContainer}>
          <View style={styles.storeDetailItem}>
            <Icon2
              name={'map-marker-distance'}
              size={16}
              color={Theme.colors.placeholder}
            />
            <Text style={[TextStyle.caption, styles.text, styles.detailText]}>
              Detail#1
            </Text>
          </View>
          <View style={styles.storeDetailItem}>
            <Icon1
              name={'shopping-cart'}
              size={16}
              color={Theme.colors.placeholder}
            />
            <Text style={[TextStyle.caption, styles.text, styles.detailText]}>
              Detail#2
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  storeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storeNameContainer: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginStart: 28,
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

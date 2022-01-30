// Components
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import SmallTextChip from './core/SmallTextChip';

// Styling
import { Theme, TextStyle } from '../styles/Theme';

export default function CartHeader({ discount, price }) {
  return (
    <View style={styles.container}>
      {/* <View style={styles.textContainer}>
        <Text style={[TextStyle.subhead2, styles.titleText]}>
          Total discounts applied
        </Text>
        <Text style={[TextStyle.caption, styles.discountText]}>{discount}</Text>
      </View> */}
      <View style={styles.textContainer}>
        <Text style={[TextStyle.subhead2, styles.titleText]}>
          Estimated total price
        </Text>
        <SmallTextChip text={price} size={12} marginEnd={false} />
      </View>
    </View>
  );
}

// Dedicated styling
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    // backgroundColor: 'transpa',
    // zIndex: 1,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,

    // elevation: 3,
  },
  textContainer: {
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: '#707070',
  },
  discountText: {
    color: Theme.colors.primary,
  },
});

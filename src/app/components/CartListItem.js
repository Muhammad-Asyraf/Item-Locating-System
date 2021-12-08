// Components
import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button, TextInput, Surface } from 'react-native-paper';
import NumericInput from 'react-native-numeric-input';
import SmallTextChip from './core/SmallTextChip';
import LocationText from './LocationText';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { changeItemQuantity } from '../redux/cart/cartSlice';

// Styling
import { Theme } from '../styles/Theme';

export default function CartListItem({ style, item, update }) {
  const dispatch = useDispatch();
  const [itemDetails, setItemDetails] = useState(item);

  const handleQuantityChange = (value) => {
    dispatch(
      changeItemQuantity({
        cart_uuid: item.cart_uuid,
        product_uuid: item.product_uuid,
        quantity: value,
      })
    );
    setItemDetails({
      ...itemDetails,
      quantity: value,
    });
  };

  return (
    <Surface style={[style, { borderRadius: 5, elevation: 2 }]}>
      <View style={styles.listItemContainer}>
        <Image
          style={styles.itemImage}
          source={{ uri: itemDetails.imageUrl }}
        ></Image>
        <View style={styles.itemDetailsContainer}>
          <LocationText
            text={'General Store'}
            size={10}
            color="#707070"
            style={[styles.itemLocation, { flexDirection: 'row-reverse' }]}
          />
          <View style={styles.horizontalContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>
              {'RM' + itemDetails.selling_price + '/pc'}
            </Text>
          </View>
          <View style={styles.horizontalContainer}>
            <NumericInput
              initValue={itemDetails.quantity}
              minValue={0}
              totalHeight={30}
              onChange={handleQuantityChange}
            />
            <SmallTextChip
              text={'RM' + itemDetails.quantity * itemDetails.selling_price}
            />
          </View>
        </View>
      </View>
    </Surface>
  );
}

// Dedicated styling
const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    flexGrow: 1,
    marginTop: 12,
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  itemImage: {
    height: undefined,
    width: undefined,
    aspectRatio: 1,
  },
  itemDetailsContainer: {
    padding: 8,
    flexGrow: 1,
  },
  itemLocation: {
    marginBottom: 12,
  },
  itemName: {
    fontSize: 12,
    fontFamily: 'interSemiBold',
  },
  itemPrice: {
    fontSize: 12,
    fontFamily: 'interSemiBold',
    color: Theme.colors.primary,
  },
  itemQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  itemQuantityButton: {},
  itemQuantityInput: {
    height: 24,
    width: 40,
    textAlign: 'center',
    fontSize: 12,
    padding: 0,
  },
});

// Components
import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button, TextInput, Surface } from 'react-native-paper';
import NumericInput from 'react-native-numeric-input';
import LocationText from './LocationText';
import { renderChips } from './products/Extra';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { changeItemQuantity } from '../redux/cart/cartSlice';

// Styling
import { Theme, TextStyle } from '../styles/Theme';

export default function CartListItem({ containerStyle = {}, product, update }) {
  const dispatch = useDispatch();
  const [itemDetails, setItemDetails] = useState(product);

  const handleQuantityChange = (value) => {
    dispatch(
      changeItemQuantity({
        cart_uuid: product.cart_uuid,
        product_uuid: product.product_uuid,
        quantity: value,
      })
    );
    setItemDetails({
      ...itemDetails,
      quantity: value,
    });
  };

  // TODO : Update fields
  return (
    <View style={[styles.productContainer, containerStyle]}>
      <Image
        source={{ uri: 'https://via.placeholder.com/96' }}
        style={styles.productImage}
      />
      <View style={styles.productDetailsContainer}>
        <Text style={[TextStyle.body2, styles.text]} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={[TextStyle.subhead2, styles.text]} numberOfLines={2}>
          {`RM${product.retail_price}`}
        </Text>
        <View>{renderChips(product.stock_status)}</View>
      </View>
    </View>
  );
}

// Dedicated styling
const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  productImage: {
    width: 96,
    height: 96,
    borderRadius: Theme.roundness,
  },
  productDetailsContainer: {
    marginStart: 12,
    flexShrink: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  text: {
    flexShrink: 1,
  },
});

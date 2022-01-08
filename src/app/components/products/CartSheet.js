import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import NumericInput from 'react-native-numeric-input';

import { useDispatch, useSelector } from 'react-redux';
import { addItemThunk } from '../../redux/cart/cartThunk';

// Styling
import { Theme } from '../../styles/Theme';

export default function CartSheet({ product }) {
  const [addQuantity, setAddQuantity] = useState(1);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleQuantityChange = (value) => {
    setAddQuantity(value);
  };

  const addQuantityToCart = () => {
    console.log(`[CartSheet.js] Add product ${addQuantity} ${product.uuid}`);
    dispatch(
      addItemThunk({
        cart_uuid: user.default_cart_uuid,
        product_uuid: product.uuid,
        quantity: addQuantity,
      })
    );
  };

  return (
    <View style={styles.container}>
      <NumericInput
        containerStyle={styles.input}
        editable={false}
        borderColor="transparent"
        value={addQuantity}
        initValue={addQuantity}
        minValue={1}
        onChange={handleQuantityChange}
        rounded={true}
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={addQuantityToCart}
      >
        Add To Cart
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  input: {
    marginHorizontal: 8,
  },
  button: {
    marginHorizontal: 8,
  },
});

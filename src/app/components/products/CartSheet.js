import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, IconButton, Menu } from 'react-native-paper';
import NumericInput from 'react-native-numeric-input';

// Utilities
import { addItemIntoCart } from '../../services/LoketlistService';

import { useDispatch, useSelector } from 'react-redux';
import { addItemThunk } from '../../redux/cart/cartThunk';

// Styling
import { Theme } from '../../styles/Theme';

export default function CartSheet({ product, loketlists }) {
  const [addQuantity, setAddQuantity] = useState(1);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Menu states
  const [menuVisible, setMenuVisible] = useState(false);

  const showCartMenu = () => setMenuVisible(true);
  const hideCartMenu = () => setMenuVisible(false);

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

  const addQuantityToLoketlist = (uuid) => {
    addItemIntoCart(uuid, product.uuid, addQuantity)
      .then((data) => {
        console.log(
          `[CartSheet.js/addQuantityToLoketlist] Added product ${addQuantity} ${product.uuid}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
    hideCartMenu();
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
      <View style={styles.cartButtonContainer}>
        <Button labelStyle={styles.button} onPress={addQuantityToCart}>
          Add To Cart
        </Button>
        <Menu
          visible={menuVisible}
          anchor={
            <IconButton icon="menu-down" onPress={showCartMenu} color="white" />
          }
          onDismiss={hideCartMenu}
        >
          {loketlists.map((list) => {
            return (
              <Menu.Item
                onPress={() => addQuantityToLoketlist(list.uuid)}
                title={list.name}
              />
            );
          })}
        </Menu>
      </View>
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
    color: 'white',
  },
  cartButtonContainer: {
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.roundness,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
});

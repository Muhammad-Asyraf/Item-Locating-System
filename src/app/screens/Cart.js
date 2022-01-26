// Components
import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Appbar, Title, Divider } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import CartListItem from '../components/CartListItem';
import CartHeader from '../components/CartHeader';
import Loading from '../components/Loading';
import ListSeparator from '../components/core/ListSeparator';

// Utilities
import axios from 'axios';
import { getAuthHeader } from '../services/AuthenticationService';
import { getCartById } from '../services/LoketlistService';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../redux/cart/cartSlice';

// Environment configs
import { environment } from '../environment';

// Styling
import { GlobalStyle, AppbarStyle, TextStyle } from '../styles/Theme';

export default function Cart({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const cart = useSelector((state) => state.cart);
  const { default_cart_uuid } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Create a data list
  const [DATA, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(cart.update);

      const fetchProducts = async () => {
        getCartById(default_cart_uuid).then((data) => {
          let DATA = [];
          for (i = 0; i < cart.products.length; i++) {
            let idx = data.products
              .map((val) => val.uuid)
              .indexOf(cart.products[i]);
            DATA.push({
              key: i,
              cart_uuid: default_cart_uuid,
              product_uuid: cart.products[i],
              ...data.products[idx],
            });
          }

          console.log('Loaded all products into array');

          // Update the totalPrice
          let totalPrice = 0;
          for (i = 0; i < DATA.length; i++) {
            totalPrice += parseFloat(DATA[i].total_price);
          }
          console.log(totalPrice);

          // Update redux states
          dispatch(update(false));

          // Update local states
          setData(DATA);
          setTotalPrice(totalPrice);
          setLoading(false);
        });
      };

      if (isLoading) {
        fetchProducts();
      }
    }, [isLoading, cart.quantity])
  );

  const refreshCart = () => {
    setLoading(true);
  };

  return (
    <View style={GlobalStyle.screenContainer}>
      <Appbar.Header style={[AppbarStyle.transparent, AppbarStyle.padding]}>
        <Title style={[TextStyle.headline5]}>Your cart</Title>
      </Appbar.Header>
      {isLoading ? (
        <Loading />
      ) : cart.products.length === 0 ? (
        <View
          style={[
            GlobalStyle.contentContainer,
            { justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <Text>Your cart is empty!</Text>
        </View>
      ) : (
        <View style={GlobalStyle.contentContainer}>
          <CartHeader price={'RM' + totalPrice} />
          <Divider />
          <FlatList
            contentContainerStyle={styles.sectionListView}
            onRefresh={refreshCart}
            refreshing={isLoading}
            data={DATA}
            renderItem={({ item }) => (
              <CartListItem product={item} containerStyle={styles.listItem} />
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionListView: {
    paddingVertical: 12,
  },
  listSectionContainer: {
    marginVertical: 8,
  },
  listSection: {
    color: '#707070',
    fontSize: 14,
    letterSpacing: 0.1,
    marginHorizontal: 16,
  },
  listItem: {
    marginBottom: 18,
  },
});

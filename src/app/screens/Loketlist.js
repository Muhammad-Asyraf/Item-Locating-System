// Components
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Appbar, Title, Divider } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import LoketlistProduct from '../components/loketlist/LoketlistProduct';
import CartHeader from '../components/CartHeader';
import Loading from '../components/Loading';

// Utilities
import { getCartById } from '../services/LoketlistService';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../redux/cart/cartSlice';

// Styling
import { GlobalStyle, AppbarStyle, TextStyle } from '../styles/Theme';

export default function Loketlist({ navigation, route }) {
  const cart = route.params;
  const [loketlist, setLoketlist] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      getCartById(cart.uuid)
        .then((data) => {
          setLoketlist(data);
          data.products.map((product) =>
            setTotalPrice(totalPrice + parseFloat(product.total_price))
          );
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoading]);

  const refreshCart = () => {
    setTotalPrice(0);
    setLoading(true);
  };

  return (
    <View style={GlobalStyle.screenContainer}>
      <Appbar.Header style={[AppbarStyle.transparent]}>
        {navigation.canGoBack() && (
          <Appbar.BackAction onPress={() => navigation.goBack()} />
        )}
        <Title style={[TextStyle.headline5, GlobalStyle.flexGrow]}>
          {cart.name}
        </Title>
        <Appbar.Action
          style={AppbarStyle.appBarButtons}
          icon="playlist-edit"
          onPress={null}
        />
      </Appbar.Header>
      {isLoading ? (
        <Loading />
      ) : loketlist.products.length === 0 ? (
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
            data={loketlist.products}
            renderItem={({ item }) => (
              <LoketlistProduct
                product={item}
                cartID={cart.uuid}
                containerStyle={styles.listItem}
                load={refreshCart}
              />
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

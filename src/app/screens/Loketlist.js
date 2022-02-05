// Components
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, SectionList } from 'react-native';
import { Appbar, Title, Divider } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import LoketlistProduct from '../components/loketlist/LoketlistProduct';
import CartHeader from '../components/CartHeader';
import Loading from '../components/Loading';
import NavigateButton from '../components/loketlist/NavigateButton';
import { renderSectionHeader } from '../components/loketlist/Extra';

// Utilities
import { getCartById } from '../services/LoketlistService';
import { productsGroupByStores } from '../utils/Utils';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../redux/cart/cartSlice';

// Styling
import { GlobalStyle, AppbarStyle, TextStyle } from '../styles/Theme';

export default function Loketlist({ navigation, route }) {
  const cart = route.params;
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      getCartById(cart.uuid)
        .then((data) => {
          let totalPrice = 0;
          let DATA = [...data.products];

          if (data.products.length > 0) {
            for (i = 0; i < DATA.length; i++) {
              const { promotions } = DATA[i];
              if (promotions.length > 0) {
                let salePrice;
                for (promo of promotions) {
                  if ('sale_price' in promo) {
                    salePrice = promo.sale_price;
                    break;
                  }
                }

                totalPrice += parseFloat(salePrice * DATA[i].quantity);
              } else {
                totalPrice += parseFloat(DATA[i].total_price);
              }
            }
            setTotalPrice(totalPrice.toFixed(2));
            setProducts(productsGroupByStores(data.products));
          }

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
      ) : products.length === 0 ? (
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
          <SectionList
            ListFooterComponent={<NavigateButton cartID={cart.uuid} />}
            contentContainerStyle={styles.sectionListView}
            onRefresh={refreshCart}
            refreshing={isLoading}
            sections={products}
            renderSectionHeader={renderSectionHeader}
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

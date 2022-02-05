// Components
import React, { useState } from 'react';
import { StyleSheet, View, SectionList } from 'react-native';
import {
  Appbar,
  Title,
  Divider,
  Button,
  Dialog,
  Text,
  TextInput,
} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import CartListItem from '../components/CartListItem';
import CartHeader from '../components/CartHeader';
import Loading from '../components/Loading';
import NavigateButton from '../components/loketlist/NavigateButton';
import { renderSectionHeader } from '../components/loketlist/Extra';

// Utilities
import {
  getDefaultCartForUser,
  saveDefaultCartAs,
} from '../services/LoketlistService';
import { productsGroupByStores } from '../utils/Utils';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { update, resetCart } from '../redux/cart/cartSlice';
import { setDefaultCart } from '../redux/user/userSlice';

// Styling
import { GlobalStyle, AppbarStyle, TextStyle } from '../styles/Theme';

export default function Cart({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const cart = useSelector((state) => state.cart);
  const { uuid, default_cart_uuid } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Save dialog states
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [newCartName, setNewCartName] = useState('');

  // Create a data list
  const [DATA, setData] = useState([]);

  const fetchProducts = async () => {
    getDefaultCartForUser(uuid).then((data) => {
      dispatch(setDefaultCart(data.uuid));
      let DATA = [];
      let totalPrice = 0;

      if (data.products.length > 0) {
        for (i = 0; i < cart.products.length; i++) {
          let idx = data.products
            .map((val) => val.uuid)
            .indexOf(cart.products[i]);
          DATA.push({
            key: i,
            cart_uuid: data.uuid,
            product_uuid: cart.products[i],
            ...data.products[idx],
          });
        }

        console.log('Loaded all products into array');

        // Update the totalPrice
        for (i = 0; i < DATA.length; i++) {
          totalPrice += parseFloat(DATA[i].total_price);
        }

        DATA = productsGroupByStores(DATA);
      }

      // Update redux states
      dispatch(update(false));

      // Update local states
      setData(DATA);
      setTotalPrice(totalPrice.toFixed(2));
      setLoading(false);
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(cart.update);

      if (isLoading) {
        fetchProducts();
      }
    }, [isLoading, cart.quantity])
  );

  const refreshCart = () => {
    setLoading(true);
  };

  const showSaveDialog = () => setDialogVisible(true);
  const hideSaveDialog = () => setDialogVisible(false);

  const saveDialog = () => {
    hideSaveDialog();
    if (newCartName == '') {
    } else {
      saveDefaultCartAs(uuid, default_cart_uuid, newCartName)
        .then((data) => {
          console.log(data);
          dispatch(resetCart());
          setData([]);
          setLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <View style={GlobalStyle.screenContainer}>
      <Appbar.Header style={[AppbarStyle.transparent, AppbarStyle.padding]}>
        <Title style={[TextStyle.headline5, GlobalStyle.flexGrow]}>
          Your cart
        </Title>
        <Appbar.Action
          style={AppbarStyle.appBarButtons}
          icon="content-save"
          onPress={showSaveDialog}
        />
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
          <SectionList
            contentContainerStyle={styles.sectionListView}
            ListFooterComponent={<NavigateButton cartID={default_cart_uuid} />}
            onRefresh={refreshCart}
            refreshing={isLoading}
            sections={DATA}
            renderSectionHeader={renderSectionHeader}
            renderItem={({ item }) => (
              <CartListItem product={item} containerStyle={styles.listItem} />
            )}
          />
        </View>
      )}
      <Dialog visible={isDialogVisible} onDismiss={hideSaveDialog}>
        <Dialog.Title>Save cart for future use</Dialog.Title>
        <Dialog.Content>
          <Text>
            From here, you can save this cart for future so you will not have to
            add those products again into a cart.
          </Text>
          <TextInput
            style={styles.dialogTextInput}
            value={newCartName}
            onChangeText={(text) => setNewCartName(text)}
            placeholder="Eg. Kids favourites, Snacks etc.."
            label="List name"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideSaveDialog}>Cancel</Button>
          <Button onPress={saveDialog}>Save</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionListView: {
    paddingVertical: 12,
  },
  sectionHeaderContainer: {
    paddingVertical: 8,
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
  dialogTextInput: {
    marginTop: 12,
  },
});

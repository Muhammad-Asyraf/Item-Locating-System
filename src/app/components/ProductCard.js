// Components
import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NumericInput from 'react-native-numeric-input';
import SmallTextChip from './core/SmallTextChip';
import LocationText from './LocationText';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { addItem, changeItemQuantity, update } from '../redux/cart/cartSlice';

// Styling
import { Theme, TextStyle } from '../styles/Theme';

export default function ProductCard({ style, product }) {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [productInCart, setProductInCart] = useState(false);

  // 0-edit, 1-display
  const [quantityState, setQuantityState] = useState(1);

  const addToCart = () => {
    console.log('Add product #' + product.uuid + ' to cart');
    dispatch(
      addItem({
        cart_uuid: user.default_cart_uuid,
        product_uuid: product.uuid,
        quantity: 1,
      })
    );
    setProductInCart(true);
    setQuantityState(0);
  };

  const handleQuantityChange = (value) => {
    dispatch(
      changeItemQuantity({
        cart_uuid: user.default_cart_uuid,
        product_uuid: product.uuid,
        quantity: value,
      })
    );
    if (value === 0) {
      setProductInCart(false);
    }
  };

  let itemIndex = 0;
  itemIndex = cart.products.indexOf(product.uuid);

  const renderChips = () => {
    // Stock check
    if (product.stock_status == 'In Stock') {
      return (
        <SmallTextChip
          text={product.stock_status}
          fill={true}
          color={Theme.colors.ok}
          style={styles.chip}
        />
      );
    } else if (product.stock_status == 'Low Stock') {
      return (
        <SmallTextChip
          text={product.stock_status}
          fill={true}
          color={Theme.colors.warn}
          style={styles.chip}
        />
      );
    } else {
      return (
        <SmallTextChip
          text={product.stock_status}
          fill={true}
          color={Theme.colors.error}
          style={styles.chip}
        />
      );
    }
    // Promo check
  };

  useEffect(() => {
    let quantityInputTimer;
    if (quantityState == 0) {
      quantityInputTimer = setTimeout(() => setQuantityState(1), 3000);
    }
    if (cart.products.includes(product.uuid)) {
      setProductInCart(true);
    } else {
      setProductInCart(false);
    }
    return () => {
      if (quantityInputTimer != undefined) {
        clearTimeout(quantityInputTimer);
      }
    };
  });

  return (
    <View>
      <View style={styles.cover}>
        <Image
          style={styles.image}
          // TODO: Change uri
          source={{
            uri: 'https://via.placeholder.com/110',
          }}
        />
        <View style={styles.addToCartContainer}>
          {productInCart ? (
            quantityState == 0 ? (
              <NumericInput
                containerStyle={styles.quantityInputContainer}
                inputStyle={styles.quantityInput}
                totalHeight={36}
                totalWidth={72}
                editable={false}
                borderColor={Theme.colors.background}
                initValue={cart.quantity[itemIndex]}
                minValue={0}
                onChange={handleQuantityChange}
                rounded={true}
              />
            ) : (
              quantityState == 1 && (
                <Button
                  style={styles.editQuantityButton}
                  compact={true}
                  onPress={() => setQuantityState(0)}
                >
                  {cart.quantity[itemIndex]}
                </Button>
              )
            )
          ) : (
            <View style={{ alignSelf: 'flex-end' }}>
              <Icon.Button
                style={{}}
                iconStyle={{ marginRight: 0, padding: 2 }}
                name="add-shopping-cart"
                size={16}
                color={Theme.colors.primary}
                backgroundColor={Theme.colors.background}
                borderRadius={1000}
                onPress={addToCart}
              ></Icon.Button>
            </View>
          )}
        </View>
      </View>

      <View style={styles.content}>
        {renderChips()}
        <Text style={[TextStyle.body2, styles.productName]} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={[TextStyle.subhead2, styles.sellingPriceText]}>
          {'RM' + product.retail_price}
        </Text>
        <LocationText
          style={{ alignSelf: 'flex-start', marginTop: 4 }}
          text={product.stores.store_name}
          color="#707070"
        />
      </View>
    </View>
  );
}

// Dedicated styling
const styles = StyleSheet.create({
  cover: {},
  content: {
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  itemContainer: {
    flexDirection: 'column',
  },
  horizontalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginVertical: 4,
  },
  image: {
    height: undefined,
    width: undefined,
    borderRadius: Theme.roundness,
    aspectRatio: 1,
  },
  chip: {
    marginBottom: 8,
  },
  productName: {
    height: 40,
  },
  text: {
    fontSize: 12,
    color: '#707070',
  },
  sellingPriceText: {
    color: Theme.colors.primary,
    marginVertical: 4,
  },
  addToCartContainer: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    left: 0,
    bottom: 0,
    paddingBottom: 8,
    paddingEnd: 8,
  },
  quantityInputContainer: {
    alignSelf: 'flex-end',
  },
  quantityInput: {
    backgroundColor: Theme.colors.background,
  },
  editQuantityButton: {
    fontSize: 16,
    alignSelf: 'flex-end',
    backgroundColor: Theme.colors.background,
    padding: 2,
    borderRadius: 1000,
  },
});

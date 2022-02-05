// Components
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NumericInput from 'react-native-numeric-input';
import SmallTextChip from '../core/SmallTextChip';
import LocationText from '../LocationText';
import { renderChips } from './Extra';

// Utilities
import { calculateDistance } from '../../utils/Geolocation';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { changeItemQuantity, update } from '../../redux/cart/cartSlice';
import { addItemThunk } from '../../redux/cart/cartThunk';

// Styling
import { Theme, TextStyle } from '../../styles/Theme';

export default function ProductCard({ style, product, withStoreName = true }) {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  // Product metadata
  const [promotions, setPromotions] = useState([]);
  const [onSale, setOnSale] = useState(false);
  const salePrice = useRef(0);
  const [hasBxGy, setHasBxGy] = useState(false);

  const [productInCart, setProductInCart] = useState(false);

  // 0-edit, 1-display
  const [quantityState, setQuantityState] = useState(1);

  const addToCart = () => {
    console.log('Add product #' + product.uuid + ' to cart');
    dispatch(
      addItemThunk({
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

  useEffect(() => {
    if (isLoading) {
      // console.log(
      //   `[ProductCard.js/useEffect] Product : ${JSON.stringify(product)}`
      // );
      // Identify if there is a promotion
      if (product?.promotions.length > 0) {
        setPromotions(product.promotions);
        for (promo of product.promotions) {
          if (
            promo.promotion_type == 'Basic' ||
            promo.promotion_type == 'Bundle'
          ) {
            setOnSale(true);
            salePrice.current = parseFloat(promo.sale_price).toFixed(2);
          }
        }
      }
      setLoading(false);
    }
  }, [isLoading]);

  const openProductDetails = () => {
    // console.log(`[ProductCard.js] Open product ${product.uuid} details`);
    navigation.navigate('Product Page', { product });
  };

  return (
    <TouchableOpacity onPress={openProductDetails} style={{ ...style }}>
      <View style={styles.cover}>
        <Image
          style={styles.image}
          source={{
            uri:
              product?.images > 0
                ? product.images[0].path
                : 'https://via.placeholder.com/400',
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
        <View style={styles.promoContainer}>
          {renderChips(product.stock_status)}
          {promotions.map((promotion) => {
            return (
              <SmallTextChip
                size={9}
                text={promotion.display_name}
                style={styles.chip}
              />
            );
          })}
        </View>
        <View style={styles.pricingContainer}>
          <Text style={[TextStyle.subhead2, styles.sellingPriceText]}>
            {onSale ? `RM${salePrice.current}` : `RM${product.retail_price}`}
          </Text>
          {onSale && (
            <Text
              style={[
                TextStyle.overline2,
                {
                  textDecorationLine: 'line-through',
                  color: Theme.colors.placeholder,
                  marginStart: 4,
                },
              ]}
            >{`RM${product.retail_price}`}</Text>
          )}
        </View>

        <Text style={[TextStyle.body2, styles.productName]} numberOfLines={2}>
          {product.name}
        </Text>

        {withStoreName && (
          <LocationText
            style={{ alignSelf: 'flex-start', marginTop: 4 }}
            text={`${calculateDistance(
              { longitude: user.position[0], latitude: user.position[1] },
              product.stores.store_coordinate
            )} km`}
            caption={product.stores.store_name}
            color="#707070"
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

// Dedicated styling
const styles = StyleSheet.create({
  cover: {},
  content: {
    alignItems: 'flex-start',
    paddingVertical: 8,
    flexShrink: 1,
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
    marginBottom: 4,
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  productName: {
    height: 40,
    marginVertical: 4,
  },
  pricingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: '#707070',
  },
  sellingPriceText: {
    color: Theme.colors.primary,
    marginBottom: 2,
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

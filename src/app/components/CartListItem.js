// Components
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import NumericInput from 'react-native-numeric-input';
import LocationText from './LocationText';
import { renderChips } from './products/Extra';
import { useNavigation } from '@react-navigation/native';
import SmallTextChip from '../components/core/SmallTextChip';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { changeItemQuantity } from '../redux/cart/cartSlice';

// Styling
import { Theme, TextStyle } from '../styles/Theme';

export default function CartListItem({ containerStyle = {}, product, update }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [itemDetails, setItemDetails] = useState(product);
  const [promotions, setPromotions] = useState([...product.promotions]);
  const [onSale, setOnSale] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const salePrice = useRef(0);

  useEffect(() => {});

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

  const openProductDetails = () => {
    navigation.navigate('Product Page', { product });
  };

  useEffect(() => {
    if (isLoading) {
      for (promo of product.promotions) {
        if (
          promo.promotion_type == 'Basic' ||
          promo.promotion_type == 'Bundle'
        ) {
          setOnSale(true);
          salePrice.current = parseFloat(promo.sale_price).toFixed(2);
        }
      }
      setLoading(false);
    }
  }, [isLoading]);

  return (
    <View style={[containerStyle]}>
      <TouchableOpacity
        style={styles.productContainer}
        onPress={openProductDetails}
      >
        <Image
          source={{
            uri:
              product?.images > 0
                ? product.images[0].path
                : 'https://via.placeholder.com/96',
          }}
          style={styles.productImage}
        />
        <View style={styles.productDetailsContainer}>
          <View>
            <Text style={[TextStyle.body2, styles.text]} numberOfLines={2}>
              {product.name}
            </Text>
            <View style={styles.pricing}>
              <Text style={[TextStyle.subhead2, styles.text]} numberOfLines={2}>
                {onSale
                  ? `RM${salePrice.current * product.quantity}`
                  : `RM${product.total_price}`}
              </Text>
              <Text
                style={[TextStyle.overline2, styles.text, styles.singlePrice]}
                numberOfLines={2}
              >
                {`(RM${onSale ? salePrice.current : product.retail_price}/${
                  product.measurement_value
                }${product.measurement_unit})`}
              </Text>
            </View>
          </View>

          <View style={styles.promoContainer}>
            {renderChips(product.stock_status)}
            {promotions.map((promotion) => {
              return (
                <SmallTextChip
                  text={promotion.display_name}
                  style={styles.chip}
                />
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
      <View>
        <NumericInput
          minValue={0}
          containerStyle={styles.numericInput}
          value={itemDetails.quantity}
          onChange={handleQuantityChange}
          totalHeight={24}
          totalWidth={96}
          step={1}
          rounded
          editable={false}
        />
      </View>
    </View>
  );
}

// Dedicated styling
const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
  },
  productDetailsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flexDirection: 'column',
  },
  numericInput: {
    marginTop: 8,
  },
  promoContainer: {
    flexDirection: 'row',
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
  pricing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flexShrink: 1,
  },
  singlePrice: {
    color: Theme.colors.placeholder,
    marginStart: 8,
  },
});

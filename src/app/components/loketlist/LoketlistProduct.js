// Components
import React, { useState, useRef } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button, TextInput, Surface } from 'react-native-paper';
import NumericInput from 'react-native-numeric-input';
import { renderChips } from '../products/Extra';

// Utilities
import { modifyItemInCart } from '../../services/LoketlistService';

// Styling
import { Theme, TextStyle } from '../../styles/Theme';

export default function LoketlistProduct({
  containerStyle = {},
  product,
  cartID,
  load,
}) {
  const [itemDetails, setItemDetails] = useState(product);
  const previousQuantity = useRef(product.quantity);

  const handleQuantityChange = (value) => {
    modifyItemInCart(cartID, product.uuid, value)
      .then((data) => {
        previousQuantity.current = value;
      })
      .catch((error) => {
        console.log(error);
        setItemDetails({
          ...itemDetails,
          quantity: previousQuantity.current,
        });
      })
      .finally(() => {
        load();
      });
    setItemDetails({
      ...itemDetails,
      quantity: value,
    });
  };

  // TODO : Update fields
  return (
    <View style={[containerStyle]}>
      <View style={styles.productContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/96' }}
          style={styles.productImage}
        />
        <View style={styles.productDetailsContainer}>
          <View>
            <Text style={[TextStyle.body2, styles.text]} numberOfLines={2}>
              {product.name}
            </Text>
            <View style={styles.pricing}>
              <Text style={[TextStyle.subhead2, styles.text]} numberOfLines={2}>
                {`RM${product.total_price}`}
              </Text>
              <Text
                style={[TextStyle.overline2, styles.text, styles.singlePrice]}
                numberOfLines={2}
              >
                {`(RM${product.retail_price}/${product.measurement_value}${product.measurement_unit})`}
              </Text>
            </View>
          </View>

          <View>
            <View>{renderChips(product.stock_status)}</View>
          </View>
        </View>
      </View>
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

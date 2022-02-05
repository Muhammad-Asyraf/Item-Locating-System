import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { renderChips } from './Extra';
import SmallTextChip from '../core/SmallTextChip';

// Styling
import { Theme, TextStyle } from '../../styles/Theme';

export default function ProductListItem({ containerStyle = {}, product }) {
  console.log(product);
  const [promotions, setPromotions] = useState([...product.promotions]);

  return (
    <View style={[styles.productContainer, containerStyle]}>
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
        <Text style={[TextStyle.body2, styles.text]} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={[TextStyle.subhead2, styles.text]} numberOfLines={2}>
          {`RM${product.retail_price}`}
        </Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  productContainer: {
    marginVertical: 18,
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
  text: {
    flexShrink: 1,
  },
});

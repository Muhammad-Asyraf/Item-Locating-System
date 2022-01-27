import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { renderChips } from './Extra';

// Styling
import { Theme, TextStyle } from '../../styles/Theme';

export default function ProductListItem({ containerStyle = {}, product }) {
  return (
    <View style={[styles.productContainer, containerStyle]}>
      <Image
        source={{ uri: 'https://via.placeholder.com/96' }}
        style={styles.productImage}
      />
      <View style={styles.productDetailsContainer}>
        <Text style={[TextStyle.body2, styles.text]} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={[TextStyle.subhead2, styles.text]} numberOfLines={2}>
          {`RM${product.retail_price}`}
        </Text>
        <View>{renderChips(product.stock_status)}</View>
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

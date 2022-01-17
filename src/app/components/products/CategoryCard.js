import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, Surface } from 'react-native-paper';

// Utilities
import { useNavigation } from '@react-navigation/native';

// Styling
import { Theme, TextStyle } from '../../styles/Theme';

export default function CategoryCard({ category }) {
  const navigation = useNavigation();
  // Open search with category filter
  const proceed = () => {
    console.log(
      `[CategoryCard.js/proceed] Open search result with category: ${category.name}`
    );
    navigation.navigate('Search Result', {
      query: '',
      filters: { category: [category] },
    });
  };

  return (
    <TouchableOpacity onPress={proceed}>
      <Surface style={styles.categoryCardContainer}>
        <Image
          style={styles.categoryImage}
          source={{ uri: 'https://via.placeholder.com/96' }}
        />
        <Text
          style={[TextStyle.caption, styles.categoryName]}
          numberOfLines={2}
        >
          {category.name}
        </Text>
      </Surface>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryCardContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: Theme.roundness,
    marginEnd: 12,
    width: 100,
    height: 133,
    paddingVertical: 12,
    paddingHorizontal: 8,
    elevation: 1,
  },
  categoryImage: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    borderRadius: 1000,
  },
  categoryName: {
    textAlign: 'center',
    marginTop: 6,
  },
});

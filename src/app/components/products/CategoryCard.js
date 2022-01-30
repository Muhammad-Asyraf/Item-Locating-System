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
    <TouchableOpacity onPress={proceed} style={styles.categoryCardContainer}>
      <Surface style={styles.categoryImageContainer}>
        <Image
          style={styles.categoryImage}
          source={{ uri: 'https://via.placeholder.com/96' }}
        />
      </Surface>
      <Text style={[TextStyle.caption, styles.categoryName]} numberOfLines={2}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryCardContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: Theme.roundness,
    width: 72,
    height: 133,
    marginEnd: 12,
  },
  categoryImageContainer: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: Theme.roundness + 1,
    elevation: 1,
  },
  categoryImage: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    borderRadius: 1000,
  },
  categoryName: {
    textAlign: 'center',
    marginTop: 6,
  },
});

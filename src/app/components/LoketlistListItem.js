// Components
import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-paper';
import SmallTextChip from './core/SmallTextChip';

// Styling
import { Theme, TextStyle } from '../styles/Theme';

export default function LoketlistListItem({ item }) {
  const [isLoading, setLoading] = useState(true);
  const image = { uri: '' };

  const totalPrice = useRef(0);

  useEffect(() => {
    if (isLoading) {
      // Calculate total price
      item.products.map((product) => {
        totalPrice.current =
          totalPrice.current + parseFloat(product.total_price);
      });
      setLoading(false);
    }
  }, [isLoading]);

  const parseDate = (date) => {
    const now = Date.now();
    const past = Date.parse(date);
    const daysElapsed = (now - past) / (1000 * 3600 * 24);
    // console.log(
    //   `[LoketlistListItem.js/parseDate] daysElapsed : ${daysElapsed}`
    // );
    if (daysElapsed < 3) {
      return 'Recently updated';
    } else {
      return `Updated ${daysElapsed.toFixed(0)} day(s) ago`;
    }
  };

  const getAmountOfProducts = () => {
    const productsCount = item.products.length;
    if (productsCount == 0) {
      return `Empty cart`;
    } else if (productsCount == 1) {
      return `1 product`;
    } else {
      return `${productsCount} products`;
    }
  };

  return (
    <ImageBackground source={image} style={styles.listItemContainer}>
      <View style={styles.horizontalContainer}>
        <Text style={[TextStyle.headline5, styles.title]}>{item.name}</Text>
        <Text style={[TextStyle.subhead2, styles.storeCount]}>
          {getAmountOfProducts()}
        </Text>
      </View>
      <View style={styles.horizontalContainer}>
        <Text style={[TextStyle.subhead2, styles.updatedAt]}>
          {parseDate(item.updated_at)}
        </Text>
        <SmallTextChip
          text={`RM${totalPrice.current.toFixed(2)}`}
          fill={true}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: Theme.colors.darkBackground,
    paddingTop: 64,
    paddingHorizontal: 12,
    paddingBottom: 12,
    marginBottom: 18,
    borderRadius: 4,
    overflow: 'hidden',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
  },
  title: {
    color: 'white',
  },
  storeCount: {
    color: 'white',
  },
  updatedAt: {
    color: 'white',
  },
});

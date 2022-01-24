// Components
import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Appbar, Searchbar, Text, Menu, Divider } from 'react-native-paper';
import ProductCard from '../components/products/ProductCard';
import { FlatGrid } from 'react-native-super-grid';
import Loading from '../components/Loading';

// Utilities
import { getCampaignProducts } from '../services/CampaignService';

// Style imports
import { Theme, GlobalStyle, TextStyle } from '../styles/Theme';
import { appBarStyles } from '../styles/appBarStyles';

export default function CampaignProducts({ navigation, route }) {
  let originalData = useRef(null);
  const { campaign } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState();
  const [products, setProducts] = useState([]);

  // Sort menu states
  const [isSortMenuVisible, setSortMenuVisible] = useState(false);
  // 0 - unsorted, 1 - A-Z, 2 - Z-A, 3 - Price : low to high, 4 - Price : high to low
  const sortType = useRef(0);

  useEffect(() => {
    // Load everything during loading
    if (isLoading) {
      getCampaignProducts(campaign.uuid)
        .then((data) => {
          let products = [];
          data.forEach((promotion) => {
            products.push(...promotion.products);
          });

          originalData.current = products;
          setProducts(products);
          setLoading(false);
        })
        .catch((error) => {
          console.log(`[CampaignProducts.js/useEffect] Error: ${error}`);
        });
    }
  }, [isLoading]);

  useEffect(() => {
    if (searchQuery !== undefined) {
      if (searchQuery != '') {
        let filterData = originalData.current.filter((product) => {
          let name = product.name.toLowerCase();
          let query = searchQuery.toLowerCase();
          return name.includes(query);
        });
        setProducts(filterData);
      } else {
        setProducts(originalData.current);
      }
    }
  }, [searchQuery]);

  const handleQueryChange = (query) => {
    setSearchQuery(query);
  };

  const showSortMenu = () => setSortMenuVisible(true);
  const hideSortMenu = () => setSortMenuVisible(false);

  const handleSortMenu = (state) => {
    sortType.current = state;
    setProducts([...products].sort(compareSort));
    hideSortMenu();
  };

  const compareSort = (a, b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();
    let priceA = a.retail_price;
    let priceB = b.retail_price;
    let comparison = 0;
    switch (sortType.current) {
      case 1:
        if (nameA > nameB) {
          comparison = 1;
        } else if (nameA < nameB) {
          comparison = -1;
        }
        return comparison;
      case 2:
        if (nameA > nameB) {
          comparison = 1;
        } else if (nameA < nameB) {
          comparison = -1;
        }
        return comparison * -1;
      case 3:
        return priceA - priceB;
      case 4:
        return priceB - priceA;
      default:
        return comparison;
    }
  };

  return (
    <View style={GlobalStyle.screenContainer}>
      <Appbar.Header style={[appBarStyles.appBarContainer]}>
        {navigation.canGoBack() ? (
          <Appbar.BackAction color="#007AFF" onPress={navigation.goBack} />
        ) : null}
        <Searchbar
          style={appBarStyles.appBarSearchbar}
          placeholder="Filter products"
          defaultValue={searchQuery}
          onChangeText={handleQueryChange}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Menu
          visible={isSortMenuVisible}
          onDismiss={hideSortMenu}
          anchor={<Appbar.Action icon="sort" onPress={showSortMenu} />}
        >
          <Menu.Item title="A-Z" onPress={() => handleSortMenu(1)} />
          <Menu.Item title="Z-A" onPress={() => handleSortMenu(2)} />
          <Divider />
          <Menu.Item
            title="Price : low to high"
            onPress={() => handleSortMenu(3)}
          />
          <Menu.Item
            title="Price : high to low"
            onPress={() => handleSortMenu(4)}
          />
        </Menu>
      </Appbar.Header>
      {isLoading ? (
        <Loading />
      ) : products.length != 0 ? (
        <FlatGrid
          style={GlobalStyle.flatGrid}
          itemDimension={120}
          data={products}
          renderItem={({ item }) => <ProductCard product={item} />}
        />
      ) : (
        <Text>No products found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  filterScreen: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  // Filter screen
  filterChipContainer: {
    marginVertical: 18,
  },
  filterChipTitle: {
    marginHorizontal: 18,
  },
  filterChipList: {
    marginVertical: 12,
    paddingHorizontal: 18,
  },
  // Filter dialog
  filterDialogChipList: {
    marginVertical: 8,
  },
  searchMessageContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  searchMessageIcon: {
    width: 96,
    height: 96,
    margin: 16,
  },
  searchMessageText: {
    textAlign: 'center',
    margin: 8,
  },
});

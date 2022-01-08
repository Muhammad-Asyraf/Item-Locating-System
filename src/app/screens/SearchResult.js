// Components
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Appbar, Searchbar, Text } from 'react-native-paper';
import ProductCard from '../components/ProductCard';
import { FlatGrid } from 'react-native-super-grid';
import Loading from '../components/Loading';

// Utilities
import axios from 'axios';
import { getProducts } from '../services/ProductService';

// Environment configs
import { environment } from '../environment';

// Style imports
import { GlobalStyle } from '../styles/Theme';
import { appBarStyles } from '../styles/appBarStyles';

export default function SearchResult({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(route.params.query);
  const [searchResult, setSearchResult] = useState();

  useEffect(() => {
    if (isLoading) {
      getProducts({ search: searchQuery })
        .then((data) => {
          setSearchResult(data);
          setLoading(false);
        })
        .catch((error) => {});
    }
  });

  const handleQueryChange = (query) => {
    setSearchQuery(query);
  };

  const runQuery = () => {
    // console.log('Running query : ' + searchQuery);
    setLoading(true);
  };

  return (
    <View style={GlobalStyle.screenContainer}>
      <Appbar.Header style={[appBarStyles.appBarContainer]}>
        {navigation.canGoBack() ? (
          <Appbar.BackAction color="#007AFF" onPress={navigation.goBack} />
        ) : null}
        <Searchbar
          style={appBarStyles.appBarSearchbar}
          defaultValue={searchQuery}
          onChangeText={handleQueryChange}
          onSubmitEditing={runQuery}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </Appbar.Header>
      {isLoading ? (
        <Loading />
      ) : searchResult.length != 0 ? (
        <FlatGrid
          style={GlobalStyle.flatGrid}
          itemDimension={120}
          data={searchResult}
          renderItem={({ item }) => <ProductCard product={item} />}
        />
      ) : (
        <Text>No products found</Text>
      )}
    </View>
  );
}

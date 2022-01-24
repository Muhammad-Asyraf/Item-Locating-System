import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Searchbar } from 'react-native-paper';
import AppbarScreen from '../components/core/AppbarScreen';
import { FlatGrid } from 'react-native-super-grid';
import CategoryCard from '../components/products/CategoryCard';
import Loading from '../components/Loading';

// Utilities
import { getCategories, getSubCategories } from '../services/ProductService';

// Styling
import { Theme, GlobalStyle, TextStyle } from '../styles/Theme';

export default function CategoryList({ navigation, route }) {
  let originalData = useRef(null);
  let subcategory = useRef(route.params?.category);
  const [searchQuery, setSearchQuery] = useState();
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then((data) => {
        setLoading(false);
        originalData.current = data;
        // console.log(
        //   `[CategoryList.js/useEffect] originalData: ${JSON.stringify(
        //     originalData
        //   )}`
        // );
        setData(originalData.current);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      if (searchQuery !== undefined) {
        if (searchQuery != '') {
          let filterData = originalData.current.filter((category) => {
            let name = category.name.toLowerCase();
            let query = searchQuery.toLowerCase();
            return name.includes(query);
          });
          setData(filterData);
        } else {
          setData(originalData.current);
        }
      }
    }
  }, [searchQuery]);

  return (
    <AppbarScreen name={'Categories'}>
      {isLoading ? (
        <View style={GlobalStyle.screenContainer}>
          <Loading message="Fetching categories" />
        </View>
      ) : (
        <View style={{ flex: 1, flexGrow: 1 }}>
          <FlatGrid
            ListHeaderComponentStyle={styles.searchBar}
            ListHeaderComponent={
              <Searchbar
                value={searchQuery}
                placeholder={'Filter categories'}
                onChangeText={(text) => setSearchQuery(text)}
                autoCorrect={false}
                autoCapitalize="none"
              />
            }
            itemDimension={64}
            spacing={18}
            data={data}
            renderItem={({ item }) => <CategoryCard category={item} />}
          />
        </View>
      )}
    </AppbarScreen>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginHorizontal: 18,
    marginBottom: 18,
  },
});

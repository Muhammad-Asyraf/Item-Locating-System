// Components
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {
  Appbar,
  Button,
  Searchbar,
  Text,
  Dialog,
  Chip,
  Menu,
  Divider,
} from 'react-native-paper';
import Thumb from '../components/core/rangeslider/Thumb';
import Rail from '../components/core/rangeslider/Rail';
import RailSelected from '../components/core/rangeslider/RailSelected';
import Label from '../components/core/rangeslider/Label';
import Notch from '../components/core/rangeslider/Notch';
import ProductCard from '../components/products/ProductCard';
import { FlatGrid } from 'react-native-super-grid';
import Loading from '../components/Loading';

// Utilities
import {
  getProducts,
  getCategories,
  getSubCategories,
} from '../services/ProductService';

// Style imports
import { Theme, GlobalStyle, TextStyle } from '../styles/Theme';
import { appBarStyles } from '../styles/appBarStyles';
import { FlatList } from 'react-native-gesture-handler';

export default function SearchResult({ navigation, route }) {
  const params = useRef(route.params);
  const [minPrice, setMinPrice] = useState(Infinity);
  const [maxPrice, setMaxPrice] = useState(-Infinity);
  const [isLoading, setLoading] = useState(true);

  // Sort menu states
  const [isSortMenuVisible, setSortMenuVisible] = useState(false);
  // 0 - unsorted, 1 - A-Z, 2 - Z-A, 3 - Price : low to high, 4 - Price : high to low
  const sortType = useRef(0);

  // Search states
  const [searchQuery, setSearchQuery] = useState(route.params.query);
  const [searchResult, setSearchResult] = useState();
  const [showResult, setShowResult] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({ ...route.params?.filters });
  const [categories, setCategories] = useState();
  const [subCategories, setSubCategories] = useState();
  const [filterDialogVisible, setFilterDialogVisible] = useState(false);

  // Filter dialog states
  const [dialogFilters, setDialogFilters] = useState({
    ...route.params?.filters,
  });

  // RangeSlider components
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);

  useEffect(() => {
    console.log(
      `[SearchResult.js/useEffect] searchQuery: ${searchQuery} | Filters: ${JSON.stringify(
        filters
      )}`
    );
    console.log(
      `[SearchResult.js/useEffect] Price Range : ${minPrice}/${maxPrice}}`
    );

    // Load everything during loading
    if (isLoading) {
      let queryObject = { search: searchQuery };

      getCategories()
        .then((data) => {
          setCategories(data);
        })
        .catch((error) => {
          console.log(`[SearchResult.js/useEffect] ${error}`);
        });
      // Check if there is filter
      if (typeof filters != 'undefined' && Object.keys(filters).length != 0) {
        if ('subcategory' in filters) {
          queryObject.subcategory = filters.subcategory[0].uuid;
        } else if ('category' in filters) {
          queryObject.category = filters.category[0].uuid;
          getSubCategories(filters.category[0].uuid)
            .then((data) => setSubCategories(data))
            .catch((error) => {
              console.log(`[SearchResult.js/useEffect] ${error}`);
            });
        }

        if ('store' in filters) {
          queryObject.uuid = filters.store;
        }
      }

      getProducts(queryObject)
        .then((data) => {
          setMinPrice(Math.min(...data.map((product) => product.retail_price)));
          setMaxPrice(Math.max(...data.map((product) => product.retail_price)));
          setSearchResult(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(`[SearchResult.js/useEffect] ${error}`);
        });
    }
  }, [isLoading]);

  const handleQueryChange = (query) => {
    setSearchQuery(query);
  };

  const runQuery = () => {
    // console.log('Running query : ' + searchQuery);
    setLoading(true);
    setShowResult(true);
  };

  const showSortMenu = () => setSortMenuVisible(true);
  const hideSortMenu = () => setSortMenuVisible(false);
  const showFilterDialog = () => setFilterDialogVisible(true);
  const hideFilterDialog = () => setFilterDialogVisible(false);

  const handleFilter = () => {
    hideFilterDialog();
    setFilters(dialogFilters);
    setLoading(true);
  };
  const clearFilters = () => {
    hideFilterDialog();
    setDialogFilters({});
    setFilters({});
    setLoading(true);
  };

  const handleSortMenu = (state) => {
    sortType.current = state;
    setSearchResult([...searchResult].sort(compareSort));
    hideSortMenu();
  };

  const handleCategorySelect = (categoryUUID) => {
    if (
      filters?.category &&
      filters?.category.map((val) => val.uuid).includes(categoryUUID)
    ) {
      console.log(
        `[SearchResult.js/handleCategorySelect] Deleting ${categoryUUID} from filters`
      );
      let idx = filters.category.map((val) => val.uuid).indexOf(categoryUUID);
      let category = filters.category.slice();
      category.splice(idx, 1);
      console.log(
        `[SearchResult.js/handleCategorySelect] Index: ${idx} Category: ${JSON.stringify(
          category
        )}`
      );
      let filterState = { ...filters, category };
      if (category.length == 0) {
        delete filterState.category;
      }
      setFilters(filterState);
      setDialogFilters(filterState);
    } else {
      let idx = categories.map((val) => val.uuid).indexOf(categoryUUID);
      setFilters({
        ...filters,
        category: [categories[idx]],
      });
      setDialogFilters({
        ...filters,
        category: [categories[idx]],
      });
      setLoading(true);
    }
  };

  const handleDialogCategorySelect = (categoryUUID) => {
    if (
      dialogFilters?.category &&
      dialogFilters?.category.map((val) => val.uuid).includes(categoryUUID)
    ) {
      console.log(
        `[SearchResult.js/handleDialogCategorySelect] Deleting ${categoryUUID} from dialog filters`
      );
      let idx = dialogFilters.category
        .map((val) => val.uuid)
        .indexOf(categoryUUID);
      let category = dialogFilters.category.slice();
      category.splice(idx, 1);
      console.log(
        `[SearchResult.js/handleDialogCategorySelect] Index: ${idx} Category: ${JSON.stringify(
          category
        )}`
      );
      let filterState = { ...dialogFilters, category };
      if (category.length == 0) {
        delete filterState.category;
      }
      setDialogFilters(filterState);
    } else {
      let idx = categories.map((val) => val.uuid).indexOf(categoryUUID);
      setDialogFilters({
        ...dialogFilters,
        category: [categories[idx]],
      });
    }
  };

  const renderFilterBar = () => {
    let filterChips = [...filters?.category];
    return (
      <View>
        <Text style={[TextStyle.subhead2, styles.filterChipTitle]}>
          Filters
        </Text>
        <FlatList
          style={styles.filterChipList}
          horizontal
          data={filterChips}
          renderItem={({ item }) => (
            <Chip
              mode="outlined"
              selected={
                'category' in filters &&
                filters.category.map((val) => val.uuid).includes(item.uuid)
              }
              style={{ marginEnd: 8 }}
              onPress={() => handleCategorySelect(item.uuid)}
            >
              {item.name}
            </Chip>
          )}
        />
      </View>
    );
  };

  const updatePriceRange = (low, high, fromUser) => {
    setFilters({
      ...filters,
      price: {
        low,
        high,
      },
    });
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
          placeholder="Search"
          defaultValue={searchQuery}
          onChangeText={handleQueryChange}
          onSubmitEditing={runQuery}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Appbar.Action icon="filter-variant" onPress={showFilterDialog} />
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
      ) : Object.keys(filters).length == 0 && !showResult ? (
        <View style={styles.filterScreen}>
          <View style={styles.filterChipContainer}>
            <Text style={[TextStyle.subhead2, styles.filterChipTitle]}>
              Categories
            </Text>
            <FlatList
              style={styles.filterChipList}
              horizontal
              data={categories}
              renderItem={({ item }) => (
                <Chip
                  mode="outlined"
                  selected={
                    'category' in filters &&
                    filters.category.map((val) => val.uuid).includes(item.uuid)
                  }
                  style={{ marginEnd: 8 }}
                  onPress={() => handleCategorySelect(item.uuid)}
                >
                  {item.name}
                </Chip>
              )}
            />
          </View>
          <View style={styles.searchMessageContainer}>
            <Image
              style={styles.searchMessageIcon}
              source={require('../assets/icons/search.png')}
            />
            <Text style={[TextStyle.headline6, styles.searchMessageText]}>
              Search anything near you
            </Text>
          </View>
        </View>
      ) : searchResult.length != 0 ? (
        <FlatGrid
          ListHeaderComponent={'category' in filters != 0 && renderFilterBar}
          style={GlobalStyle.flatGrid}
          itemDimension={120}
          data={searchResult}
          renderItem={({ item }) => <ProductCard product={item} />}
        />
      ) : (
        <Text>No products found</Text>
      )}

      <Dialog visible={filterDialogVisible} onDismiss={hideFilterDialog}>
        <Dialog.Title>Filter search</Dialog.Title>
        <Dialog.Content>
          <View>
            <View>
              <Text style={[TextStyle.subhead2]}>Categories</Text>
              <FlatList
                style={styles.filterDialogChipList}
                horizontal
                data={categories}
                renderItem={({ item }) => (
                  <Chip
                    mode="outlined"
                    selected={
                      'category' in dialogFilters &&
                      dialogFilters.category
                        .map((val) => val.uuid)
                        .includes(item.uuid)
                    }
                    style={{
                      marginEnd: 8,
                      backgroundColor: Theme.colors.primary,
                    }}
                    textStyle={{ color: 'white' }}
                    onPress={() => handleDialogCategorySelect(item.uuid)}
                  >
                    {item.name}
                  </Chip>
                )}
              />
            </View>
            {/* <Slider
              step={1}
              min={0}
              max={100}
              renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              renderLabel={renderLabel}
              renderNotch={renderNotch}
              onValueChanged={updatePriceRange}
            /> */}
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideFilterDialog}>Cancel</Button>
          <Button onPress={clearFilters}>Clear</Button>
          <Button onPress={handleFilter}>Filter</Button>
        </Dialog.Actions>
      </Dialog>
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

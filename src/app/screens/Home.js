import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  RefreshControl,
  ScrollView,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Appbar,
  Text,
  Surface,
  Button,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import CategoryCard from '../components/products/CategoryCard';
import StoreCard from '../components/stores/StoreCard';

// Utilities
import { getCategories } from '../services/ProductService';
import { getStores } from '../services/StoreService';

// Styling
import { Theme, GlobalStyle, TextStyle } from '../styles/Theme';

const { width: screenWidth } = Dimensions.get('window');
export default function Home({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [banners, setBanners] = useState([1, 2, 3]);

  useEffect(() => {
    if (isLoading) {
      getCategories()
        .then((data) => {
          setCategories(data.slice(0, 9));
          //console.log(`[Home.js/useEffect] ${JSON.stringify(data)}`);
        })
        .catch((error) => {
          console.log(`[Home.js/useEffect] ${error}`);
        });

      getStores()
        .then((data) => {
          setStores(data);
          // console.log(`[Home.js/useEffect] Stores: ${JSON.stringify(data)}`);
          setLoading(false);
        })
        .catch((error) => {
          console.log(`[Home.js/useEffect] ${error}`);
        });
    }
  }, [isLoading]);

  // Push a search result screen
  const openSearch = () => {
    navigation.dangerouslyGetParent().navigate('Search Result', {
      query: '',
    });
  };

  // Open category list screen
  const viewCategories = () => {
    navigation.dangerouslyGetParent().navigate('Categories');
  };

  const viewStores = () => {};

  return (
    <View style={GlobalStyle.screenContainer}>
      <Appbar.Header style={{ backgroundColor: 'transparent' }}>
        <TouchableOpacity style={{ flex: 1, flexGrow: 1 }} onPress={openSearch}>
          <Surface style={styles.searchBar}>
            <Icon name="search" size={24} color={Theme.colors.text} />
            <Text style={[TextStyle.body1, styles.searchBarText]}>
              Search for something
            </Text>
          </Surface>
          {/* <Searchbar
            editable={false}
            style={GlobalStyle.searchBar}
            placeholder="Search for something"
            onChangeText={handleQueryChange}
            onSubmitEditing={openSearch}
            autoCorrect={false}
            autoCapitalize="none"
          /> */}
        </TouchableOpacity>
      </Appbar.Header>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              setLoading(true);
            }}
          />
        }
      >
        <Carousel
          containerCustomStyle={styles.carousel}
          sliderWidth={screenWidth}
          itemWidth={screenWidth - 40}
          data={banners}
          renderItem={({ item }, parallaxProps) => (
            <View style={styles.item}>
              <ParallaxImage
                source={{ uri: 'https://via.placeholder.com/670x320' }}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.1}
                {...parallaxProps}
              />
            </View>
          )}
          hasParallaxImages={true}
        />
        {/* Horizontal list mockup */}
        <View style={styles.horizontalProductContainer}>
          <View style={styles.horizontalTitleContainer}>
            <Text style={[TextStyle.subhead1, styles.horizontalListTitle]}>
              Categories
            </Text>
            <Button compact={true} onPress={viewCategories}>
              See All
            </Button>
          </View>
          <FlatList
            contentContainerStyle={styles.horizontalListContainer}
            horizontal={true}
            data={categories}
            renderItem={({ item }) => (
              <CategoryCard type="category" category={item} />
            )}
          />
        </View>
        {/* Horizontal list mockup */}
        {stores.length != 0 && (
          <View style={styles.horizontalProductContainer}>
            <View style={styles.horizontalTitleContainer}>
              <Text style={[TextStyle.subhead1, styles.horizontalListTitle]}>
                Shops around you
              </Text>
              <Button compact={true} onPress={viewStores}>
                See All
              </Button>
            </View>
            <FlatList
              contentContainerStyle={styles.horizontalListContainer}
              horizontal={true}
              data={stores}
              renderItem={({ item }) => <StoreCard store={item} />}
            />
          </View>
        )}
        <View style={styles.footer}>
          <Text style={[TextStyle.body2, styles.footerMessage]}>
            You have reached the end
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Parallax start
  carousel: {
    marginTop: 12,
  },
  item: {
    height: 160,
  },
  imageContainer: {
    flex: 1,
    //marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 4,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'center',
  },
  // Parallax end

  // Main container
  container: {},

  // Searchbar
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Theme.roundness,
    marginHorizontal: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 1,
  },
  searchBarText: {
    marginLeft: 18,
    color: Theme.colors.placeholder,
  },

  // Horizontal item list
  horizontalProductContainer: {
    marginVertical: 8,
  },
  horizontalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  horizontalListTitle: {},
  horizontalListContainer: {
    paddingHorizontal: 18,
    backgroundColor: '#F5F5F5',
  },
  horizontalProductImage: {
    width: 160,
    height: 192,
    marginEnd: 16,
    borderRadius: 4,
  },
  listItemContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  footer: {
    backgroundColor: Theme.colors.background,
    margin: 18,
    padding: 16,
    borderRadius: Theme.roundness,
  },
  footerMessage: {
    textAlign: 'center',
    color: Theme.colors.placeholder,
  },
});

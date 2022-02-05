import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import AppbarScreen from '../components/core/AppbarScreen';
import Loading from '../components/Loading';
import ProductCard from '../components/products/ProductCard';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { FlatGrid } from 'react-native-super-grid';

// Utilities
import {
  getProductsForStore,
  getCampaignsForStore,
} from '../services/StoreService';

// Configurations
import { environment } from '../environment';

//Styling
import { Theme, GlobalStyle, TextStyle, AppbarStyle } from '../styles/Theme';

export default function StoreDetails({ navigation, route }) {
  const { store } = route.params;
  const { width: screenWidth } = Dimensions.get('window');
  const [isLoading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [catalogProducts, setCatalogProducts] = useState({});
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoading) {
        // Load all store data
        try {
          let promotional = await getProductsForStore(
            store.uuid,
            'promotional'
          );
          let bitl = await getProductsForStore(store.uuid, 'bitl');
          let fetchedProducts = { promotional, bitl };

          setCatalogProducts({ ...catalogProducts, ...fetchedProducts });

          let campaigns = await getCampaignsForStore(store.uuid);

          setCampaigns(campaigns);

          //   console.log(
          //     `[StoreDetails.js/useEffect] catalogProducts : ${JSON.stringify(
          //       fetchedProducts
          //     )}`
          //   );
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
    // console.log(
    //   `[StoreDetails.js/useEffect] catalogProducts : ${JSON.stringify(
    //     catalogProducts
    //   )}`
    // );
  }, [isLoading]);

  const handleSearch = () => {
    navigation.navigate('Search Result', {
      query: searchQuery,
      filters: {
        store: store.uuid,
      },
    });
  };

  const viewCampaign = (campaign) => {
    navigation.navigate('Campaign', { campaign });
  };

  return (
    <AppbarScreen name={store.store_name}>
      {isLoading ? (
        <Loading message="Loading store catalog" />
      ) : (
        <ScrollView>
          {campaigns != 0 && (
            <Carousel
              containerCustomStyle={styles.carousel}
              sliderWidth={screenWidth}
              itemWidth={screenWidth - 40}
              data={campaigns}
              renderItem={({ item }, parallaxProps) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => viewCampaign(item)}
                >
                  <ParallaxImage
                    source={{
                      uri: `${environment.host}${item.banner_ad_path}`,
                    }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.1}
                    {...parallaxProps}
                  />
                </TouchableOpacity>
              )}
              hasParallaxImages={true}
            />
          )}
          <View>
            <Searchbar
              style={styles.searchBar}
              placeholder="Search from this store"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              onSubmitEditing={handleSearch}
            />
            {Object.keys(catalogProducts).length > 0 && (
              <View>
                {'promotional' in catalogProducts &&
                  catalogProducts?.promotional.length > 0 && (
                    <View style={styles.horizontalProductContainer}>
                      <View style={styles.horizontalTitleContainer}>
                        <Text
                          style={[
                            TextStyle.subhead1,
                            styles.horizontalListTitle,
                          ]}
                        >
                          Some products
                        </Text>
                        {/* <Button compact={true} onPress={viewStores}>
                See All
              </Button> */}
                      </View>
                      <FlatList
                        contentContainerStyle={styles.horizontalListContainer}
                        horizontal={true}
                        data={catalogProducts?.promotional}
                        renderItem={({ item }) => (
                          <ProductCard
                            product={item}
                            withStoreName={false}
                            style={styles.productCard}
                          />
                        )}
                      />
                    </View>
                  )}
                {'bitl' in catalogProducts && catalogProducts?.bitl.length > 0 && (
                  <View style={styles.horizontalProductContainer}>
                    <View style={styles.horizontalTitleContainer}>
                      <Text
                        style={[TextStyle.subhead1, styles.horizontalListTitle]}
                      >
                        Before its too late
                      </Text>
                      {/* <Button compact={true} onPress={viewStores}>
                See All
              </Button> */}
                    </View>
                    <FlatList
                      contentContainerStyle={styles.horizontalListContainer}
                      horizontal={true}
                      data={catalogProducts?.bitl}
                      renderItem={({ item }) => (
                        <ProductCard
                          product={item}
                          withStoreName={false}
                          style={styles.productCard}
                        />
                      )}
                    />
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </AppbarScreen>
  );
}

const styles = StyleSheet.create({
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
  searchBar: {
    marginHorizontal: 18,
    marginTop: 18,
    elevation: 1,
  },
  horizontalProductContainer: {
    marginTop: 8,
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
  productCard: { width: 110, marginEnd: 18 },
});

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  View,
  Image,
} from "react-native";
import { Appbar, Title, Searchbar, Surface } from "react-native-paper";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";

// Styling
import { GlobalStyle } from "../styles/theme";
import { appBarStyles } from "../styles/appBarStyles";

const { width: screenWidth } = Dimensions.get("window");
export default function Home({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [banners, setBanners] = useState([1, 2, 3]);

  // Handle query state changes
  const handleQueryChange = (query) => setSearchQuery(query);

  // Push a search result screen
  const search = () => {
    navigation.dangerouslyGetParent().push("Search Result", {
      query: searchQuery,
    });
  };

  return (
    <View style={GlobalStyle.screenContainer}>
      <Appbar.Header style={{ backgroundColor: "transparent" }}>
        <Searchbar
          style={GlobalStyle.searchBar}
          placeholder="Search for something"
          onChangeText={handleQueryChange}
          onSubmitEditing={search}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        <Carousel
          sliderWidth={screenWidth}
          itemWidth={screenWidth - 44}
          data={banners}
          renderItem={({ item }, parallaxProps) => (
            <View style={styles.item}>
              <ParallaxImage
                source={{ uri: "https://tinyurl.com/cu8nm69m" }}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.4}
                {...parallaxProps}
              />
            </View>
          )}
          hasParallaxImages={true}
        />
        {/* Horizontal list mockup */}
        <View style={styles.horizontalProductContainer}>
          <Title style={styles.horizontalListTitle}>Trending items!</Title>
          <FlatList
            style={styles.horizontalListContainer}
            horizontal={true}
            data={banners}
            renderItem={({ item }) => (
              <View style={styles.listItemContainer}>
                <Image
                  style={styles.horizontalProductImage}
                  source={{ uri: "https://tinyurl.com/urszpsxs" }}
                />
              </View>
            )}
          />
        </View>
        {/* Horizontal list mockup */}
        <View style={styles.horizontalProductContainer}>
          <Title style={styles.horizontalListTitle}>
            Hot Products near you!
          </Title>
          <FlatList
            style={styles.horizontalListContainer}
            horizontal={true}
            data={banners}
            renderItem={({ item }) => (
              <View style={styles.listItemContainer}>
                <Image
                  style={styles.horizontalProductImage}
                  source={{ uri: "https://tinyurl.com/268aa7js" }}
                />
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Parallax start
  item: {
    height: 160,
  },
  imageContainer: {
    flex: 1,
    //marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 4,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  // Parallax end

  // Main container
  container: {
    paddingTop: 12,
  },

  // Horizontal item list
  horizontalProductContainer: {
    marginVertical: 12,
  },
  horizontalListTitle: {
    marginStart: 22,
  },
  horizontalListContainer: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    backgroundColor: "#F5F5F5",
  },
  horizontalProductImage: {
    width: 160,
    height: 192,
    marginEnd: 16,
    borderRadius: 4,
  },
  listItemContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

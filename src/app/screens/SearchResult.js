import React, { useState } from "react";
import { View } from "react-native";
import { Appbar, Searchbar, ActivityIndicator, Text } from "react-native-paper";

// Components
import ItemCardSmall from "../components/ItemCardSmall";
import { FlatGrid } from "react-native-super-grid";
import Loading from "../components/Loading";

// Style imports
import { GlobalStyle } from "../styles/theme";
import { appBarStyles } from "../styles/appBarStyles";

export default function SearchResult({ navigation, route }) {
  const [isLoading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(route.params.query);
  const [searchResult, setSearchResult] = useState(
    [{
      "id": 1,
      "name": "Non Drowsy Cold and Cough PE",
      "store": "Yozio",
      "retail_price": 81.72,
      "selling_price": 15.54,
      "quantity": 51,
      "imageUrl": "http://dummyimage.com/147x100.png/dddddd/000000"
    }, {
      "id": 2,
      "name": "Cetirizine Hydrochloride",
      "store": "Twitterwire",
      "retail_price": 90.63,
      "selling_price": 49.85,
      "quantity": 1,
      "imageUrl": "http://dummyimage.com/199x100.png/dddddd/000000"
    }, {
      "id": 3,
      "name": "Pollens - Trees, Oak Mix",
      "store": "Cogibox",
      "retail_price": 66.91,
      "selling_price": 29.92,
      "quantity": 37,
      "imageUrl": "http://dummyimage.com/172x100.png/5fa2dd/ffffff"
    }, {
      "id": 4,
      "name": "Methotrexate",
      "store": "Skipfire",
      "retail_price": 63.99,
      "selling_price": 19.78,
      "quantity": 3,
      "imageUrl": "http://dummyimage.com/178x100.png/5fa2dd/ffffff"
    }, {
      "id": 5,
      "name": "DiorSkin Nude 040 Honey Beige",
      "store": "Quatz",
      "retail_price": 68.41,
      "selling_price": 34.62,
      "quantity": 80,
      "imageUrl": "http://dummyimage.com/165x100.png/5fa2dd/ffffff"
    }]
  );

  const handleQueryChange = (query) => {
    setSearchQuery(query);
  };

  const runQuery = () => {
    console.log("Running query : " + searchQuery);
    setLoading(true)
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
      ) : (
        <FlatGrid
          style={GlobalStyle.flatGrid}
          itemDimension={140}
          data={searchResult}
          renderItem={({ item }) => (
            <ItemCardSmall
              itemId={item.id}
              itemName={item.name}
              merchant={item.store}
              normalPrice={item.retail_price}
              sellingPrice={item.selling_price}
              quantityLeft={item.quantity}
              imageUrl={item.imageUrl}
            />
          )}
        />
      )}
    </View>
  );
}

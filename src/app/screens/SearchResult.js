// Components
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Appbar, Searchbar, Text } from "react-native-paper";
import ItemCardSmall from "../components/ItemCardSmall";
import { FlatGrid } from "react-native-super-grid";
import Loading from "../components/Loading";

// Utilities
import axios from "axios";

// Environment configs
import { environment } from "../environment";

// Style imports
import { GlobalStyle } from "../styles/theme";
import { appBarStyles } from "../styles/appBarStyles";

export default function SearchResult({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(route.params.query);
  const [searchResult, setSearchResult] = useState();

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const {data} = await axios.get(
          environment.host + "/api/mobile/product-service/products",
          {
            params: {
              search: searchQuery,
            },
          }
        );
        setSearchResult(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    if (isLoading) {
      fetchQuery();
    }
  });

  const handleQueryChange = (query) => {
    setSearchQuery(query);
  };

  const runQuery = () => {
    console.log("Running query : " + searchQuery);
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
          itemDimension={140}
          data={searchResult}
          renderItem={({ item }) => (
            <ItemCardSmall
              itemId={item.uuid}
              itemName={item.name}
              merchant={"General Store"}
              normalPrice={item.retail_price}
              sellingPrice={item.selling_price}
              quantityLeft={item.quantity}
              imageUrl="https://tinyurl.com/cu8nm69m"
            />
          )}
        />
      ) : (
        <Text>No products found</Text>
      )}
    </View>
  );
}

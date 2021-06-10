import React from "react";
import { Text } from "react-native";

// Components
import ItemCardSmall from "../components/ItemCardSmall";
import { FlatGrid } from "react-native-super-grid";

// Style imports
import { GlobalStyle } from "../styles/theme";

export default function SearchResult({ navigation, route }) {
  return (
    <FlatGrid
      style={GlobalStyle.flatGrid}
      itemDimension={140}
      data={[1, 2, 3]}
      renderItem={({ item }) => (
        <ItemCardSmall
          title="Test"
          merchant="TESCO Bangsar"
          normalPrice="3.00"
          sellingPrice="2.00"
          quantityLeft="0"
        />
      )}
    />
  );
}

import React, { useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { Appbar, Button } from "react-native-paper";

// Styling
import { GlobalStyle } from "../styles/theme";
import { appBarStyles } from "../styles/appBarStyles";

export default function Cart({ navigation }) {
  return (
    <View style={GlobalStyle.screenContainer}>
      <Appbar.Header style={[appBarStyles.appBarContainer, { elevation: 0 }]}>
        <Text style={appBarStyles.appBarTitle}>CART</Text>
      </Appbar.Header>
      <ScrollView style={GlobalStyle.scrollView}>
        <Text>Cart</Text>
      </ScrollView>
    </View>
  );
}

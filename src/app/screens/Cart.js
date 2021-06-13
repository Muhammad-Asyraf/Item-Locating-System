import React, { useEffect } from "react";
import { StyleSheet, View, Text, SectionList } from "react-native";
import { Appbar, Title } from "react-native-paper";

// Component imports
import CartListItem from "../components/CartListItem";
import CartHeader from "../components/CartHeader";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  updateQuantity,
  removeProduct,
} from "../redux/cart/cartSlice";

// Styling
import { GlobalStyle } from "../styles/theme";
import { appBarStyles } from "../styles/appBarStyles";

export default function Cart({ navigation }) {
  const dispatch = useDispatch();
  const { products, quantity } = useSelector((state) => state.cart);
  const DATA = [
    {
      title: "Main dishes",
      data: ["Pizza", "Burger", "Risotto"],
    },
    {
      title: "Sides",
      data: ["French Fries", "Onion Rings", "Fried Shrimps"],
    },
  ];

  if (products.length === 0) {
    return (
      <View style={GlobalStyle.screenContainer}>
        <Appbar.Header style={[appBarStyles.appBarContainer, { elevation: 0 }]}>
          <Text style={appBarStyles.appBarTitle}>CART</Text>
        </Appbar.Header>
        <View style={[GlobalStyle.contentContainer,{justifyContent: 'center', alignItems: 'center' }]}>
          <Text>Your cart is empty!</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={GlobalStyle.screenContainer}>
      <Appbar.Header
        style={[
          appBarStyles.appBarContainer,
          { elevation: 0, borderBottomWidth: 0.5, borderBottomColor: "#CBCBCB" },
        ]}
      >
        <Text style={appBarStyles.appBarTitle}>CART</Text>
      </Appbar.Header>
      <CartHeader discount="RM45.00" price="RM300.00" />
      <SectionList
        style={styles.sectionListView}
        stickySectionHeadersEnabled={false}
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <CartListItem style={styles.listItem} />}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.listSectionContainer}>
            <Title style={styles.listSection}>{title}</Title>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionListView: {
    paddingHorizontal: 18,
    marginTop: 8,
  },
  listSectionContainer: {
    marginVertical: 8,
  },
  listSection: {
    color: "#707070",
    fontFamily: "interSemiBold",
    fontSize: 14,
    letterSpacing: 0.1,
    marginHorizontal: 16,
  },
  listItem: {
    marginVertical: 8,
  },
});

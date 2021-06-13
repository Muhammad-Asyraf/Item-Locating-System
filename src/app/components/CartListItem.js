import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Button, TextInput, Surface } from "react-native-paper";
import NumericInput from "react-native-numeric-input";

// Component imports
import SmallTextChip from "./SmallTextChip";
import LocationText from "./LocationText";

// Theme imports
import { Theme } from "../styles/theme";

export default function CartListItem({
  style,
  imageUrl = "https://tinyurl.com/cddseanu",
  merchant = "Test Industries",
  itemName = "test item",
  quantity = 14,
  sellingPrice = 30.00,
}) {
  const handleQuantityChange = () => {};

  return (
    <Surface style={[style,{ borderRadius: 5, elevation: 2 }]}>
      <View style={styles.listItemContainer}>
        <Image
          style={styles.itemImage}
          source={{ uri: imageUrl }}
        ></Image>
        <View style={styles.itemDetailsContainer}>
          <LocationText
            text={merchant}
            size={10}
            color="#707070"
            style={[styles.itemLocation, { flexDirection: "row-reverse" }]}
          />
          <View style={styles.horizontalContainer}>
            <Text style={styles.itemName}>{itemName}</Text>
            <Text style={styles.itemPrice}>{"RM" + sellingPrice + "/pc"}</Text>
          </View>
          <View style={styles.horizontalContainer}>
            <NumericInput
              initValue={quantity}
              minValue={0}
              totalHeight={30}
              onChange={handleQuantityChange}
            />
            <SmallTextChip text={"RM" + quantity * sellingPrice} />
          </View>
        </View>
      </View>
    </Surface>
  );
}

// Dedicated styling
const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexWrap: "wrap",
    flexGrow: 1,
    marginTop: 12,
  },
  listItemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "white",
  },
  itemImage: {
    height: undefined,
    width: undefined,
    aspectRatio: 1,
  },
  itemDetailsContainer: {
    padding: 8,
    flexGrow: 1,
  },
  itemLocation: {
    marginBottom: 12,
  },
  itemName: {
    fontSize: 12,
    fontFamily: "interSemiBold",
  },
  itemPrice: {
    fontSize: 12,
    fontFamily: "interSemiBold",
    color: Theme.colors.primary,
  },
  itemQuantityContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  itemQuantityButton: {},
  itemQuantityInput: {
    height: 24,
    width: 40,
    textAlign: "center",
    fontSize: 12,
    padding: 0,
  },
});

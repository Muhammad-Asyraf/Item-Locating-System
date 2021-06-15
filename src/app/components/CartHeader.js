import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

// Component imports
import SmallTextChip from "./SmallTextChip";

// Theme imports
import { Theme } from "../styles/theme";

export default function CartHeader({ discount, price }) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>Total discounts applied</Text>
        <Text style={styles.discountText}>{discount}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>Estimated total price</Text>
        <SmallTextChip text={price} size={12} marginEnd={false} />
      </View>
    </View>
  );
}

// Dedicated styling
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: "white",
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  textContainer: {
    marginVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontSize: 14,
    fontFamily: "interMedium",
    color: "#707070",
  },
  discountText: {
    fontSize: 12,
    fontFamily: "interSemiBold",
    color: Theme.colors.primary,
  },
});

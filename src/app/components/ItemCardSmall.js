import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";

// Component imports
import SmallTextChip from "./SmallTextChip";
import LocationText from "./LocationText";

// Theme import
import { Theme } from "../styles/theme";

export default function ItemCardSmall({
  style,
  title,
  merchant,
  normalPrice,
  sellingPrice,
  quantityLeft,
}) {
  return (
    <View style={styles.itemContainer}>
      <Card>
        <Card.Cover
          style={styles.image}
          // TODO: Change uri
          source={{ uri: "https://tinyurl.com/cddseanu" }}
        />
        <Card.Content style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <View style={[styles.horizontalContainer, {}]}>
            {quantityLeft == 0 ? (
              <SmallTextChip text="OUT OF STOCK" color="#FF6F00" />
            ) : null}
            <SmallTextChip text="-50%" />
          </View>
          {quantityLeft != 0 ? (
            <Text style={[styles.text, {}]}>{quantityLeft + " left"}</Text>
          ) : null}
          <View style={[styles.horizontalContainer, { marginTop: 12 }]}>
            <Text style={[styles.text, styles.normalPriceText]}>
              {"RM" + normalPrice}
            </Text>
            <Text style={[styles.text, styles.sellingPriceText]}>
              {"RM" + sellingPrice}
            </Text>
          </View>
          <LocationText
            style={{ alignSelf: "flex-end", marginTop: 16 }}
            text={merchant}
            size={10}
            color="#707070"
          />
        </Card.Content>
      </Card>
      <Button style={styles.addToCartButton} mode="outlined" compact="true">Add To Cart</Button>
    </View>
  );
}

// Dedicated styling
const styles = StyleSheet.create({
  content: {
    alignItems: "flex-start",
    paddingTop: 14,
  },
  itemContainer: {
    flexDirection: 'column',
  },
  horizontalContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginVertical: 4,
  },
  image: {
    height: undefined,
    width: undefined,
    aspectRatio: 1,
  },
  title: {
    fontSize: 12,
    fontFamily: "interSemiBold",
  },
  text: {
    fontSize: 12,
    fontFamily: "interMedium",
    color: "#707070",
  },
  normalPriceText: {
    marginVertical: 0,
    marginRight: 4,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  sellingPriceText: {
    fontSize: 14,
    fontFamily: "interSemiBold",
    color: Theme.colors.primary,
  },
  addToCartButton: {
    marginTop: 8,
  }
});

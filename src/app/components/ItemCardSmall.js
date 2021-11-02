import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import NumericInput from "react-native-numeric-input";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { addItem, changeItemQuantity, update } from "../redux/cart/cartSlice";

// Component imports
import SmallTextChip from "./SmallTextChip";
import LocationText from "./LocationText";

// Theme import
import { Theme } from "../styles/theme";

export default function ItemCardSmall({
  style,
  itemId,
  itemName,
  merchant,
  normalPrice,
  sellingPrice,
  quantityLeft,
  imageUrl,
}) {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user)
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  const [productInCart, setProductInCart] = useState(false);

  const addToCart = () => {
    console.log("Add product #" + itemId + " to cart");
    dispatch(
      addItem({
        cart_uuid: user.default_cart_uuid,
        product_uuid: itemId,
        quantity: 1,
      })
    );
    setProductInCart(true);
  };

  const handleQuantityChange = (value) => {
    dispatch(
      changeItemQuantity({
        cart_uuid: user.default_cart_uuid,
        product_uuid: itemId,
        quantity: value,
      })
    );
    if (value === 0) {
      setProductInCart(false);
    }
  };

  let itemIndex = 0;
  itemIndex = cart.products.indexOf(itemId);

  useEffect(() => {
    if (cart.products.includes(itemId)) {
      setProductInCart(true);
    } else {
      setProductInCart(false)
    }
  });

  return (
    <View style={styles.itemContainer}>
      <Card>
        <Card.Cover
          style={styles.image}
          // TODO: Change uri
          source={{ uri: imageUrl }}
        />
        <Card.Content style={styles.content}>
          <Text style={styles.title}>{itemName}</Text>
          <View style={[styles.horizontalContainer, {}]}>
            {quantityLeft == 0 ? (
              <SmallTextChip text="OUT OF STOCK" color="#FF6F00" />
            ) : null}
            {sellingPrice < normalPrice ? (
              <SmallTextChip
                text={((normalPrice - sellingPrice) / normalPrice) * 100 + "%"}
              />
            ) : null}
          </View>
          {quantityLeft != 0 ? (
            <Text style={[styles.text, {}]}>{quantityLeft + " left"}</Text>
          ) : null}
          <View style={[styles.horizontalContainer, { marginTop: 12 }]}>
            {sellingPrice > normalPrice ? (
              <Text style={[styles.text, styles.normalPriceText]}>
                {"RM" + normalPrice}
              </Text>
            ) : null}
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
      {productInCart ? (
        <NumericInput
          containerStyle={styles.quantityInput}
          totalHeight={36}
          editable={false}
          initValue={cart.quantity[itemIndex]}
          minValue={0}
          onChange={handleQuantityChange}
          rounded={true}
        />
      ) : (
        <Button
          style={styles.addToCartButton}
          mode="outlined"
          compact="true"
          onPress={addToCart}
          disabled={quantityLeft == 0}
        >
          Add To Cart
        </Button>
      )}
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
    flexDirection: "column",
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
    height: 32,
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
    height: 36,
  },
  quantityInput: {
    marginTop: 8,
    alignSelf: "center",
    borderRadius: 4,
  },
});

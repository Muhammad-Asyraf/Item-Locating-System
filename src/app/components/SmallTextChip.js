// Components
import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

// Styling
import { Theme } from "../styles/theme";

export default function SmallTextChip({
  text,
  fill = false,
  size = 10,
  color = Theme.colors.primary,
  marginEnd = true,
}) {
  return (
    <Text
      style={[
        styles.text,
        styles.chip,
        fill
          ? { backgroundColor: color, color: "white", borderWidth: 0 }
          : { borderColor: color, color: color },
        { fontSize: size },
      ]}
    >
      {text}
    </Text>
  );
}

// Dedicated styling
const styles = StyleSheet.create({
  chip: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginVertical: 2,
    borderRadius: 2,
    borderWidth: 1,
  },
  text: {
    fontFamily: "interSemiBold",
    textTransform: "uppercase",
    overflow: "hidden",
  },
});

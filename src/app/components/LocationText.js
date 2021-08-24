// Components
import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function LocationText({ text, size, color, style }) {
  return (
    <View style={[{flexDirection: 'row', alignItems: 'center'},style]}>
      <Text style={[{fontSize: size,color: color}]} >{text}</Text>
      <Icon name="location-pin" size={size+2} color={color} />
    </View>
  );
}

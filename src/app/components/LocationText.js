// Components
import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextStyle } from '../styles/Theme';

export default function LocationText({
  text,
  caption = '',
  size,
  color,
  style,
}) {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
      <Icon name="location-pin" size={16} color={color} />
      <Text
        style={[TextStyle.caption, { color: color, flexShrink: 1 }]}
        numberOfLines={1}
      >
        {`${text} \u00B7 ${caption}`}
      </Text>
    </View>
  );
}

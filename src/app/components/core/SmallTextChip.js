// Components
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

// Styling
import { Theme, TextStyle } from '../../styles/Theme';

export default function SmallTextChip(
  {
    text,
    fill = false,
    size = 10,
    color = Theme.colors.primary,
    marginEnd = true,
    style,
  },
  props
) {
  return (
    <Text
      style={[
        TextStyle.overline2,
        styles.text,
        styles.chip,
        fill
          ? { backgroundColor: color, color: 'white', borderWidth: 0 }
          : { borderColor: color, color: color },
        { fontSize: size },
        style,
      ]}
      {...props}
    >
      {text}
    </Text>
  );
}

// Dedicated styling
const styles = StyleSheet.create({
  chip: {
    paddingVertical: 1,
    paddingHorizontal: 4,
    marginVertical: 2,
    borderRadius: 2,
    borderWidth: 1,
  },
  text: {
    textTransform: 'uppercase',
    overflow: 'hidden',
  },
});

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import NumericInput from 'react-native-numeric-input';

// Styling
import { Theme } from '../../styles/Theme';

export default function CartSheet() {
  const [addQuantity, setAddQuantity] = useState(1);
  const handleQuantityChange = (value) => {
    setAddQuantity(value);
  };

  return (
    <View style={styles.container}>
      <NumericInput
        containerStyle={styles.input}
        editable={false}
        borderColor="transparent"
        value={addQuantity}
        initValue={addQuantity}
        minValue={1}
        onChange={handleQuantityChange}
        rounded={true}
      />
      <Button style={styles.button} mode="contained">
        Add To Cart
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  input: {
    marginHorizontal: 8,
  },
  button: {
    marginHorizontal: 8,
  },
});

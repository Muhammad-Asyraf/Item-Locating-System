import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function NavigateButton({ cartID }) {
  const navigation = useNavigation();

  const openNavigation = () => {
    navigation.navigate('Go', { cart_uuid: cartID });
  };

  return (
    <View>
      <Button mode="contained" style={styles.button} onPress={openNavigation}>
        Start my buying journey
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {},
});

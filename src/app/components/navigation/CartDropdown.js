import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDown from 'react-native-paper-dropdown';

// Theme
import { Theme } from '../../styles/Theme';

export default function CartDropdown({
  list,
  containerStyle,
  value,
  setValue,
}) {
  const [showState, setShowState] = useState(false);
  const inputProps = {
    underlineColor: 'white',
    style: styles.textContainer,
  };

  return (
    <View style={containerStyle}>
      <DropDown
        mode="flat"
        dropDownStyle={styles.dropdown}
        list={list}
        visible={showState}
        showDropDown={() => setShowState(true)}
        onDismiss={() => setShowState(false)}
        value={value}
        setValue={setValue}
        placeholder="Choose your cart"
        inputProps={inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    height: 48,
    fontSize: 14,
    color: Theme.colors.text,
    backgroundColor: Theme.colors.background,
    borderColor: 0,
    borderWidth: 0,
    borderRadius: 5,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  dropdown: {
    paddingTop: 8,
    borderWidth: 0,
  },
});

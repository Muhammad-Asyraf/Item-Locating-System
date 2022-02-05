import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { TextStyle } from '../../styles/Theme';

export const renderSectionHeader = ({ section }) => {
  return (
    <View style={styles.sectionHeaderContainer}>
      <Text style={TextStyle.subhead2}>{section.store}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    paddingVertical: 12,
  },
});

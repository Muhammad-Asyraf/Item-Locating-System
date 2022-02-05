import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SmallTextChip from '../core/SmallTextChip';

import { Theme } from '../../styles/Theme';

export const renderChips = (stockStatus) => {
  // Stock check
  if (stockStatus == 'In Stock') {
    return (
      <SmallTextChip
        text={stockStatus}
        fill={true}
        color={Theme.colors.ok}
        style={styles.chip}
      />
    );
  } else if (stockStatus == 'Low Stock') {
    return (
      <SmallTextChip
        text={stockStatus}
        fill={true}
        color={Theme.colors.warn}
        style={styles.chip}
      />
    );
  } else {
    return (
      <SmallTextChip
        text={stockStatus}
        fill={true}
        color={Theme.colors.error}
        style={styles.chip}
      />
    );
  }
};

const styles = StyleSheet.create({
  chip: {
    marginBottom: 4,
    flexShrink: 1,
  },
});

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';

import { Theme, TextStyle } from '../../styles/Theme';

export default function LoadingSheet({ text, style }) {
  return (
    <View style={styles.container} {...style}>
      <ProgressBar indeterminate={true} style={styles.progressBar} />
      <View style={styles.messageContainer}>
        <Text style={TextStyle.subhead1}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.roundness,
    backgroundColor: Theme.colors.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: Theme.roundness,
    borderTopRightRadius: Theme.roundness,
  },
  messageContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  messageText: {},
});

// Components
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

// Styling
import { Theme, TextStyle } from '../styles/Theme';

export default function Loading({ message }) {
  return (
    <View
      style={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator
        animating="true"
        color={Theme.colors.primary}
        size="large"
        style={{ alignSelf: 'center' }}
      />
      <Text style={[TextStyle.subhead1, { marginTop: 24 }]}>
        {message != null ? message : 'Getting your items'}
      </Text>
    </View>
  );
}

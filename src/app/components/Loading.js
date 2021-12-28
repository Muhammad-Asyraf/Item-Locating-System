// Components
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

// Styling
import { Theme } from '../styles/Theme';

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
      <Text
        style={[
          {
            fontStyle: 'normal',
            fontSize: 16,
            lineHeight: 24,
            letterSpacing: 0.5,
            marginTop: 24,
          },
        ]}
      >
        {message != null ? message : 'Getting your items'}
      </Text>
    </View>
  );
}

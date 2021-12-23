import React from 'react';
import { View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

// Utilities
import { useNavigation } from '@react-navigation/native';

// Styling
import { GlobalStyle, AppbarStyle, TextStyle } from '../../styles/Theme';

export default function AppbarScreen(props) {
  const navigation = useNavigation();

  return (
    <View style={GlobalStyle.screenContainer}>
      <Appbar.Header style={[AppbarStyle.appBarContainer, { elevation: 0 }]}>
        {navigation.canGoBack() ? (
          <Appbar.BackAction color="#007AFF" onPress={navigation.goBack} />
        ) : null}
        <Text style={[AppbarStyle.appBarTitle, TextStyle.subhead1]}>
          {props.name}
        </Text>
      </Appbar.Header>
      <View>{props.children}</View>
    </View>
  );
}

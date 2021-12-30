import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

// Utilities
import { useNavigation } from '@react-navigation/native';

// Styling
import { GlobalStyle, AppbarStyle, TextStyle } from '../../styles/Theme';

export default function AppbarScreen(props) {
  const navigation = useNavigation();

  if (props.expanded) {
    return (
      <View style={GlobalStyle.screenContainer}>
        <Appbar.Header style={[AppbarStyle.appBarContainer, styles.expanded]}>
          {navigation.canGoBack() ? (
            <Appbar.BackAction color="#FFFFFF" onPress={navigation.goBack} />
          ) : null}
          <Text style={[AppbarStyle.appBarTitle, TextStyle.subhead2]}>
            {props.name}
          </Text>
        </Appbar.Header>
        {props.children}
      </View>
    );
  }

  return (
    <View style={GlobalStyle.screenContainer}>
      <Appbar.Header style={[AppbarStyle.appBarContainer]}>
        {navigation.canGoBack() ? (
          <Appbar.BackAction color="#007AFF" onPress={navigation.goBack} />
        ) : null}
        <Text style={[AppbarStyle.appBarTitle, TextStyle.subhead2]}>
          {props.name}
        </Text>
      </Appbar.Header>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  expanded: {
    marginBottom: 42,
  },
});

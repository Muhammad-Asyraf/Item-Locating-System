import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Appbar, Button } from "react-native-paper";

// Styling
import { GlobalStyle } from "../styles/theme";
import { appBarStyles } from "../styles/appBarStyles";

export default function Lists() {
  return (
    <View style={GlobalStyle.screenContainer}>
      <Appbar.Header style={[appBarStyles.appBarContainer, { elevation: 0 }]}>
        <Text style={appBarStyles.appBarTitle}>LOKETLISTS</Text>
      </Appbar.Header>
      <ScrollView style={GlobalStyle.scrollView}>
        <Text>LOKETLISTS</Text>
      </ScrollView>
    </View>
  );
}

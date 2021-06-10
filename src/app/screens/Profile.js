import React from "react";
import auth from "@react-native-firebase/auth";
import { ScrollView, View, Text } from "react-native";
import { Appbar, Button } from "react-native-paper";

// Styling
import { GlobalStyle } from "../styles/theme";
import { appBarStyles } from "../styles/appBarStyles";

export default function Profile() {
  function logout() {
    auth()
      .signOut()
      .then(() => {
        console.log("Signed out");
      });
  }

  return (
    <View style={GlobalStyle.screenContainer}>
      <Appbar.Header style={[appBarStyles.appBarContainer, { elevation: 0 }]}>
        <Text style={appBarStyles.appBarTitle}>YOUR PROFILE</Text>
      </Appbar.Header>
      <ScrollView style={GlobalStyle.scrollView}>
        <Text>Profile</Text>
        <Button onPress={() => logout()}>Log Out</Button>
      </ScrollView>
    </View>
  );
}

import React from "react";
import auth from "@react-native-firebase/auth";
import { ScrollView, View, Text } from "react-native";
import { Appbar, Button } from "react-native-paper";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from '../redux/user/userSlice'

// Styling
import { GlobalStyle } from "../styles/theme";
import { appBarStyles } from "../styles/appBarStyles";

export default function Profile() {
  
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user)

  function logout() {
    auth()
      .signOut()
      .then(() => {
        dispatch(removeUser())
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
        <Text>{JSON.stringify(userData)}</Text>
        <Button onPress={() => logout()}>Log Out</Button>
      </ScrollView>
    </View>
  );
}

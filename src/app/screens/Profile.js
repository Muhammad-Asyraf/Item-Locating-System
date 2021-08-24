// Components
import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Appbar, Button } from "react-native-paper";

// Utilities
import auth from "@react-native-firebase/auth";

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
      <Appbar.Header style={[appBarStyles.appBarContainer,]}>
        <Text style={appBarStyles.appBarTitle}>Hello, (username)</Text>
      </Appbar.Header>
      <ScrollView style={GlobalStyle.scrollView}>
        <Button onPress={() => logout()}>Log Out</Button>
      </ScrollView>
    </View>
  );
}

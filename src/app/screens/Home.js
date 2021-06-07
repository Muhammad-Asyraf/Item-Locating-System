import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import auth from "@react-native-firebase/auth"

export default function Home() {

  function logout() {
      auth().signOut().then(() => {
          console.log("Signed out")
      })
  }

  return (
    <View>
      <Text>Logged in</Text>
      <Button onPress={() => logout()}>Log Out</Button>
    </View>
  );
}

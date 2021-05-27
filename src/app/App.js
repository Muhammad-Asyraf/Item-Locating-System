import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Theme from "./styles/theme";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Inter_500Medium as interMedium,
  Inter_700Bold as interBold,
  Inter_800ExtraBold as interBoldExtra,
} from "@expo-google-fonts/inter";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Login } from './screens/Login'

export default function App() {
  // Fonts to be used
  let [fontsLoaded] = useFonts({
    interMedium,
    interBold,
    interBoldExtra,
  });

  const  AuthTabs = createBottomTabNavigator();

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <PaperProvider theme={Theme()}>
          <AuthTabs.Navigator>
            <AuthTabs.Screen name="Login" component={Login}/>
          </AuthTabs.Navigator>

        </PaperProvider>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  footer: {},
});

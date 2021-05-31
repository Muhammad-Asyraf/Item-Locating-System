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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack"

// Screens
import Login from "./screens/Login";
import Registration from "./screens/Registration"

export default function App() {
  // Fonts to be used
  let [fontsLoaded] = useFonts({
    interMedium,
    interBold,
    interBoldExtra,
  });



  const AuthTabs = createBottomTabNavigator();
  // Authentication screen with Login/Register Tabs
  const AuthTabsScreen = () => {
    return(
    <AuthTabs.Navigator>
      <AuthTabs.Screen name="Login" component={Login} />
      <AuthTabs.Screen name="Register" component={Registration} />
    </AuthTabs.Navigator>
    )
  }
  

  const AppStack = createStackNavigator()



  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (

      // Use NavigationContainer to implement navigation throughout the app
      <NavigationContainer>

        {/* PaperProvider for global theming */}
        <PaperProvider theme={Theme()}>
          <AppStack.Navigator headerMode="none">
            <AppStack.Screen name="Auth" component={AuthTabsScreen}/>

          </AppStack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  footer: {},
});

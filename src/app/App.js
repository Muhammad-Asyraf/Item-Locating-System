import React, { useState, useEffect } from "react";
import { StyleSheet, StatusBar, Text } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Theme } from "./styles/theme";
import {
  useFonts,
  Inter_500Medium as interMedium,
  Inter_600SemiBold as interSemiBold,
  Inter_700Bold as interBold,
  Inter_800ExtraBold as interBoldExtra,
} from "@expo-google-fonts/inter";
import { NavigationContainer } from "@react-navigation/native";

// Navigation
import AuthTabsNavigator from "./navigation/AuthTabsNavigator";
import MainStackNavigator from "./navigation/MainStackNavigator";

// Auth modules
import auth from "@react-native-firebase/auth";

export default function App() {
  // Authentication states
  const [isInitializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (isInitializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // Fonts to be used
  let [fontsLoaded] = useFonts({
    interMedium,
    interSemiBold,
    interBold,
    interBoldExtra,
  });

  if (!fontsLoaded || isInitializing) {
    return <Text>Loading</Text>;
  } else {
    if (!user) {
      return (
        // Use NavigationContainer to implement navigation throughout the app
        <NavigationContainer >
          {/* PaperProvider for global theming */}
          <PaperProvider theme={Theme}>
            <AuthTabsNavigator />
          </PaperProvider>
        </NavigationContainer>
      );
    }

    return (
      // Use NavigationContainer to implement navigation throughout the app
      <NavigationContainer >
        {/* PaperProvider for global theming */}
        <PaperProvider theme={Theme}>
          <MainStackNavigator />
        </PaperProvider>
      </NavigationContainer>
    );
  }
}


import React, { useState, useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Theme } from './styles/Theme';
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import {
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';
import { NavigationContainer } from '@react-navigation/native';

// Component imports
import Loading from './components/Loading';

// Navigation
import AuthTabsNavigator from './navigation/AuthTabsNavigator';
import MainStackNavigator from './navigation/MainStackNavigator';

// Auth modules
import auth from '@react-native-firebase/auth';

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
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded || isInitializing) {
    return <Loading />;
  } else {
    if (!user) {
      return (
        // Use NavigationContainer to implement navigation throughout the app
        <NavigationContainer>
          {/* PaperProvider for global theming */}
          <PaperProvider theme={Theme}>
            <AuthTabsNavigator />
          </PaperProvider>
        </NavigationContainer>
      );
    }

    return (
      // Use NavigationContainer to implement navigation throughout the app
      <NavigationContainer>
        {/* PaperProvider for global theming */}
        <PaperProvider theme={Theme}>
          <MainStackNavigator />
        </PaperProvider>
      </NavigationContainer>
    );
  }
}

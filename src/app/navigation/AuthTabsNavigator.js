import React from 'react'
import { StyleSheet } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Screens
import Login from "../screens/Login";
import Registration from "../screens/Registration"

export default function AuthTabsNavigator() {

  const AuthTabs = createBottomTabNavigator();

  // Authentication screen with Login/Register Tabs
  return(
    <AuthTabs.Navigator>
      <AuthTabs.Screen name="Login" component={Login} />
      <AuthTabs.Screen name="Register" component={Registration} />
    </AuthTabs.Navigator>
    )

}

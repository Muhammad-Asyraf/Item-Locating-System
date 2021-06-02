import React from 'react'
import { StyleSheet } from "react-native"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

// Screens
import Login from "../screens/Login";
import Registration from "../screens/Registration"

export default function AuthTabsNavigator() {

  const AuthTabs = createMaterialTopTabNavigator();

  // Authentication screen with Login/Register Tabs
  return(
    <AuthTabs.Navigator tabBarPosition="bottom">
      <AuthTabs.Screen name="Login" component={Login} />
      <AuthTabs.Screen name="Register" component={Registration} />
    </AuthTabs.Navigator>
    )

}

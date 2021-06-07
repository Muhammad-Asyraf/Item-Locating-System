import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Screens
import Home from "../screens/Home";

export default function MainTabsNavigator() {

  const MainTabs = createBottomTabNavigator();
  // Authentication screen with Login/Register Tabs
  return(
    <MainTabs.Navigator >
      <MainTabs.Screen name="Home" component={Home} />
    </MainTabs.Navigator>
    )

}
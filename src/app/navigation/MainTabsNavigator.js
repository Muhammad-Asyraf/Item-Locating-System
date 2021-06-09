import React, {useEffect} from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from 'react-native-vector-icons/MaterialIcons'
// Screens
import Home from "../screens/Home";
import Cart from "../screens/Cart";
import Navigate from '../screens/Navigate'
import Lists from '../screens/Lists'
import Profile from '../screens/Profile'

export default function MainTabsNavigator({ navigation }) {

  const MainTabs = createMaterialBottomTabNavigator();

  return (
      <MainTabs.Navigator 
      barStyle={{
        backgroundColor: "white",
      }}
      activeColor="#007AFF"
      inactiveColor="#A0A0A0">
        <MainTabs.Screen 
        name="Home" 
        component={Home}
        options={{ 
          tabBarIcon: ({color}) => (
            <Icon name='home-filled' size={24} color={color}/>
          ),
        }} />
        <MainTabs.Screen 
        name="Cart" 
        component={Cart}
        options={{ 
          tabBarIcon: ({color}) => (
            <Icon name='shopping-cart' size={24} color={color}/>
          ),
        }}  />
        <MainTabs.Screen 
        name="Go" 
        component={Navigate}
        options={{ 
          tabBarIcon: ({color}) => (
            <Icon name='navigation' size={24} color={color}/>
          ),
        }}  />
        <MainTabs.Screen 
        name="Lists" 
        component={Lists} 
        options={{ 
          tabBarIcon: ({color}) => (
            <Icon name='list-alt' size={24} color={color}/>
          ),
        }} />
        <MainTabs.Screen 
        name="Profile" 
        component={Profile}
        options={{ 
          tabBarIcon: ({color}) => (
            <Icon name='person' size={24} color={color}/>
          ),
        }}  />
      </MainTabs.Navigator>
  );
}

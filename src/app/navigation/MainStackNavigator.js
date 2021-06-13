import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StackAppBar from "../components/StackAppBar";
import MainTabsNavigator from "./MainTabsNavigator";
import SearchResult from "../screens/SearchResult";

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName="Main"
      headerMode="none"
      screenOptions={{
        header: (props) => <StackAppBar {...props} />,
      }}
    >
      <Stack.Screen 
      name="LOKETLA" 
      component={MainTabsNavigator}
      />
      <Stack.Screen 
      name="Search Result" 
      component={SearchResult}
      />
    </Stack.Navigator>
  );
}

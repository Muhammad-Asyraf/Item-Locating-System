import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StackAppBar from "../components/StackAppBar";
import MainTabsNavigator from "./MainTabsNavigator";
import SearchResult from "../screens/SearchResult";
import auth from "@react-native-firebase/auth";

// Redux
import { useDispatch } from "react-redux";
import { setToken, setUuid } from "../redux/user/userSlice";

const Stack = createStackNavigator();

// This screen will load if and only if user is present
export default function MainStackNavigator() {

  const dispatch = useDispatch();

  // State to rerender once async is fulfilled
  const [isLoaded,setLoaded] = useState(false)

  // Load all user stuffs into global stores once everything is loaded
  useEffect(() => {
    const fetch = async () => {
      const token = await auth().currentUser.getIdToken(true)
      const uuid = await auth().currentUser.uid

      dispatch(setToken(token))
      dispatch(setUuid(uuid))
      console.log("Loaded! User uuid: " + uuid)
      setLoaded(true)
    } 

    if(!isLoaded) {
      console.log("Loading up, fetching all user data")
      fetch()
    }

  })

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

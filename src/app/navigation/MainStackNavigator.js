import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StackAppBar from "../components/StackAppBar";
import MainTabsNavigator from "./MainTabsNavigator";
import SearchResult from "../screens/SearchResult";
import Loketlist from "../screens/Loketlist"
import auth from "@react-native-firebase/auth";
import axios from "axios";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUuid, setDefaultCart, setCurrentCart } from "../redux/user/userSlice";
import { loadAllItems } from "../redux/cart/cartSlice";

// Environment configs
import { environment } from "../environment"

const Stack = createStackNavigator();

// This screen will load if and only if user is present
export default function MainStackNavigator() {

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth)

  // State to rerender once async is fulfilled
  const [isLoaded,setLoaded] = useState(false)

  // Load all user stuffs into global stores once everything is loaded
  useEffect(() => {
    const fetch = async () => {
      
      const token = await auth().currentUser.getIdToken(true)
      const uuid = await auth().currentUser.uid
      const { data } = await axios.get(environment.host + '/api/mobile/planning-cart-service/cart/default/' + uuid,authState.authHeader)

      dispatch(setToken(token))
      dispatch(setUuid(uuid))
      dispatch(setDefaultCart(data.uuid))
      dispatch(loadAllItems(data.uuid))
      dispatch(setCurrentCart(data.uuid))

      console.log("Loaded! User uuid: " + uuid)
      console.log("Default cart uuid: " + data.uuid)
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
      <Stack.Screen 
      name="Loketlist" 
      component={Loketlist}
      />
    </Stack.Navigator>
  );
}

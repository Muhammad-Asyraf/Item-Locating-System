import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import StackAppBar from '../components/StackAppBar';
import MainTabsNavigator from './MainTabsNavigator';
import SearchResult from '../screens/SearchResult';
import Loketlist from '../screens/Loketlist';
import FloorPlan from '../screens/FloorPlan';
import ProfileEdit from '../screens/ProfileEdit';
import ProductDetails from '../screens/ProductDetails';
import CategoryList from '../screens/CategoryList';
import StoreDetails from '../screens/StoreDetails';
import CampaignDetails from '../screens/CampaignDetails';
import CampaignProducts from '../screens/CampaignProducts';

// Utilities
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import { getAuthHeader } from '../services/AuthenticationService';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setToken,
  setUuid,
  setDefaultCart,
  setCurrentCart,
  updatePosition,
} from '../redux/user/userSlice';
import { loadAllItems } from '../redux/cart/cartSlice';

// Environment configs
import { environment } from '../environment';

const Stack = createStackNavigator();

// This screen will load if and only if user is present
export default function MainStackNavigator() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  // State to rerender once async is fulfilled
  const [isLoaded, setLoaded] = useState(false);

  // Initialize background geolocation
  useEffect(() => {
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: true,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
      interval: 2000,
      fastestInterval: 2000,
      activitiesInterval: 5000,
      stopOnStillActivity: false,
      url: null,
    });

    BackgroundGeolocation.on('location', (location) => {
      console.log(`onLocation : ${[location.longitude, location.latitude]}`);
      dispatch(updatePosition([location.longitude, location.latitude]));
    });

    BackgroundGeolocation.on('stationary', (stationaryLocation) => {
      // handle stationary locations here
      //Actions.sendLocation(stationaryLocation);
      console.log([stationaryLocation.longitude, stationaryLocation.latitude]);
      dispatch(
        updatePosition([
          stationaryLocation.longitude,
          stationaryLocation.latitude,
        ])
      );
    });

    BackgroundGeolocation.on('error', (error) => {
      console.log('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.on('start', () => {
      console.log('[INFO] BackgroundGeolocation service has been started');
    });

    BackgroundGeolocation.on('stop', () => {
      console.log('[INFO] BackgroundGeolocation service has been stopped');
    });

    BackgroundGeolocation.on('authorization', (status) => {
      console.log(
        '[INFO] BackgroundGeolocation authorization status: ' + status
      );
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(
          () =>
            Alert.alert(
              'App requires location tracking permission',
              'Would you like to open app settings?',
              [
                {
                  text: 'Yes',
                  onPress: () => BackgroundGeolocation.showAppSettings(),
                },
                {
                  text: 'No',
                  onPress: () => console.log('No Pressed'),
                  style: 'cancel',
                },
              ]
            ),
          1000
        );
      }
    });

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.on('abort_requested', () => {
      console.log('[INFO] Server responded with 285 Updates Not Required');

      // Here we can decide whether we want stop the updates or not.
      // If you've configured the server to return 285, then it means the server does not require further update.
      // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
      // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
    });

    BackgroundGeolocation.on('http_authorization', () => {
      console.log('[INFO] App needs to authorize the http requests');
    });

    BackgroundGeolocation.checkStatus((status) => {
      console.log(
        '[INFO] BackgroundGeolocation service is running',
        status.isRunning
      );
      console.log(
        '[INFO] BackgroundGeolocation services enabled',
        status.locationServicesEnabled
      );
      console.log(
        '[INFO] BackgroundGeolocation auth status: ' + status.authorization
      );

      // you don't need to check status before start (this is just the example)
      if (!status.isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });

    return () => {
      BackgroundGeolocation.removeAllListeners();
    };
  });

  // Load all user stuffs into global stores once UI is rendered
  useEffect(() => {
    //console.log(JSON.stringify(authState));
    // Run if the user data is not initialized
    if (!isLoaded) {
      console.log('Loading up, fetching all user data');
      BackgroundGeolocation.getCurrentLocation((location) => {
        dispatch(updatePosition([location.longitude, location.latitude]));
      });
      fetch();
    }
  }, [isLoaded]);

  const fetch = async () => {
    try {
      const uuid = auth().currentUser.uid;
      const header = await getAuthHeader();
      const { data } = await axios.get(
        environment.host +
          '/api/mobile/planning-cart-service/cart/default/' +
          uuid,
        header
      );

      dispatch(setUuid(uuid));
      dispatch(setDefaultCart(data.uuid));
      dispatch(loadAllItems(data.uuid));
      dispatch(setCurrentCart(data.uuid));

      //console.log(`User data: ${JSON.stringify(user)}`);
      // console.log('Loaded! User uuid: ' + uuid);
      // console.log('Default cart uuid: ' + data.uuid);
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName="Main"
      headerMode="none"
      screenOptions={{
        header: (props) => <StackAppBar {...props} />,
      }}
    >
      <Stack.Screen name="LOKETLA" component={MainTabsNavigator} />
      <Stack.Screen name="Loketlist" component={Loketlist} />
      <Stack.Screen name="Floor Plan" component={FloorPlan} />
      {/* Products */}
      <Stack.Screen name="Search Result" component={SearchResult} />
      <Stack.Screen name="Product Page" component={ProductDetails} />
      <Stack.Screen name="Categories" component={CategoryList} />
      {/* Stores */}
      <Stack.Screen name="Store" component={StoreDetails} />
      {/* <Stack.Screen name="Subcategories" component={CategoryList} /> */}
      {/* Profiles */}
      <Stack.Screen name="Edit Profile" component={ProfileEdit} />
      {/* Campaigns */}
      <Stack.Screen name="Campaign" component={CampaignDetails} />
      <Stack.Screen name="Campaign Products" component={CampaignProducts} />
    </Stack.Navigator>
  );
}

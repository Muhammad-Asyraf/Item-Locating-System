import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import AppbarScreen from '../components/core/AppbarScreen';
import Loading from '../components/Loading';

// Styling
import { GlobalStyle, AppbarStyle, TextStyle } from '../styles/Theme';

export default function FloorPlan({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [storeID, setStoreID] = useState(route.params.storeID);

  if (isLoading) {
    return (
      <AppbarScreen name="Floor Plan" navigation={navigation} route={route}>
        <View>
          <Loading />
        </View>
      </AppbarScreen>
    );
  }
  return (
    <AppbarScreen name="Floor Plan" navigation={navigation} route={route}>
      <View>
        <Text>{storeID}</Text>
      </View>
    </AppbarScreen>
  );
}

// Components
import React from 'react'
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

// Styling
import { Theme } from '../styles/theme'

export default function Loading() {
    return(
        <View
          style={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator
            animating="true"
            color={Theme.colors.primary}
            size="large"
            style={{ alignSelf: "center" }}
          />
          <Text
            style={{ fontSize: 16, letterSpacing:1 , marginTop: 24 }}
          >
            Getting your items
          </Text>
        </View>
    )
}
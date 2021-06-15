import { DefaultTheme } from "react-native-paper";
import { StyleSheet } from 'react-native'

export const Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#007AFF",
      background: "#F5F5F5",
      //surface: "white"
    },
  };

export const GlobalStyle = StyleSheet.create({
  
  screenContainer: {
    flexGrow: 1,
    height: "100%",
    backgroundColor: "#F5F5F5",
  },
  searchBar: {
    marginHorizontal: 18,
    marginVertical: 24,
    flexGrow: 1,
    elevation: 1,
  },
  contentContainer:{
    paddingHorizontal: 22,
    paddingVertical: 18,
  },
  flatGrid: {
    marginHorizontal: 8,
  }
})


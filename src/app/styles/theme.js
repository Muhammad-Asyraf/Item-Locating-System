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
    backgroundColor: "#F5F5F5",
  },
  searchBar: {
    marginHorizontal: 24,
    marginBottom: 18,
    elevation: 0,
    height: 40,
    backgroundColor: "#F5F5F5",
  },
  scrollView:{
    paddingHorizontal: 24,
    paddingVertical: 18,
  }
})


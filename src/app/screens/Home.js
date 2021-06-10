import React, {useState} from "react";
import auth from "@react-native-firebase/auth";
import { ScrollView, Text, View } from "react-native";
import { Appbar, Button, Searchbar } from "react-native-paper"

// Component imports
import CartListItem from "../components/CartListItem"

// Styling
import { GlobalStyle } from "../styles/theme";
import { appBarStyles } from "../styles/appBarStyles"

export default function Home({ navigation }) {

  const [searchQuery, setSearchQuery] = useState("")

  function logout() {
    auth()
      .signOut()
      .then(() => {
        console.log("Signed out");
      });
  }

  // Handle query state changes
  const handleQueryChange = (query) => setSearchQuery(query)

  // Push a search result screen
  const search = () => {
    navigation.dangerouslyGetParent().push("Search Result",{
      query: searchQuery
    });
  };


  return (
    <View style={GlobalStyle.screenContainer}>
      <Appbar.Header style={{backgroundColor: "transparent"}}>
          <Searchbar
            style={GlobalStyle.searchBar}
            placeholder="Search for something"
            onChangeText={handleQueryChange}
            onSubmitEditing={search}
          />
      </Appbar.Header>
      <ScrollView style={GlobalStyle.scrollView}>
        <CartListItem />
      </ScrollView>
    </View>
  );
}

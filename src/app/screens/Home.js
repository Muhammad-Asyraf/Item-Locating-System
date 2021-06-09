import React, {useState} from "react";
import { ScrollView, Text, View } from "react-native";
import { Appbar, Button, Searchbar } from "react-native-paper";
import auth from "@react-native-firebase/auth";
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
      <Appbar.Header style={[appBarStyles.appBarContainer,{elevation:0}]}>
        <Text style={appBarStyles.appBarTitle}>LOKETLA</Text>
      </Appbar.Header>
      <View style={appBarStyles.appBarContainer}>
          <Searchbar
            style={GlobalStyle.searchBar}
            placeholder="Search for something"
            onChangeText={handleQueryChange}
            onSubmitEditing={search}
          />
        </View>
        
      <ScrollView style={GlobalStyle.scrollView}>
        <Text>Logged in</Text>
      </ScrollView>
    </View>
  );
}

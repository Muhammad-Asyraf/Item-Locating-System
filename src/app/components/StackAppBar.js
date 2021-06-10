import React, { useState } from "react";
import { Appbar, Searchbar, Title } from "react-native-paper";

// Styling
import { appBarStyles } from "../styles/appBarStyles"

export default function StackAppBar({ navigation, previous, scene, type }) {
  let typeProp = "default";
  let query = scene.route.params.query
  if (type) typeProp = type;

  if (typeProp === "searchbar") {
    return (
      <Appbar.Header style={[appBarStyles.appBarContainer]}>
        {previous ? (
          <Appbar.BackAction color="#007AFF" onPress={navigation.goBack} />
        ) : null}
        <Searchbar style={appBarStyles.appBarSearchbar} 
        defaultValue={query}/>
      </Appbar.Header>
    );
  }

  return (
    <Appbar.Header style={[appBarStyles.appBarContainer]}>
      {previous ? (
        <Appbar.BackAction color="#007AFF" onPress={navigation.goBack} />
      ) : null}
      <Title style={appBarStyles.appBarTitle}>{scene.route.name}</Title>
    </Appbar.Header>
  );
}

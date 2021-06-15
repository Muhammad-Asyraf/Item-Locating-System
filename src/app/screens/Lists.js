import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Appbar, Portal, Dialog, Button, TextInput } from "react-native-paper";
import axios from "axios";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Environment configs
import { environment } from "../environment";

// Component imports
import LoketlistListItem from "../components/LoketlistListItem";
import Loading from "../components/Loading";

// Styling
import { GlobalStyle } from "../styles/theme";
import { appBarStyles } from "../styles/appBarStyles";

export default function Lists() {
  const [isLoading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [loketlists, setLoketlists] = useState();

  const user = useSelector((state) => state.user);

  // Dialog functions
  const showDialog = () => setVisible(true);
  const closeDialog = () => setVisible(false);

  // Dialog states
  const [listName, setListName] = useState("")

  useEffect(() => {
    const fetchLoketlists = async () => {
      const { data } = await axios.get(
        environment.host +
          "/api/mobile/planning-cart-service/carts/" +
          user.uuid
      );
      let loketlists = [];
      for (i = 0; i < data.length; i++) {
        if (data[i].is_default == true) {
          loketlists.push({
            uuid: data[i].uuid,
            app_user_uuid: data[i].app_user_uuid,
            name: "General Cart",
            updated_at: data[i].updated_at,
          });
        } else {
          loketlists.push({
            uuid: data[i].uuid,
            app_user_uuid: data[i].app_user_uuid,
            name: data[i].name,
            updated_at: data[i].updated_at,
          });
        }
      }
      setLoketlists(loketlists);
      setLoading(false);
    };
    if (isLoading) {
      fetchLoketlists();
    }
  }, [isLoading]);

  // Dialog handlers
  const handleNameChange = (text) => {
    setListName(text)
  }

  const refresh = () => {
    setLoading(true);
  };
  const addList = async () => {
    // Add cart to back end
    const { data } = await axios.post(environment.host + '/api/mobile/planning-cart-service/cart/create',{
      app_user_uuid: user.uuid,
      name: listName
    })
    closeDialog()
    // Refresh the page
    setLoading(true)
  };

  return (
    <View>
      <View style={GlobalStyle.screenContainer}>
        <Appbar.Header style={[appBarStyles.appBarContainer, styles.appBar]}>
          <Text style={appBarStyles.appBarTitle}>LOKETLISTS</Text>
          <Appbar.Action
            icon="plus"
            onPress={() => {
              console.log("Open add new list dialog");
              showDialog();
            }}
          />
        </Appbar.Header>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            style={styles.flatListView}
            data={loketlists}
            onRefresh={refresh}
            refreshing={isLoading}
            renderItem={({ item }) => (
              <LoketlistListItem item={item} store_count={1} />
            )}
          />
        )}
      </View>
      <Dialog visible={visible} onDismiss={closeDialog}>
        <Dialog.Title>Add a new list</Dialog.Title>
        <Dialog.Content>
          <TextInput label="Name" onChangeText={handleNameChange}/>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={closeDialog}>Cancel</Button>
          <Button onPress={addList}>Add</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    justifyContent: "space-between",
  },
  flatListView: {
    paddingHorizontal: 18,
    paddingTop: 12,
  },
});

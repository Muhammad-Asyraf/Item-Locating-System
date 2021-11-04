import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Appbar, Dialog, Button, TextInput } from "react-native-paper";
import LoketlistListItem from "../components/LoketlistListItem";
import Loading from "../components/Loading";

// Utilities
import axios from "axios";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Environment configs
import { environment } from "../environment";

// Styling
import { GlobalStyle } from "../styles/theme";
import { appBarStyles } from "../styles/appBarStyles";

export default function Lists() {
  const [isLoading, setLoading] = useState(true);
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [loketlists, setLoketlists] = useState();

  const [controlCartUuid, setControlCartUuid] = useState("");

  const user = useSelector((state) => state.user);

  // Dialog states
  const [listName, setListName] = useState("");
  let name = listName

  // Dialog functions
  const showAddDialog = () => setAddVisible(true);
  const closeAddDialog = () => setAddVisible(false);
  const showEditDialog = ({ uuid, name }) => {
    setControlCartUuid(uuid);
    setListName(name);
    setEditVisible(true);
  };
  const closeEditDialog = () => setEditVisible(false);

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
            key: i,
            uuid: data[i].uuid,
            app_user_uuid: data[i].app_user_uuid,
            name: "General Cart",
            updated_at: data[i].updated_at,
          });
        } else {
          loketlists.push({
            key: i,
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
  const submitEdit = async () => {
    // Add cart to back end
    const { data } = await axios.patch(
      environment.host + "/api/mobile/planning-cart-service/cart/update",
      {
        app_user_uuid: user.uuid,
        cart_uuid: controlCartUuid,
        name: listName,
      }
    );
    closeEditDialog();
    // Refresh
    setLoading(true);
  };

  const submitDelete = async () => {
    // Add cart to back end
    const { data } = await axios.delete(
      environment.host + "/api/mobile/planning-cart-service/cart/delete",
      {
        data: {
          app_user_uuid: user.uuid,
          cart_uuid: controlCartUuid,
        }
      }
    );
    closeEditDialog();
    // Refresh
    setLoading(true);
  };

  const handleNameChange = (text) => {
    setListName(text);
  };

  const refresh = () => {
    setLoading(true);
  };
  const addList = async () => {
    // Add cart to back end
    const { data } = await axios.post(
      environment.host + "/api/mobile/planning-cart-service/cart/create",
      {
        app_user_uuid: user.uuid,
        name: listName,
      }
    );
    closeAddDialog();
    // Refresh the page
    setLoading(true);
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
              showAddDialog();
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
              <TouchableOpacity
                onPress={null}
                onLongPress={() => showEditDialog(item)}
              >
                <LoketlistListItem item={item} store_count={1} />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <Dialog visible={addVisible} onDismiss={closeAddDialog}>
        <Dialog.Title>Add a new list</Dialog.Title>
        <Dialog.Content>
          <TextInput label="Name" onChangeText={handleNameChange} />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={closeAddDialog}>Cancel</Button>
          <Button onPress={addList}>Add</Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog visible={editVisible} onDismiss={closeEditDialog}>
        <Dialog.Title>Manage {name}</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Name"
            value={listName}
            onChangeText={handleNameChange}
          />
          <Button
            style={{ marginTop: 24 }}
            mode="contained"
            onPress={submitDelete}
          >
            Delete
          </Button>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={closeEditDialog}>Cancel</Button>
          <Button onPress={submitEdit}>Save</Button>
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

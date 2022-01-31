import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Appbar, Dialog, Button, Title, TextInput } from 'react-native-paper';
import LoketlistListItem from '../components/LoketlistListItem';
import Loading from '../components/Loading';

// Utilities
import axios from 'axios';
import { getAuthHeader } from '../services/AuthenticationService';
import {
  getAllCartsForUser,
  createNewCart,
  deleteCart,
  modifyCart,
} from '../services/LoketlistService';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Environment configs
import { environment } from '../environment';

// Styling
import { GlobalStyle, AppbarStyle, TextStyle } from '../styles/Theme';

export default function Lists() {
  const [isLoading, setLoading] = useState(true);
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [loketlists, setLoketlists] = useState();

  const [controlCartUuid, setControlCartUuid] = useState('');

  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);

  // Dialog states
  const [listName, setListName] = useState('');
  let name = listName;

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
      const data = await getAllCartsForUser(user.uuid);

      let loketlists = [];
      for (i = 0; i < data.length; i++) {
        if (data[i].is_default == true) {
          loketlists.push({
            key: i,
            ...data[i],
            name: 'General Cart',
          });
        } else {
          loketlists.push({
            key: i,
            ...data[i],
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
    modifyCart(user.uuid, controlCartUuid, listName)
      .then((data) => {})
      .catch((error) => {});
    closeEditDialog();
    // Refresh
    setLoading(true);
  };

  const submitDelete = async () => {
    deleteCart(user.uuid, controlCartUuid)
      .then((data) => {})
      .catch((error) => {});
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
    createNewCart(user.uuid, listName)
      .then((data) => {})
      .catch((error) => {});
    closeAddDialog();
    // Refresh the page
    setLoading(true);
  };

  return (
    <View style={GlobalStyle.screenContainer}>
      <Appbar.Header style={[AppbarStyle.transparent, AppbarStyle.padding]}>
        <Title style={TextStyle.headline5}>Your Loketlists</Title>
        <Appbar.Action
          style={AppbarStyle.appBarButtons}
          icon="plus"
          onPress={showAddDialog}
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
              <LoketlistListItem item={item} />
            </TouchableOpacity>
          )}
        />
      )}
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
    justifyContent: 'space-between',
  },
  flatListView: {
    paddingHorizontal: 18,
    paddingTop: 12,
  },
});

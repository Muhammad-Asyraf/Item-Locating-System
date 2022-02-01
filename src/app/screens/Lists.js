import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Appbar, Dialog, Button, Title, TextInput } from 'react-native-paper';
import LoketlistListItem from '../components/LoketlistListItem';
import Loading from '../components/Loading';

// Utilities
import {
  getAllCartsForUser,
  createNewCart,
  deleteCart,
  modifyCart,
} from '../services/LoketlistService';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Styling
import { GlobalStyle, AppbarStyle, TextStyle } from '../styles/Theme';

export default function Lists({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [loketlists, setLoketlists] = useState();

  const [controlCartUuid, setControlCartUuid] = useState('');

  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);

  // Dialog states
  const [listName, setListName] = useState('');
  const nameRef = useRef(null);

  // Dialog functions
  const showAddDialog = () => setAddVisible(true);
  const closeAddDialog = () => setAddVisible(false);
  const showEditDialog = ({ uuid, name }) => {
    setControlCartUuid(uuid);
    nameRef.current = name;
    setListName(name);
    setEditVisible(true);
  };
  const closeEditDialog = () => setEditVisible(false);

  const fetchLoketlists = async () => {
    const data = await getAllCartsForUser(user.uuid);

    let loketlists = [];
    for (i = 0; i < data.length; i++) {
      if (data[i].is_default == true) {
        loketlists.unshift({
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

  useEffect(() => {
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
        <Title style={[TextStyle.headline5, GlobalStyle.flexGrow]}>
          Your Loketlists
        </Title>
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
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                if (item.is_default) {
                  navigation.navigate('Cart');
                } else {
                  // Open loketlist
                  navigation
                    .dangerouslyGetParent()
                    .navigate('Loketlist', { ...item });
                }
              }}
              onLongPress={() => {
                if (!item.is_default) {
                  showEditDialog(item);
                }
              }}
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
        <Dialog.Title>Manage {nameRef.current}</Dialog.Title>
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

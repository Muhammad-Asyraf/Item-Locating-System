// Components
import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Appbar, Button, Title, Text, Card, Dialog } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from 'react-native-qrcode-svg';
import ProfileImage from '../components/core/ProfileImage';

// Utilities
import auth from '@react-native-firebase/auth';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../redux/user/userSlice';

// Styling
import { Theme, GlobalStyle, TextStyle, AppbarStyle } from '../styles/Theme';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const { uuid, userObject } = useSelector((state) => state.user);
  const [isDialogVisible, setDialogVisible] = useState(false);

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(removeUser());
        console.log('Signed out');
      });
  };

  const editProfile = () => {
    console.log('Open edit profile page');

    // Open ProfileEdit screen
    navigation.dangerouslyGetParent().navigate('Edit Profile', {});
  };

  const showQRDialog = () => {
    setDialogVisible(true);
  };
  const hideQRDialog = () => {
    setDialogVisible(false);
  };

  return (
    <View style={GlobalStyle.screenContainer}>
      <Appbar.Header style={[AppbarStyle.transparent, AppbarStyle.padding]}>
        <Title style={[TextStyle.headline5]}>Profile</Title>
      </Appbar.Header>

      <View style={GlobalStyle.contentContainer}>
        <Card style={styles.profileCard}>
          <View style={styles.profileContainer}>
            <View>
              <ProfileImage style={styles.profileImage} />
            </View>
            <View style={styles.profileTextContainer}>
              <Text style={[TextStyle.subhead1, styles.profileText]}>
                {userObject.username}
              </Text>
              <Text style={[TextStyle.caption, styles.profileText]}>
                {userObject.email}
              </Text>
            </View>
            <View style={styles.profileButtonContainer}>
              <Icon2.Button
                name="qrcode"
                size={24}
                iconStyle={styles.profileIcon}
                backgroundColor="transparent"
                onPress={showQRDialog}
              ></Icon2.Button>
              <Icon.Button
                name="edit"
                size={24}
                iconStyle={styles.profileIcon}
                backgroundColor="transparent"
                onPress={editProfile}
              ></Icon.Button>
            </View>
          </View>
        </Card>

        <ScrollView style={styles.scrollViewContainer} scrollEnabled={false}>
          <Button onPress={logout}>Change Password</Button>
          <Button onPress={logout}>Log Out</Button>
        </ScrollView>
      </View>

      <Dialog visible={isDialogVisible}>
        <Dialog.Title>Your QR Code</Dialog.Title>
        <Dialog.Content
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <QRCode value={uuid} />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideQRDialog}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  scrollViewContainer: {
    marginTop: 18,
  },
  profileCard: {
    padding: 16,
    backgroundColor: Theme.colors.primary,
  },
  profileContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    height: 56,
    width: 56,
    borderRadius: 1000,
  },
  profileTextContainer: {
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  profileText: {
    color: 'white',
    textAlign: 'center',
  },
  profileIcon: {
    marginRight: 0,
    alignSelf: 'center',
  },
  profileButtonContainer: {
    flexDirection: 'row',
  },
});

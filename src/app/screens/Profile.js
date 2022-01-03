// Components
import React, { useState, useRef } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import {
  Appbar,
  Button,
  Title,
  Text,
  Card,
  Dialog,
  Snackbar,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from 'react-native-qrcode-svg';
import PhoneInput from 'react-native-phone-number-input';
import ProfileImage from '../components/core/ProfileImage';

// Utilities
import auth from '@react-native-firebase/auth';
import { updateUser } from '../services/BackendService';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setUserObject, removeUser } from '../redux/user/userSlice';

// Styling
import { Theme, GlobalStyle, TextStyle, AppbarStyle } from '../styles/Theme';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const { uuid, userObject } = useSelector((state) => state.user);
  const { authHeader } = useSelector((state) => state.auth);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [isQRDialogVisible, setQRDialogVisible] = useState(false);
  const [isPwDialogVisible, setPwDialogVisible] = useState(false);
  const [isPhoneDialogVisible, setPhoneDialogVisible] = useState(false);

  const phoneInput = useRef(null);
  const phoneRegex = new RegExp('^\\+[0-9]+$');
  const [isPhoneValid, setPhoneValid] = useState(true);
  const [phoneNum, setPhoneNum] = useState();
  const [fullPhoneNum, setFullPhoneNum] = useState();

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

  const handlePhoneNumChange = () => {
    if (isPhoneValid) {
      let userObject = {
        phone: fullPhoneNum,
        phone_country_code: `+${phoneInput.current.getCallingCode()}`,
      };
      updateUser(uuid, userObject)
        .then((user) => {
          dispatch(setUserObject(user));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          hidePhoneDialog();
          setSnackbarMessage('Phone number updated!');
          setSnackbarVisible(true);
        });
    } else {
      setSnackbarMessage('Number is not valid');
      setSnackbarVisible(true);
    }
  };

  const showPasswordDialog = () => {
    setPwDialogVisible(true);
  };

  const hidePasswordDialog = () => {
    setPwDialogVisible(false);
  };

  const showQRDialog = () => {
    setQRDialogVisible(true);
  };
  const hideQRDialog = () => {
    setQRDialogVisible(false);
  };

  const showPhoneDialog = () => {
    setPhoneDialogVisible(true);
  };
  const hidePhoneDialog = () => {
    setPhoneDialogVisible(false);
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
          <Button onPress={showPhoneDialog}>Change Phone Number</Button>
          <Button onPress={showPasswordDialog}>Change Password</Button>
          <Button icon="logout" onPress={logout}>
            Log Out
          </Button>
        </ScrollView>
      </View>

      {/* User account tag */}
      <Dialog visible={isQRDialogVisible} onDismiss={hideQRDialog}>
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

      {/* Change Phone number */}
      <Dialog visible={isPhoneDialogVisible} onDismiss={hidePhoneDialog}>
        <Dialog.Title>Change Phone Number</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.dialogText}>
            Current phone number :{' '}
            {userObject.phone != null ? userObject.phone : 'Not Specified'}
          </Text>
          <PhoneInput
            ref={phoneInput}
            value={phoneNum}
            defaultCode="MY"
            layout="first"
            onChangeFormattedText={(text) => {
              setFullPhoneNum(text);
              if (!phoneRegex.test(text)) {
                setPhoneValid(false);
              } else {
                setPhoneValid(true);
              }
            }}
            onChangeText={(text) => {
              setPhoneNum(text);
            }}
            containerStyle={styles.phoneInputContainer}
            textInputProps={(keyboardType = 'number-pad')}
            autoFocus
          />
          {!isPhoneValid && (
            <Text style={styles.dialogText}>Invalid phone number!</Text>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hidePhoneDialog}>Cancel</Button>
          <Button onPress={handlePhoneNumChange}>Confirm</Button>
        </Dialog.Actions>
      </Dialog>

      {/* Change Password */}
      <Dialog visible={isPwDialogVisible} onDismiss={hidePasswordDialog}>
        <Dialog.Title>Change Password</Dialog.Title>
        <Dialog.Content></Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hidePasswordDialog}>Close</Button>
        </Dialog.Actions>
      </Dialog>

      <Snackbar
        visible={snackbarVisible}
        duration={4000}
        onDismiss={() => {
          setSnackbarVisible(false);
        }}
      >
        {snackbarMessage}
      </Snackbar>
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
  phoneInputContainer: {
    width: 'auto',
  },
  dialogText: { marginVertical: 8 },
});

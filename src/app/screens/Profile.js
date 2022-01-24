// Components
import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import {
  Appbar,
  Button,
  Title,
  Text,
  TextInput,
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
import {
  updateUser,
  updatePassword,
  updateEmail,
} from '../services/BackendService';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setUserObject, removeUser } from '../redux/user/userSlice';

// Styling
import { Theme, GlobalStyle, TextStyle, AppbarStyle } from '../styles/Theme';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const { uuid, userObject } = useSelector((state) => state.user);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [isQRDialogVisible, setQRDialogVisible] = useState(false);
  const [isEmailDialogVisible, setEmailDialogVisible] = useState(false);
  const [isPwDialogVisible, setPwDialogVisible] = useState(false);
  const [isPhoneDialogVisible, setPhoneDialogVisible] = useState(false);

  const phoneInput = useRef(null);
  const phoneRegex = new RegExp('^\\+[0-9]+$');
  const [isPhoneValid, setPhoneValid] = useState(true);
  const [phoneNum, setPhoneNum] = useState();
  const [fullPhoneNum, setFullPhoneNum] = useState();

  const [newEmail, setNewEmail] = useState();

  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [password, setPassword] = useState({
    old: '',
    new: '',
    confirmation: '',
  });
  const [passwordSecure, setPasswordSecure] = useState({
    old: false,
    new: false,
    confirmation: false,
  });
  const [passwordError, setPasswordError] = useState({
    old: false,
    new: false,
    confirmation: false,
  });

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
          hidePhoneDialog();
          setSnackbarMessage('Phone number updated!');
          setSnackbarVisible(true);
        })
        .catch((error) => {
          setSnackbarMessage(`Error: ${error}`);
          setSnackbarVisible(true);
        });
    } else {
      setSnackbarMessage('Number is not valid');
      setSnackbarVisible(true);
    }
  };

  const handlePasswordChange = () => {
    if (password.new.length >= 8) {
      setPasswordError({ ...passwordError, new: false });
      if (password.new === password.confirmation) {
        updatePassword(uuid, {
          oldPassword: password.old,
          newPassword: password.new,
        })
          .then((data) => {
            if (typeof data == 'string') {
              if (data.includes('[password-incorrect]')) {
                setPasswordErrorMessage('Old password incorrect');
                setPasswordError({ ...passwordError, old: true });
              }
            } else {
              hidePasswordDialog();
              setSnackbarMessage('Password updated');
              setSnackbarVisible(true);
            }
          })
          .catch((error) => {
            setSnackbarMessage(`Error: ${error}`);
            setSnackbarVisible(true);
          })
          .finally(() => {
            setPassword({
              old: '',
              new: '',
              confirmation: '',
            });
            setPasswordSecure({
              old: false,
              new: false,
              confirmation: false,
            });
            setPasswordError({
              old: false,
              new: false,
              confirmation: false,
            });
          });
      } else {
        setPasswordError({ ...passwordError, confirmation: true });
        setPasswordErrorMessage('Confirmation password does not match');
      }
    } else {
      setPasswordErrorMessage(
        'Password must be at least 8 alphanumerical letters'
      );
      setPasswordError({ ...passwordError, new: true });
    }
  };

  const handleEmailChange = () => {
    if (newEmail != userObject.email) {
      let emailObject = { new: newEmail };
      updateEmail(uuid, emailObject)
        .then((user) => {
          dispatch(setUserObject(user));
          hideEmailDialog();
          setSnackbarMessage('Email updated!');
          setSnackbarVisible(true);
        })
        .catch((error) => {
          setSnackbarMessage(`Error: ${error}`);
          setSnackbarVisible(true);
        });
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

  const showEmailDialog = () => {
    setEmailDialogVisible(true);
  };
  const hideEmailDialog = () => {
    setEmailDialogVisible(false);
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
          <Button onPress={showEmailDialog}>Change Email</Button>
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

      {/* Change email */}
      <Dialog visible={isEmailDialogVisible} onDismiss={hideEmailDialog}>
        <Dialog.Title>Change email</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.dialogText}>
            {`Current email : ${userObject.email}`}
          </Text>
          <TextInput
            autoCapitalize="none"
            label="New Email"
            value={newEmail}
            onChangeText={(text) => {
              setNewEmail(text);
            }}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideEmailDialog}>Cancel</Button>
          <Button onPress={handleEmailChange}>Confirm</Button>
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
        <Dialog.Content>
          <TextInput
            autoCapitalize="none"
            label="Old Password"
            style={styles.passwordTextInput}
            value={password.old}
            error={passwordError.old}
            secureTextEntry={passwordSecure.old}
            onChangeText={(text) => {
              setPassword({
                ...password,
                old: text,
              });
            }}
            right={
              <TextInput.Icon
                name="eye"
                onPress={() => {
                  setPasswordSecure({
                    ...passwordSecure,
                    old: !passwordSecure.old,
                  });
                }}
              />
            }
          />
          <TextInput
            autoCapitalize="none"
            label="New Password"
            style={styles.passwordTextInput}
            value={password.new}
            error={passwordError.new}
            secureTextEntry={passwordSecure.new}
            onChangeText={(text) => {
              setPassword({
                ...password,
                new: text,
              });
            }}
            right={
              <TextInput.Icon
                name="eye"
                onPress={() => {
                  setPasswordSecure({
                    ...passwordSecure,
                    new: !passwordSecure.new,
                  });
                }}
              />
            }
          />
          <TextInput
            autoCapitalize="none"
            label="Confirm New Password"
            style={styles.passwordTextInput}
            value={password.confirmation}
            error={passwordError.confirmation}
            secureTextEntry={passwordSecure.confirmation}
            onChangeText={(text) => {
              setPassword({
                ...password,
                confirmation: text,
              });
            }}
            right={
              <TextInput.Icon
                name="eye"
                onPress={() => {
                  setPasswordSecure({
                    ...passwordSecure,
                    confirmation: !passwordSecure.confirmation,
                  });
                }}
              />
            }
          />
          {Object.values(passwordError).includes(true) && (
            <Text style={styles.dialogText}>{passwordErrorMessage}</Text>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hidePasswordDialog}>Cancel</Button>
          <Button onPress={handlePasswordChange}>Change</Button>
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
  passwordTextInput: {
    fontSize: 14,
    marginVertical: 8,
  },
});

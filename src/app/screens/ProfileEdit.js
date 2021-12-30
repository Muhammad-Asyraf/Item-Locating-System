import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Paragraph, Button, TextInput, Dialog } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import AppbarScreen from '../components/core/AppbarScreen';
import ProfileImage from '../components/core/ProfileImage';
import Loading from '../components/Loading';

// Utilities
import { updateUser } from '../services/BackendService';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setUserObject } from '../redux/user/userSlice';

// Styling
import { Theme, GlobalStyle, AppbarStyle, TextStyle } from '../styles/Theme';

export default function ProfileEdit({ navigation, route }) {
  const { uuid, userObject } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [isDialogVisible, setDialogVisible] = useState(false);

  // Profile TextInput states
  const [userName, setUserName] = useState(userObject.username);
  const [firstName, setFirstName] = useState(userObject.first_name);
  const [lastName, setLastName] = useState(userObject.last_name);
  const [phone, setPhone] = useState(userObject.phone);
  const [dob, setDob] = useState();
  const [ISOdob, setISODob] = useState();

  useEffect(() => {
    if (isLoading) {
      if (userObject.birth_date != null) {
        setDob(new Date(userObject.birth_date).toLocaleDateString('en-GB'));
      } else {
        setDob('Not specified');
      }
      // Fetch user data here
      setLoading(false);
    }
  });

  const showCalendar = () => {
    setCalendarVisible(true);
  };

  const hideCalendar = () => {
    setCalendarVisible(false);
  };

  const showDialog = () => {
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  const handleDate = (date) => {
    //console.log(date);
    setDob(date.toLocaleDateString('en-GB'));
    setISODob(date.toISOString());
    hideCalendar();
  };
  const handleSubmit = () => {
    console.log(`Submitting?`);

    // Create new userObject
    let user;

    if (userObject.birth_date == null) {
      user = {
        first_name: firstName,
        last_name: lastName,
        username: userName,
        birth_date: ISOdob,
      };
    } else {
      user = {
        first_name: firstName,
        last_name: lastName,
        username: userName,
      };
    }

    updateUser(uuid, user)
      .then((newUserObject) => {
        dispatch(setUserObject(newUserObject));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        hideDialog();
      });
  };

  if (isLoading) {
    return (
      <AppbarScreen name="Edit Profile" navigation={navigation} route={route}>
        <View style={[GlobalStyle.contentContainer]}>
          <Loading message="Fetching profile data" />
        </View>
      </AppbarScreen>
    );
  }
  return (
    <AppbarScreen
      expanded={true}
      name="Edit Profile"
      navigation={navigation}
      route={route}
    >
      <View style={[GlobalStyle.contentContainer, styles.container]}>
        <ProfileImage style={styles.profileImage} />

        <View style={styles.form}>
          <TextInput
            autoCapitalize="none"
            style={styles.textInput}
            label="Username"
            value={userName}
            onChangeText={(text) => setUserName(text)}
          />
          <TextInput
            autoCapitalize="none"
            style={styles.textInput}
            label="First Name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
          <TextInput
            autoCapitalize="none"
            style={styles.textInput}
            label="Last Name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
          <TextInput
            style={styles.textInput}
            disabled={true}
            label="Phone Number"
            value={phone}
          />
          <TextInput
            style={styles.textInput}
            disabled={true}
            label="Birth Date"
            value={dob}
            onChangeText={(text) => setDob(text)}
            right={
              userObject.birth_date == null && (
                <TextInput.Icon
                  name="calendar"
                  color={Theme.colors.primary}
                  onPress={showCalendar}
                />
              )
            }
          />
        </View>

        <Button style={styles.submitForm} onPress={showDialog}>
          Save Changes
        </Button>
      </View>

      <DateTimePicker
        isVisible={isCalendarVisible}
        onConfirm={handleDate}
        onCancel={hideCalendar}
      />

      <Dialog visible={isDialogVisible} onDismiss={hideDialog}>
        <Dialog.Title>Update Profile</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Are you sure?</Paragraph>
          {userObject.birth_date == null && (
            <Paragraph>
              You will not be able to change your birthdate in the future
            </Paragraph>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={handleSubmit}>Confirm</Button>
        </Dialog.Actions>
      </Dialog>
    </AppbarScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
  profileImage: {
    position: 'absolute',
    top: -42,
    zIndex: 1,
    height: 84,
    width: 84,
    borderRadius: 1000,
    alignSelf: 'center',
  },
  form: {
    marginTop: 48,
  },
  submitForm: {
    marginTop: 18,
  },
  textInput: {
    backgroundColor: 'transparent',
    fontSize: 14,
    marginHorizontal: 16,
    marginVertical: 4,
  },
});

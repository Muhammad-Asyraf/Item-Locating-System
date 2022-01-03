import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import {
  TextInput,
  Title,
  Paragraph,
  Button,
  HelperText,
} from 'react-native-paper';

// Utilites
import auth from '@react-native-firebase/auth';
import axios from 'axios';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setToken, setUuid } from '../redux/user/userSlice';

// Styling
import { TextStyle } from '../styles/Theme';

// Environment configs
import { environment } from '../environment';

export default function Registration() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isPasswordConfirmed, setPasswordConfirmed] = useState(true);

  const handleUsernameChange = (username) => {
    setCredentials({
      ...credentials,
      username: username,
    });
  };

  const handleEmailChange = (email) => {
    validateEmail(email);
  };

  const handlePasswordChange = (password) => {
    setCredentials({
      ...credentials,
      password: password,
    });
  };

  const handlePasswordConfirm = (password) => {
    if (password === credentials.password) {
      setPasswordConfirmed(true);
    } else {
      setPasswordConfirmed(false);
    }
  };

  const validateEmail = (text) => {
    let reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');
      return false;
    } else {
      setCredentials({
        ...credentials,
        email: text,
      });
      console.log('Email is Correct');
      return true;
    }
  };

  const handleSignUp = () => {
    console.log(credentials);
    if (isPasswordConfirmed) {
      axios
        .post(environment.host + '/api/mobile/app-user-service/signup/email', {
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        })
        .then((res) => {
          console.log(res.data.user.uuid);
          dispatch(setUuid(res.data.user.uuid));
          // Authenticate
          auth()
            .signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(() => {
              auth()
                .currentUser.getIdToken(true)
                .then((idToken) => {
                  dispatch(setToken(idToken));
                })
                .finally(() => {
                  console.log('Signed in : ' + token);
                });
            })
            .catch((error) => {
              if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
              }

              if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
              }

              if (error.code === 'auth/user-not-found') {
                // Error handling here
              }

              console.error(error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <ScrollView
      style={{ ...styles.container }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
    >
      <Title style={[TextStyle.headline2, styles.title]}>Sign Up.</Title>
      <Paragraph style={styles.description}>
        Please enter your details to sign up
      </Paragraph>

      <View style={styles.textInputContainer}>
        <TextInput
          onChangeText={handleEmailChange}
          autoCompleteType="email"
          textContentType="emailAddress"
          autoCapitalize="none"
          label="Email"
          style={styles.textInput}
        />
        <TextInput
          onChangeText={handleUsernameChange}
          autoCapitalize="none"
          label="Username"
          style={styles.textInput}
        />
        <TextInput
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
          textContentType="password"
          autoCapitalize="none"
          label="Password"
          style={styles.textInput}
        />
        <TextInput
          secureTextEntry={true}
          onChangeText={handlePasswordConfirm}
          textContentType="password"
          autoCapitalize="none"
          label="Confirm Password"
          style={styles.textInput}
        />
      </View>

      <Button
        onPress={handleSignUp}
        style={[styles.button, styles.signUpButton]}
        labelStyle={styles.buttonLabel}
        mode="contained"
      >
        Sign Up
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  footer: {},
  title: {
    marginTop: 54,
    marginBottom: 16,
  },
  description: {
    fontSize: 12,
    color: '#545454',
  },
  forgotPassword: {
    marginVertical: 24,
    alignSelf: 'center',
    fontSize: 10,
    color: '#545454',
  },
  container: {
    height: '100%',
    paddingHorizontal: 48,
    backgroundColor: 'white',
  },
  textInputContainer: {
    paddingVertical: 24,
  },
  textInput: {
    backgroundColor: 'transparent',
    marginVertical: 5,
    fontSize: 14,
  },
  buttonContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    marginTop: 24,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  signUpButton: {},
  buttonLabel: {},
  googleButtonLabel: {
    fontSize: 12,
    color: '#545454',
  },
});

import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { TextInput, Title, Paragraph, Button } from "react-native-paper";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import auth from '@react-native-firebase/auth'

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "default",
    password: "default",
  });

  const handleEmailChange = (email) => {
    validateEmail(email);
  };

  const handlePasswordChange = (password) => {
    setCredentials({
      ...credentials,
      password: password,
    });
  };

  const handleLogIn = () => {
    console.log(credentials);

    // Authenticate
    auth().signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      console.log("Signed in")

    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
  
      console.error(error);
    })
  };

  const validateEmail = (text) => {
    let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      return false;
    }
    else {
      setCredentials({
        ...credentials,
        email: text,
      });
      console.log("Email is Correct");
      return true
    }
  }

  return (
    <ScrollView style={{...styles.container, paddingBottom: useBottomTabBarHeight()}} contentContainerStyle={{flexGrow:1, justifyContent: "center"}}>
      <Title style={styles.title}>Hello There.</Title>
      <Paragraph style={styles.description}>
        Please login or sign up to continue
      </Paragraph>

      <View style={styles.textInputContainer}>
        <TextInput
          onChangeText={handleEmailChange}
          autoCompleteType="email"
          autoCapitalize="none"
          label="Email"
          style={styles.textInput}
        />
        <TextInput
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
          autoCapitalize="none"
          label="Password"
          style={styles.textInput}
        />
      </View>

      <Button labelStyle={styles.forgotPassword}>
        Forgot password? Reset here
      </Button>

      <View style={styles.buttonContainerRow}>
        <Button
          onPress={handleLogIn}
          style={[styles.button, styles.signInButton]}
          labelStyle={styles.buttonLabel}
          mode="contained"
        >
          Sign In
        </Button>

        {/* TODO: Add google icon */}
        <Button
          style={[styles.button, styles.googleSignInButton]}
          labelStyle={styles.googleButtonLabel}
          mode="contained"
        >
          Google
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    lineHeight: 36,
    fontSize: 36,
    marginTop: 54,
    marginBottom: 16,
    fontFamily: "interBold",
  },
  description: {
    fontSize: 12,
    color: "#545454",
  },
  forgotPassword: {
    marginVertical: 24,
    alignSelf: "center",
    fontSize: 10,
    color: "#545454",
  },
  container: {
    height: "100%",
    paddingHorizontal: 48,
  },
  textInputContainer: {
    paddingVertical: 24,
  },
  textInput: {
    backgroundColor: "transparent",
    marginVertical: 5,
    fontSize: 12,
  },
  buttonContainerRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    marginTop: 24,
    paddingVertical: 3,
  },
  signInButton: {},
  googleSignInButton: {
    backgroundColor: "white",
  },
  buttonLabel: {
    fontSize: 12,
  },
  googleButtonLabel: {
    fontSize: 12,
    color: "#545454",
  },
});

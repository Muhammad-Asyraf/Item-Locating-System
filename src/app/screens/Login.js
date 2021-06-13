import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { TextInput, Title, Paragraph, Button } from "react-native-paper";
import axios from "axios";

// Environment configs
import { environment } from "../environment";

// Authentication
import auth from "@react-native-firebase/auth";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setToken, setUuid } from "../redux/user/userSlice";

export default function Login() {
  const dispatch = useDispatch();
  const {token, uuid} = useSelector((state) => state.user);

  const [credentials, setCredentials] = useState({
    email: "danishrashidin@gmail.com",
    password: "danish123",
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
    auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(async () => {
        try {
          const { data } = await axios.get(
            environment.host + "/api/mobile/app-user-service/app-user/email/" + credentials.email,
          );
          const idToken = await auth().currentUser.getIdToken(true);
          dispatch(setToken(idToken))
          dispatch(setUuid(data.uuid))

          console.log('User : \n' + token + '\n' + uuid)

        } catch (err) {
          console.log(err)
        }
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        if (error.code === "auth/user-not-found") {
          // Error handling here
        }

        console.error(error);
      });
  };

  const validateEmail = (text) => {
    let reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      return false;
    } else {
      setCredentials({
        ...credentials,
        email: text,
      });
      console.log("Email is Correct");
      return true;
    }
  };

  return (
    <ScrollView
      style={{ ...styles.container }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <Title style={styles.title}>Hello There.</Title>
      <Paragraph style={styles.description}>
        Please login or sign up to continue
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
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
          textContentType="password"
          autoCapitalize="none"
          label="Password"
          style={styles.textInput}
        />
      </View>

      <Button labelStyle={styles.forgotPassword}>
        Forgot password? Reset here
      </Button>

      <Button
        onPress={handleLogIn}
        style={[styles.button, styles.signInButton]}
        labelStyle={styles.buttonLabel}
        mode="contained"
      >
        Sign In
      </Button>

      <Paragraph
        style={{ ...styles.description, alignSelf: "center", marginTop: 24 }}
      >
        OR
      </Paragraph>

      {/* TODO: Add google icon */}
      <Button
        style={[styles.button, styles.googleSignInButton]}
        labelStyle={styles.googleButtonLabel}
        mode="outlined"
      >
        Sign in with Google
      </Button>
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
    fontSize: 14,
    color: "#545454",
  },
  forgotPassword: {
    marginVertical: 12,
    alignSelf: "center",
    fontSize: 12,
    color: "#545454",
  },
  container: {
    height: "100%",
    paddingHorizontal: 48,
    backgroundColor: "white",
  },
  textInputContainer: {
    paddingVertical: 24,
  },
  textInput: {
    backgroundColor: "transparent",
    marginVertical: 5,
    fontSize: 14,
  },
  buttonContainerRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    marginTop: 24,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  signInButton: {},
  googleSignInButton: {},
  buttonLabel: {},
  googleButtonLabel: {
    color: "#545454",
  },
});

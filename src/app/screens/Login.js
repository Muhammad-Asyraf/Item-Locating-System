import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import {
  TextInput, 
  Title,
  Paragraph,
  Button
} from "react-native-paper";

function Login() {
      
    return(
        <ScrollView style={styles.container}>
          <Title style={styles.title}>Hello There.</Title>
          <Paragraph style={styles.description}>
            Please login or sign up to continue
          </Paragraph>

          <View style={styles.textInputContainer}>
            <TextInput label="Email" style={styles.textInput} />
            <TextInput label="Password" style={styles.textInput} />
          </View>

          <Button labelStyle={styles.forgotPassword}>Forgot password? Reset here</Button>

          <View style={styles.buttonContainerRow}>
            <Button style={[styles.button,styles.signInButton]} labelStyle={styles.buttonLabel} mode="contained">
              Sign In
            </Button>
        
            {/* TODO: Add google icon */}
            <Button style={[styles.button,styles.googleSignInButton]} labelStyle={styles.googleButtonLabel} mode="contained">
              Google
            </Button>
          </View>

          <StatusBar style="auto" />
        </ScrollView>
    )

}

const styles = StyleSheet.create({
  footer: {

  },
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
    flexDirection: 'row',
    justifyContent: "space-evenly"

  },
  button: {
    marginTop: 24,
    paddingVertical: 3,
  },
  signInButton: {
  },
  googleSignInButton: {
    backgroundColor: 'white'
  },
  buttonLabel: {
    fontSize: 12
  },
  googleButtonLabel: {
    fontSize: 12,
    color: "#545454"
  }
});


export default function Login()
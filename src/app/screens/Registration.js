import React from 'react';
import { StyleSheet, ScrollView, View, Text } from "react-native";
import {
  TextInput, 
  Title,
  Paragraph,
  Button
} from "react-native-paper";

export default function Registration() {
    return(
        <ScrollView style={{...styles.container,}} contentContainerStyle={{flexGrow:1, justifyContent: "center"}}>
          <Title style={styles.title}>Sign Up.</Title>
          <Paragraph style={styles.description}>
            Please enter your details to sign up
          </Paragraph>

          <View style={styles.textInputContainer}>
            <TextInput label="Email" style={styles.textInput} />
            <TextInput label="Username" style={styles.textInput} />
            <TextInput label="Password" style={styles.textInput} />
            <TextInput label="Confirm Password" style={styles.textInput} />
          </View>

          <View style={styles.buttonContainerRow}>
            <Button style={[styles.button,styles.signUpButton]} labelStyle={styles.buttonLabel} mode="contained">
              Sign Up
            </Button>
          </View>

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
      backgroundColor: "white"
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
    signUpButton: {
    },
    buttonLabel: {
      fontSize: 12
    },
    googleButtonLabel: {
      fontSize: 12,
      color: "#545454"
    }
  });
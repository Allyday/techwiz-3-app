import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useTheme, Button, TextInput } from "react-native-paper";
import React, { useState } from "react";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const SignIn = (props, { navigation }) => {
  const { colors } = useTheme();
  const [text, setText] = useState("");

  const styles = StyleSheet.create({
    viewInput: {
      backgroundColor: "#fff",
      width: "100%",
      height: SCREEN_HEIGHT / 2,
      alignItems: "center",
      justifyContent: "space-around",
      borderTopEndRadius: 30,
    },
    textSignin: {
      color: "#fff",
      marginTop: 30,
      fontSize: 30,
      fontWeight: "400",
    },
    textInput: {
      width: SCREEN_WIDTH - 80,
      backgroundColor: "#fff",
    },
  });
  return (
    <View style={{ backgroundColor: colors.secondary }}>
      <View style={styles.viewInput}>
        <TextInput
          style={styles.textInput}
          label="Email"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <TextInput
          style={styles.textInput}
          label="Password"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <Button
          mode="contained"
          onPress={() => props.navigation.replace("Root", { screen: "Home" })}
          style={{
            borderRadius: 50,
            width: 300,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Sign In
        </Button>
        <Button
          onPress={() => props.setStatusLogin(1)}
          labelStyle={{ fontSize: 15 }}
        >
          Forgot password
        </Button>
        {/* <Button
            title="Go to Home"
            onPress={() => navigation.replace("Root", { screen: "Home" })}
          /> */}
      </View>
    </View>
  );
};

export default SignIn;

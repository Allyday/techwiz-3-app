import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useTheme, Button, TextInput } from "react-native-paper";
import React, { useState } from "react";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const GenerateOTP = (props, { navigation }) => {
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
        <View>
          <Button
            mode="contained"
            onPress={() => console.log("Pressed")}
            style={{
              borderRadius: 50,
              width: 300,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Generate OTP
          </Button>
          <Button
            onPress={() => props.setStatusLogin(0)}
            labelStyle={{ fontSize: 15 }}
          >
            Cancel
          </Button>
        </View>

        {/* <Button
            title="Go to Home"
            onPress={() => navigation.replace("Root", { screen: "Home" })}
          /> */}
      </View>
    </View>
  );
};

export default GenerateOTP;

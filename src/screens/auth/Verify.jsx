import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useTheme, Button, TextInput } from "react-native-paper";
import React, { useState } from "react";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Verify = (props, { navigation }) => {
  const { colors } = useTheme();
  const [text, setText] = useState("");
  const [number, onChangeNumber] = React.useState(null);
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
      width: 50,
      height: 50,
      backgroundColor: "#eaecef",
      borderRadius: 10,
      margin: 5,
    },
  });
  return (
    <View style={{ backgroundColor: colors.secondary }}>
      <View style={styles.viewInput}>
        <View>
          <Text style={{ fontSize: 16, marginBottom: 10, fontWeight: "600" }}>
            Enter OTP
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              underlineColor="transparent"
              style={styles.textInput}
              onChangeText={onChangeNumber}
              value={number}
              keyboardType="numeric"
            />
            <TextInput
              underlineColor="transparent"
              style={styles.textInput}
              onChangeText={onChangeNumber}
              value={number}
              keyboardType="numeric"
            />
            <TextInput
              underlineColor="transparent"
              style={styles.textInput}
              onChangeText={onChangeNumber}
              value={number}
              keyboardType="numeric"
            />
            <TextInput
              underlineColor="transparent"
              style={styles.textInput}
              onChangeText={onChangeNumber}
              value={number}
              keyboardType="numeric"
            />
            <TextInput
              underlineColor="transparent"
              style={styles.textInput}
              onChangeText={onChangeNumber}
              value={number}
              keyboardType="numeric"
            />
            <TextInput
              underlineColor="transparent"
              style={styles.textInput}
              onChangeText={onChangeNumber}
              value={number}
              keyboardType="numeric"
            />
          </View>
          <Button
            onPress={() => props.setStatusLogin(0)}
            labelStyle={{ fontSize: 15 }}
            style={{ alignItems: "flex-start", marginLeft: -15 }}
          >
            Send Again
          </Button>
        </View>

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
            Verify
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

export default Verify;

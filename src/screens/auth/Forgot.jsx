import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useTheme, Button, TextInput, HelperText } from "react-native-paper";
import React, { useState } from "react";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI } from "../../apis";

const Forgot = (props, { navigation }) => {
  const { colors } = useTheme();
  const [text, setText] = useState("");
  const [passNew, setPassNew] = useState("");
  const [valid, setValid] = React.useState(false);

  const layMatKhau = async () => {
    const getPin = await AsyncStorage.getItem("getPin");

    if (text == passNew) {
      setValid(false);
      const resVerifyOTP = await authAPI.verifyOTP({
        pin: JSON.parse(getPin).pin,
        token: JSON.parse(getPin).payload.token,
        new_password: passNew,
        email: JSON.parse(getPin).email,
      });
      if (resVerifyOTP.data) {
        props.setStatusLogin(0);
      } else {
        console.log(resVerifyOTP.data);
      }
    } else {
      setValid(true);
    }
  };

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
          label="Create New Password"
          value={passNew}
          secureTextEntry={true}
          onChangeText={(text) => setPassNew(text)}
        />
        <HelperText type="error" visible={valid}>
          Mật khẩu không hợp lệ
        </HelperText>
        <TextInput
          style={styles.textInput}
          label="Confim New Password"
          value={text}
          secureTextEntry={true}
          onChangeText={(text) => setText(text)}
        />
        <Button
          mode="contained"
          onPress={() => layMatKhau()}
          style={{
            borderRadius: 50,
            width: 300,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Submit
        </Button>
        <Button
          onPress={() => props.setStatusLogin(1)}
          labelStyle={{ fontSize: 15 }}
        >
          Cancel
        </Button>
        {/* <Button
            title="Go to Home"
            onPress={() => navigation.replace("Root", { screen: "Home" })}
          /> */}
      </View>
    </View>
  );
};

export default Forgot;

import { StyleSheet, View, Dimensions } from "react-native";
import { Button, TextInput, HelperText } from "react-native-paper";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { authAPI } from "../../apis";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Forgot = ({ setStatusLogin, ...props }) => {
  const [text, setText] = useState("");
  const [passNew, setPassNew] = useState("");
  const [valid, setValid] = useState(false);

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
        setStatusLogin(0);
      }
    } else {
      setValid(true);
    }
  };

  return (
    <>
      <TextInput
        style={styles.textInput}
        label="New password"
        value={passNew}
        secureTextEntry={true}
        onChangeText={setPassNew}
      />
      <TextInput
        style={styles.textInput}
        label="Confim new password"
        value={text}
        secureTextEntry={true}
        onChangeText={setText}
      />
      <HelperText type="error" visible={valid}>
        Password does not match.
      </HelperText>
      <Button
        mode="contained"
        onPress={layMatKhau}
        uppercase={false}
        style={props.buttonStyle}
        contentStyle={props.buttonContentStyle}
      >
        Submit
      </Button>
      <Button
        onPress={() => setStatusLogin(1)}
        uppercase={false}
        style={props.buttonStyle}
        contentStyle={props.buttonContentStyle}
      >
        Cancel
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  textSignin: {
    color: "#fff",
    marginTop: 30,
    fontSize: 30,
    fontWeight: "400",
  },
  textInput: {
    width: '100%',
    backgroundColor: "#fff",
  },
});

export default Forgot;

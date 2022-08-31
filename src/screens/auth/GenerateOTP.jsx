import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, HelperText } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { authAPI } from "../../apis";

const GenerateOTP = (props) => {
  const [text, setText] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);

  const validateEmail = () => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (text.match(mailformat)) {
      setEmailInvalid(false);
      return true;
    } else {
      setEmailInvalid(true);
      return false;
    }
  };

  const getPin = async () => {
    const checkEmail = validateEmail();
    if (checkEmail) {
      const resGetPin = await authAPI.getPin("", {
        email: text,
      });
      if (resGetPin.data.result == "success") {
        resGetPin.data.email = text;
        await AsyncStorage.setItem("getPin", JSON.stringify(resGetPin.data));
        await props.setStatusLogin(2);
      } else {
        throw new Error("Wrong password");
      }
    }
  };

  return (
    <>
      <TextInput
        style={styles.textInput}
        label="Email"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <HelperText type="error" visible={emailInvalid}>
        Invalid email
      </HelperText>
      <View>
        <Button
          mode="contained"
          onPress={getPin}
          uppercase={false}
          style={props.buttonStyle}
          contentStyle={props.buttonContentStyle}
        >
          Generate OTP
        </Button>
        <Button
          onPress={() => props.setStatusLogin(0)}
          uppercase={false}
          style={props.buttonStyle}
          contentStyle={props.buttonContentStyle}
        >
          Cancel
        </Button>
      </View>
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

export default GenerateOTP;

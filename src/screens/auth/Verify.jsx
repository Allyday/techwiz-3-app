import { Text } from "react-native";
import { useTheme, Button, HelperText } from "react-native-paper";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { authAPI } from "../../apis";
import { set } from "lodash";

const OTP_LENGTH = 6;

const Verify = (props) => {
  const { colors } = useTheme();
  const [valid, setValid] = useState(false);
  const [otp, setOtp] = useState("");
  const [clearInput, setClearInput] = useState(false);

  // auto verify
  useEffect(() => {
    if (otp.length === OTP_LENGTH) verify();
  }, [otp]);

  const verify = async () => {
    // setOtp('');
    const getPin = await AsyncStorage.getItem("getPin");
    if (otp == JSON.parse(getPin).pin) {
      props.setStatusLogin(3);
      // const resVerifyOTP = await authAPI.verifyOTP({
      //   pin: `${number1}${number2}${number3}${number4}${number5}${number6}`,
      //   token: JSON.parse(getPin).payload.token,
      //   new_password: passNew,
      //   email: JSON.parse(getPin).email,
      // });
      // console.log(resVerifyOTP.data);
    } else {
      setValid(true);
    }

    // if (resVerifyOTP.data.result == "success") {
    //   resGetPin.data.email = email;
    //   await AsyncStorage.setItem("getPin", JSON.stringify(resGetPin.data));
    //   await props.setStatusLogin(2);
    // } else {
    //   throw new Error("Wrong password");
    // }
  };

  const resendCode = async () => {
    setOtp("");
    setValid(false);
    const getPin = await AsyncStorage.getItem("getPin");
    const resGetPin = await authAPI.getPin("", {
      email: JSON.parse(getPin).email,
    });
    if (resGetPin.data.result == "success") {
      resGetPin.data.email = JSON.parse(getPin).email;
      await AsyncStorage.setItem("getPin", JSON.stringify(resGetPin.data));
    } else {
      throw new Error("Wrong password");
    }
  };

  return (
    <>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 10,
          fontWeight: "600",
        }}
      >
        Enter OTP
      </Text>
      <OTPInputView
        pinCount={OTP_LENGTH}
        style={{
          height: 50,
          color: colors.secondary,
        }}
        codeInputFieldStyle={{
          backgroundColor: "#eaecef",
          borderWidth: 0,
          color: colors.secondary,
          fontSize: 16,
          fontWeight: "600",
        }}
        autoFocusOnLoad
        placeholderTextColor={colors.secondary}
        // clearInputs={clearInput}
        onCodeChanged={setOtp}
        onCodeFilled={e=>console.log(e)}
        code={otp}
      />
      <HelperText type="error" visible={valid}>
        Invalid OTP.
      </HelperText>

      <Button
        mode="contained"
        onPress={resendCode}
        uppercase={false}
        style={props.buttonStyle}
        contentStyle={props.buttonContentStyle}
      >
        Resend code
      </Button>
      <Button
        onPress={() => props.setStatusLogin(0)}
        uppercase={false}
        style={props.buttonStyle}
        contentStyle={props.buttonContentStyle}
      >
        Cancel
      </Button>
    </>
  );
};

export default Verify;

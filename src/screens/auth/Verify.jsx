import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useTheme, Button, TextInput, HelperText } from "react-native-paper";
import React, { useState } from "react";
import { authAPI } from "../../apis";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
import AsyncStorage from "@react-native-async-storage/async-storage";

const Verify = (props, { navigation }) => {
  const { colors } = useTheme();
  const [text, setText] = useState("");
  const [number1, onChangeNumber1] = React.useState(null);
  const [number2, onChangeNumber2] = React.useState(null);

  const [number3, onChangeNumber3] = React.useState(null);

  const [number4, onChangeNumber4] = React.useState(null);

  const [number5, onChangeNumber5] = React.useState(null);

  const [number6, onChangeNumber6] = React.useState(null);
  const [passNew, setPassNew] = React.useState("adminadmin");
  const [valid, setValid] = React.useState(false);

  const verify = async () => {
    const getPin = await AsyncStorage.getItem("getPin");
    if (
      `${number1}${number2}${number3}${number4}${number5}${number6}` ==
      JSON.parse(getPin).pin
    ) {
      props.setStatusLogin(3);
      setValid(false);
      // const resVerifyOTP = await authAPI.verifyOTP({
      //   pin: `${number1}${number2}${number3}${number4}${number5}${number6}`,
      //   token: JSON.parse(getPin).payload.token,
      //   new_password: passNew,
      //   email: JSON.parse(getPin).email,
      // });
      // console.log(resVerifyOTP.data);
    } else {
      setValid(true);
      console.log("sai otp r");
    }

    // if (resVerifyOTP.data.result == "success") {
    //   resGetPin.data.email = email;
    //   await AsyncStorage.setItem("getPin", JSON.stringify(resGetPin.data));
    //   await props.setStatusLogin(2);
    // } else {
    //   throw new Error("Wrong password");
    // }
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
              onChangeText={onChangeNumber1}
              value={number1}
              keyboardType="numeric"
            />
            <TextInput
              underlineColor="transparent"
              style={styles.textInput}
              onChangeText={onChangeNumber2}
              value={number2}
              keyboardType="numeric"
            />
            <TextInput
              underlineColor="transparent"
              style={styles.textInput}
              onChangeText={onChangeNumber3}
              value={number3}
              keyboardType="numeric"
            />
            <TextInput
              underlineColor="transparent"
              style={styles.textInput}
              onChangeText={onChangeNumber4}
              value={number4}
              keyboardType="numeric"
            />
            <TextInput
              underlineColor="transparent"
              style={styles.textInput}
              onChangeText={onChangeNumber5}
              value={number5}
              keyboardType="numeric"
            />
            <TextInput
              underlineColor="transparent"
              style={styles.textInput}
              onChangeText={onChangeNumber6}
              value={number6}
              keyboardType="numeric"
            />
          </View>
          {/* UPDATE SAU */}
          <HelperText type="error" visible={valid}>
            Sai OTP
          </HelperText>
        </View>

        <View>
          <Button
            mode="contained"
            onPress={() => verify()}
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

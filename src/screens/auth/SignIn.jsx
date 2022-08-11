import { StyleSheet, View, Dimensions } from "react-native";
import { useTheme, Button, HelperText, TextInput } from "react-native-paper";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authAPI from "../../apis/authAPI";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const SignIn = (props, { navigation }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const styles = StyleSheet.create({
    viewInput: {
      backgroundColor: "#fff",
      width: "100%",
      height: SCREEN_HEIGHT / 2,
      alignItems: "center",
      justifyContent: "space-around",
      borderTopEndRadius: 30,
    },
    textInput: {
      width: SCREEN_WIDTH - 80,
      backgroundColor: "#fff",
    },
  });
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const validateEmail = () => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
      setEmailInvalid(false);
      return true;
    } else {
      setEmailInvalid(true);
      return false;
    }
  };

  const signIn = async () => {
    setWrongPassword(false)
    const checkEmail = validateEmail();
    if (checkEmail) {
      const resLogin = await authAPI.login({
        email: email,
        password: password,
      });
      if (resLogin.data.success) {
        const { access, user } = resLogin.data.data;
        await AsyncStorage.setItem("access", access);
        await AsyncStorage.setItem("user", JSON.stringify(user));
        await props.navigation.replace('Root', {
          screen: 'Home',
          role: user.role,
        });
      } else {
        setWrongPassword(true)
        console.log("sai mật khẩu rồi mày ơi");
      }
    }
  };
  return (
    <View style={{ backgroundColor: colors.secondary }}>
      <View style={styles.viewInput}>
        <>
          <TextInput
            error={false}
            style={styles.textInput}
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <HelperText type="error" visible={emailInvalid}>
            Invalid email
          </HelperText>
        </>
        <>
          <TextInput
            style={styles.textInput}
            label="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
          <HelperText type="error" visible={wrongPassword}>
            Wrong password. Please try again :)
          </HelperText>
        </>
        <Button
          mode="contained"
          uppercase={false}
          onPress={signIn}
          //   onPress={() => props.navigation.replace("Root", { screen: "Home" })}
          style={{ borderRadius: 50, overflow: 'hidden' }}
          contentStyle={{
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
          uppercase={false}
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

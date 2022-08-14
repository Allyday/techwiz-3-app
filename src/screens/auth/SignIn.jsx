import { StyleSheet, View, Dimensions } from "react-native";
import { useTheme, Button, HelperText, TextInput } from "react-native-paper";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authAPI from "../../apis/authAPI";
import { useToken } from "../../hooks/useToken";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const SignIn = ({ setStatusLogin, navigation }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState("student1@yopmail.com");
  const [password, setPassword] = useState("admin");

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
  const [wrongPassword, setWrongPassword] = useState(false);
  const [token, setToken] = useToken();
  const [emailInvalid, setEmailInvalid] = useState(false);

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
    setWrongPassword(false);
    const checkEmail = validateEmail();
    if (checkEmail) {
      try {
        const resLogin = await authAPI.login({ email, password });
        if (resLogin.data.success) {
          const { access, user, info_child } = resLogin.data.data;
          setToken(access);
          await AsyncStorage.setItem("access", access);
          await AsyncStorage.setItem("user", JSON.stringify(user));

          if (user.role === "PARENT") {
            if (info_child)
              await AsyncStorage.setItem(
                "info_child",
                JSON.stringify(info_child)
              );
            /* navigate straight to report card if only have 1 child */
            if (info_child.length === 1)
              navigation.replace("Root", {
                screen: "ReportCard",
                role: user.role,
                params: {
                  screen: "ReportCardScreen",
                  params: { student: info_child[0] },
                },
              });
            else
              navigation.replace("Root", {
                screen: "ReportCard",
                role: user.role,
                params: { children: info_child },
              });
          } else
            navigation.replace("Root", {
              screen: "Home",
              role: user.role,
            });
        } else {
          throw new Error("Wrong password");
        }
      } catch (error) {
        setWrongPassword(true);
        console.log(JSON.stringify(error));
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
          //   onPress={() => navigation.replace("Root", { screen: "Home" })}
          style={{ borderRadius: 50, overflow: "hidden" }}
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
          onPress={() => setStatusLogin(1)}
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

export default SignIn;

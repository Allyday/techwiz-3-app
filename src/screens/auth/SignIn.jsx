import { StyleSheet, View, Dimensions } from "react-native";
import { useTheme, Button, HelperText, TextInput } from "react-native-paper";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authAPI from "../../apis/authAPI";
import { useToken } from "../../hooks/useToken";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const SignIn = (props, { navigation }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState("student1@gmail.com");
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
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [token, setToken] = useToken();

  React.useEffect(() => {
    const a = async () => {
      console.log("địt mẹ m");
      setToken(
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYyOTc5MzM5LCJqdGkiOiI1NmNlNGNlMTkyMDM0YTBkYjVmNTU0MTFkOWVmY2U3MyIsInVzZXJfaWQiOjJ9.X6hh3d_4iEtvhvrIOee3t6N-qpcJis0qqkVHrhHO8z8"
      );
      await AsyncStorage.setItem(
        "access",
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYyOTc5MzM5LCJqdGkiOiI1NmNlNGNlMTkyMDM0YTBkYjVmNTU0MTFkOWVmY2U3MyIsInVzZXJfaWQiOjJ9.X6hh3d_4iEtvhvrIOee3t6N-qpcJis0qqkVHrhHO8z8"
      );
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          id: 2,
          last_login: null,
          created_at: "2022-07-18T21:05:05",
          updated_at: "2022-08-13T10:42:19.571783",
          first_name: "Huy ",
          last_name: "Hoang",
          username: "student1",
          email: "student1@gmail.com",
          phone: "0948372384",
          role: "STUDENT",
          avatar_url: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          address: "Cau Giay, Ha Noi, Viet Nam",
          date_of_birth: "2000-05-03T00:00:00",
          deleted_at: null,
        })
      );
      await props.navigation.replace("Root", {
        screen: "Home",
        role: "STUDENT",
      });
    };
    a();
  }, []);

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
        console.log(resLogin);
        if (resLogin.data.success) {
          const { access, user } = resLogin.data.data;
          setToken(access);
          await AsyncStorage.setItem("access", access);
          await AsyncStorage.setItem("user", JSON.stringify(user));
          await props.navigation.replace("Root", {
            screen: "Home",
            role: user.role,
          });
        } else {
          throw new Error("Wrong password");
        }
      } catch (error) {
        setWrongPassword(true);
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

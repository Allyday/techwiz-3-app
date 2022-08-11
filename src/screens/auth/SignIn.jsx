import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useTheme, Button, TextInput } from "react-native-paper";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authAPI from "../../apis/authAPI";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const SignIn = (props, { navigation }) => {
  const { colors } = useTheme();
  const [text, setText] = useState("");
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
  const [emailValid, setEmailValid] = useState(false);

  const validateEmail = () => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
      setEmailValid(false);
      return true;
    } else {
      setEmailValid(true);
      return false;
    }
  };
  const signIn = async () => {
    const checkEmail = validateEmail();
    if (checkEmail) {
      const resLogin = await authAPI.login({
        email: email,
        password: password,
      });
      if (resLogin.data.success) {
        await AsyncStorage.setItem("access", resLogin.data.data.access);
        await AsyncStorage.setItem(
          "user",
          JSON.stringify(resLogin.data.data.user)
        );
        await props.navigation.replace("Root", { screen: "Home" });
      } else {
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
            onChangeText={(text) => setEmail(text)}
          />
          {emailValid && (
            <Text
              style={{
                color: "#F1416C",
                marginLeft: 20,
                marginTop: 10,
                width: SCREEN_WIDTH - 80,
                textAlign: "left",
              }}
            >
              Email không hợp lệ
            </Text>
          )}
        </>

        <TextInput
          style={styles.textInput}
          label="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          mode="contained"
          onPress={() => signIn()}
          //   onPress={() => props.navigation.replace("Root", { screen: "Home" })}
          style={{
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

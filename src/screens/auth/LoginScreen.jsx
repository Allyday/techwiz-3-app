import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useTheme, Button, TextInput } from "react-native-paper";
import React, { useState } from "react";
import SignIn from "./SignIn";
import GenerateOTP from "./GenerateOTP";
import Verify from "./Verify";
import Forgot from "./Forgot";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [text, setText] = useState("");
  const [statusLogin, setStatusLogin] = useState(0);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
    },
    viewLogo: {
      backgroundColor: colors.secondary,
      width: "100%",
      height: SCREEN_HEIGHT / 2,
      alignItems: "center",
      justifyContent: "center",
      borderBottomStartRadius: 30,
    },
    viewInput: {
      backgroundColor: "#fff",
      width: "100%",
      height: SCREEN_HEIGHT / 2,
      alignItems: "center",
      justifyContent: "space-around",
      borderTopEndRadius: 30,
    },
    textLogo: {
      fontSize: 16,
      fontWeight: "800",
      color: colors.primary,
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
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.viewLogo}>
          <SimpleLineIcons
            name="graduation"
            size={150}
            color={colors.primary}
          />
          <Text style={styles.textLogo}>SMART Study</Text>
          <Text style={styles.textSignin}>Sign In</Text>
        </View>
      </View>
      {statusLogin == 0 && (
        <SignIn
          statusLogin={statusLogin}
          setStatusLogin={(statusLogin) => setStatusLogin(statusLogin)}
          navigation={navigation}
        />
      )}
      {statusLogin == 1 && (
        <GenerateOTP
          statusLogin={statusLogin}
          setStatusLogin={(statusLogin) => setStatusLogin(statusLogin)}
          navigation={navigation}
        />
      )}
      {statusLogin == 2 && (
        <Verify
          statusLogin={statusLogin}
          setStatusLogin={(statusLogin) => setStatusLogin(statusLogin)}
          navigation={navigation}
        />
      )}
      {statusLogin == 3 && (
        <Forgot
          statusLogin={statusLogin}
          setStatusLogin={(statusLogin) => setStatusLogin(statusLogin)}
          navigation={navigation}
        />
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

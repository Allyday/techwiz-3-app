import { useState } from "react";
import { StyleSheet } from "react-native";
import { useTheme, Button, HelperText, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import authAPI from "../../apis/authAPI";
import { useToken } from "../../hooks/useToken";
import { loginUser } from "../../store-redux/actions/user";

const SignIn = ({ setStatusLogin, navigation, buttonStyle, buttonContentStyle }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          dispatch(loginUser(user));

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
      }
    }
  };
  return (
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
      <Button
        mode="contained"
        uppercase={false}
        onPress={signIn}
        style={buttonStyle}
        contentStyle={buttonContentStyle}
      >
        Sign In
      </Button>
      <Button
        onPress={() => setStatusLogin(1)}
        uppercase={false}
        style={buttonStyle}
        contentStyle={buttonContentStyle}
      >
        Forgot password
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    backgroundColor: "#fff",
  },
});

export default SignIn;

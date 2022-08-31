import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { useTheme } from "react-native-paper";
import { useState, useMemo } from "react";

import SignIn from "./SignIn";
import GenerateOTP from "./GenerateOTP";
import Verify from "./Verify";
import Forgot from "./Forgot";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const authSteps = [SignIn, GenerateOTP, Verify, Forgot];

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [statusLogin, setStatusLogin] = useState(0);

  const CurrentAuthStep = useMemo(
    () => authSteps[statusLogin], [statusLogin, authSteps]
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={[styles.viewLogo, { backgroundColor: colors.secondary }]}>
          <Image
            style={{
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH * 150 / 280,
            }}
            source={require("../../assets/adaptive-icon.png")}
          />
          <Text style={[styles.textLogo, { color: colors.primary }]}>
            Smart Study
          </Text>
          <Text style={styles.textSignin}>Sign In</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: colors.secondary }}>
          <View style={styles.viewInput}>
            <CurrentAuthStep
              statusLogin={statusLogin}
              setStatusLogin={setStatusLogin}
              navigation={navigation}
              buttonStyle={styles.buttonStyle}
              buttonContentStyle={styles.buttonContentStyle}
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },
  viewLogo: {
    flex: 1,
    maxHeight: SCREEN_HEIGHT / 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomStartRadius: 30,
  },
  viewInput: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopEndRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  textLogo: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: -32,
  },
  textSignin: {
    color: "#fff",
    marginVertical: 24,
    fontSize: 30,
  },
  buttonStyle: { borderRadius: 50, overflow: "hidden", marginTop: 8 },
  buttonContentStyle: {
    borderRadius: 50,
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default LoginScreen;

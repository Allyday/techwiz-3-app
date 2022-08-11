import { StyleSheet, Text, View, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button title="Go to Login" onPress={() => navigation.replace('Login')} />
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

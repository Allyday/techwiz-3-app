import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useToken } from '../../hooks/useToken';

export default function HomeScreen({ navigation }) {
  const [token, setToken] = useToken();

  const logout = async () => {
    await AsyncStorage.removeItem('access');
    await AsyncStorage.removeItem('user');
    setToken(null);
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button title="Log out" onPress={logout} />
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

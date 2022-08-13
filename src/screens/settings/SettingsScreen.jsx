import { StyleSheet, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useToken } from '../../hooks/useToken';
import StyledScreen from '../../components/wrappers/StyledScreen';

export default function SettingsScreen({ navigation }) {
  const [token, setToken] = useToken();

  const logout = async () => {
    await AsyncStorage.removeItem('access');
    await AsyncStorage.removeItem('user');
    setToken(null);
    navigation.replace('Login');
  };

  return (
    <StyledScreen style={styles.container}>
      <Text>SettingsScreen</Text>
      <Button title="Log out" onPress={logout} />
      <Button
        title="Feedback"
        onPress={() => navigation.navigate('Feedback')}
      />
      <Button
        title="Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </StyledScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

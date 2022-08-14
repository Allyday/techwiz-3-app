import { useLayoutEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useToken } from '../../hooks/useToken';

export default function SplashScreen({ navigation }) {
  const [token, setToken] = useToken();
  const { colors } = useTheme();

  useLayoutEffect(() => {
    checkIsSignedIn();
  }, []);

  const checkIsSignedIn = async () => {
    const savedToken = await AsyncStorage.getItem('access');
    const savedUser = await AsyncStorage.getItem('user');
    if (savedToken) setToken(savedToken);
    const user = JSON.parse(savedUser);
    if (savedToken && user)
      navigation.replace('Root', {
        screen: 'Home',
        role: user.role,
      });
    else navigation.replace('Login');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.secondary }}>
      <Image style={styles.logo} source={require('../../assets/splash.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

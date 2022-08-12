import { useLayoutEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useToken } from '../../hooks/useToken';

export default function SplashScreen({ navigation }) {
  const [token] = useToken();

  useLayoutEffect(() => {
    checkIsSignedIn();
  }, []);

  const checkIsSignedIn = async () => {
    const savedUser = await AsyncStorage.getItem('user');
    const user = JSON.parse(savedUser);
    if (token && user)
      navigation.replace('Root', {
        screen: 'Home',
        role: user.role,
      });
    else navigation.replace('Login');
  };

  return (
      <Image
        style={styles.logo}
        source={require('../../assets/splash.png')}
      />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

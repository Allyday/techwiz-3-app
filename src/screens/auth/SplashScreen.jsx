import { useLayoutEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import { useToken } from '../../hooks/useToken';
import { setUserDetails } from '../../store-redux/actions/user';
import { ROLES } from '../../utils/constants';

export default function SplashScreen({ navigation }) {
  const [token, setToken] = useToken();
  const { colors } = useTheme();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    checkIsSignedIn();
  }, []);

  const checkIsSignedIn = async () => {
    const savedToken = await AsyncStorage.getItem('access');
    const savedUser = await AsyncStorage.getItem('user');
    if (savedToken) setToken(savedToken);
    const user = JSON.parse(savedUser);
    if (savedToken && user) {
      const savedInfoChild = await AsyncStorage.getItem('info_child');
      const info_child = JSON.parse(savedInfoChild);

      if (user.role === ROLES.PARENT && info_child) {
        // this will be added to conversation info when create chat
        dispatch(setUserDetails(info_child));

        if (info_child.length === 1)
          navigation.replace('Root', {
            screen: 'ReportCard',
            role: user.role,
            params: {
              screen: 'ReportCardScreen',
              params: { student: info_child[0] },
            },
          });
        else
          navigation.replace('Root', {
            screen: 'ReportCard',
            role: user.role,
            params: {
              screen: 'ParentHomeScreen',
              params: { children: info_child },
            },
          });
      } else
        navigation.replace('Root', {
          screen: 'Home',
          role: user.role,
        });
    } else navigation.replace('Login');
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

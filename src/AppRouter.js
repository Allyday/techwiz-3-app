import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useToken } from './hooks/useToken';
import RootStack from './navigation/RootStack';
import LoginScreen from './screens/auth/LoginScreen';
import ViewPDF from './screens/viewPDF/ViewPDF';

const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = useToken();

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const savedToken = await AsyncStorage.getItem('access');
    if (savedToken) setToken(savedToken);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Root"
          component={RootStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewPDF"
          component={ViewPDF}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

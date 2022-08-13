import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import { useToken } from '../hooks/useToken';
import { systemAPI } from '../apis';

const registerPushNotifications = async () => {
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let permissionStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      permissionStatus = status;
    }
    if (permissionStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    return { token, permissionStatus };
  } else {
    alert('Must use physical device for Push Notifications');
  }
};

const setNotificationChannel = () => {
  if (Platform.OS === 'android') {
    return Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
};

export default function useRegisterNotifications() {
  const [userToken] = useToken();

  useEffect(() => {
    initPushNotifications();
  }, []);

  const initPushNotifications = async () => {
    try {
      setNotificationChannel();
      const { token, permissionStatus } = await registerPushNotifications();
      if (token) {
        const { data } = await systemAPI.savePushNotiToken(userToken, {
          token,
        });
      }
    } catch (error) {
      console.log('error', 'INIT_PUSH_NOTIFICATIONS_ERROR', { error });
    }
  };
}

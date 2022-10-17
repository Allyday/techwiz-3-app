import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NOTI_TYPE } from '../utils/constants';

export default function useNotificationListeners() {
  const navigation = useNavigation();

  useEffect(() => {
    const incomingNotificationListener =
      Notifications.addNotificationReceivedListener(handleNotification);
    const onClickNotificationListener =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse
      );

    return () => {
      incomingNotificationListener.remove();
      onClickNotificationListener.remove();
    };
  }, []);

  /**
   * Handle incoming notifications when app is open
   * Example: show toast with notification content
   */
  const handleNotification = (notification) => {
    const { title, body, data: jsonData } = notification.request.content;

    const data = JSON.parse(jsonData.data);
    switch (data.type) {
      case NOTI_TYPE.CHAT_NEW_MESSAGE:
        Alert.alert(title + ' sent you a message', body);

        navigation.navigate('Chat', {
          screen: 'ChatDetails',
          params: { ...data.payload },
        });
        break;
      default:
        Alert.alert(title, body);
        break;
    }
  };

  /**
   * Handle notification on click.
   * Example: navigating to screens with noti data
   */
  const handleNotificationResponse = (response) => {};
}

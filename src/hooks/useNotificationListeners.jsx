import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

export default function useNotificationListeners() {
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
    const { title, body, data } = notification.request.content;
  };

  /**
   * Handle notification on click.
   * Example: navigating to screens with noti data
   */
  const handleNotificationResponse = (response) => {
  };
}

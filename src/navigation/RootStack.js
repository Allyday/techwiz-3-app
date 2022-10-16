import React, { useEffect, useLayoutEffect } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors, useTheme } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import io from 'socket.io-client';

import Resources from '../screens/Resources/Resources';
import HelplinesScreen from '../screens/helplines/HelplinesScreen';
import MarksScreen from '../screens/marks/MarksScreen';
import ClassDetailsScreen from '../screens/marks/ClassDetailsScreen';
import DrawerUser from './Drawer';
import RevisionScreen from '../screens/revision/RevisionScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import FeedbackScreen from '../screens/settings/FeedbackScreen';
import ProfileScreen from '../screens/settings/ProfileScreen';
import ReportCardScreen from '../screens/report-card/ReportCardScreen';
import ParentHomeScreen from '../screens/report-card/ParentHomeScreen';
import ChatListScreen from '../screens/chat/ChatListScreen';
import ChatDetailsScreen from '../screens/chat/ChatDetailsScreen';

import useRegisterNotifications from '../hooks/useRegisterNotifications';
import useNotificationListeners from '../hooks/useNotificationListeners';
import useConversations from '../hooks/useConversations';
import { ROLES } from '../utils/constants';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const tabBarConfig = {
  ReportCard: { icon: 'list-alt', label: 'Report Card' },
  Resources: { icon: 'book', label: 'Resources' },
  Revision: { icon: 'calendar-alt', label: 'Revision' },
  Helplines: { icon: 'phone', label: 'Helplines' },
  Marks: { icon: 'home', label: 'Home' },
  Progress: { icon: 'chalkboard-teacher', label: 'Progress' },
  Chat: { icon: 'comments', label: 'Chat' },
  Settings: { icon: 'cog', label: 'Settings' },
};

export default function RootStack({ route }) {
  const { colors } = useTheme();
  const { role } = route.params;
  useRegisterNotifications();
  useNotificationListeners();
  useConversations();

  useEffect(() => {
    const newSocket = io(`http://localhost:5005`);
    newSocket.on('connect', () => {
      newSocket.emit('user_connected', role);
    });
    newSocket.on('typing', (data) => {
      console.log('data from typing: ', data);
    });

    return () => newSocket.close();
  }, []);

  const screenOptions = ({ route }) => ({
    title: tabBarConfig[route.name].label,
    tabBarIcon: ({ focused, color, size }) => {
      const iconName = tabBarConfig[route.name].icon;

      return <FontAwesome5 name={iconName} size={20} color={color} />;
    },
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: Colors.grey500,
    headerStyle: {
      backgroundColor: colors.secondary,
      // borderBottomStartRadius: 30,
    },
    headerTintColor: 'white',
    drawerPosition: 'left',
    drawerStyle: {
      width: '90%',
    },
  });

  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      drawerContent={(props) => <DrawerUser {...props} />}
    >
      {role === ROLES.TEACHER && (
        <Tab.Screen
          name="Marks"
          component={MarkStack}
          options={{ headerShown: false }}
        />
      )}
      {[ROLES.STUDENT].includes(role) && (
        <Tab.Screen name="ReportCard" component={ReportCardScreen} />
      )}
      {[ROLES.PARENT].includes(role) && (
        <Tab.Screen
          name="ReportCard"
          component={ParentHomeStack}
          options={{ headerShown: false }}
        />
      )}
      {[ROLES.STUDENT, ROLES.TEACHER].includes(role) && (
        <>
          <Tab.Screen name="Resources" component={Resources} />
          <Tab.Screen name="Revision" component={RevisionScreen} />
        </>
      )}

      {[ROLES.STUDENT, ROLES.PARENT].includes(role) && (
        <Tab.Screen name="Helplines" component={HelplinesScreen} />
      )}
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const MarkStack = () => {
  const { colors } = useTheme();

  const screenOptions = ({ route }) => ({
    headerStyle: {
      backgroundColor: colors.secondary,
      borderBottomStartRadius: 30, // doesnt work??
    },
    headerTintColor: 'white',
  });

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="MarksScreen"
        component={MarksScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="ClassDetails"
        component={ClassDetailsScreen}
        options={{ title: 'Class Details' }}
      />
    </Stack.Navigator>
  );
};

const ParentHomeStack = () => {
  const { colors } = useTheme();

  const screenOptions = ({ route }) => ({
    headerStyle: {
      backgroundColor: colors.secondary,
      borderBottomStartRadius: 30, // doesnt work??
    },
    headerTintColor: 'white',
  });

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="ParentHomeScreen"
        component={ParentHomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="ReportCardScreen"
        component={ReportCardScreen}
        options={{ title: 'Report Card' }}
      />
    </Stack.Navigator>
  );
};

const ChatStack = ({ navigation, route }) => {
  const { colors } = useTheme();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName && ['ChatDetails'].includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({
        tabBarStyle: { display: 'flex' },
      });
    }
  }, [navigation, route]);

  const screenOptions = ({ route }) => ({
    headerStyle: {
      backgroundColor: colors.secondary,
      borderBottomStartRadius: 30, // doesnt work??
    },
    headerTintColor: 'white',
  });

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{ title: 'All conversations' }}
      />
      <Stack.Screen name="ChatDetails" component={ChatDetailsScreen} />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  const { colors } = useTheme();

  const screenOptions = ({ route }) => ({
    headerStyle: {
      backgroundColor: colors.secondary,
      borderBottomStartRadius: 30, // doesnt work??
    },
    headerTintColor: 'white',
  });

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
    </Stack.Navigator>
  );
};

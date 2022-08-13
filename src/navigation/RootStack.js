import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors, useTheme } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

import HomeScreen from '../screens/home/HomeScreen';
import Resources from '../screens/Resources/Resources';
import HelplinesScreen from '../screens/helplines/HelplinesScreen';
import MarksScreen from '../screens/marks/MarksScreen';
import ClassDetailsScreen from '../screens/marks/ClassDetailsScreen';
import DrawerUser from './Drawer';
import RevisionScreen from '../screens/revision/RevisionScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import FeedbackScreen from '../screens/settings/FeedbackScreen';
import ProfileScreen from '../screens/settings/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const tabBarConfig = {
  ReportCard: { icon: 'flag', label: 'Report Card' },
  Resources: { icon: 'book', label: 'Resources' },
  Revision: { icon: 'calendar-alt', label: 'Revision' },
  Helplines: { icon: 'phone', label: 'Helplines' },
  Marks: { icon: 'list-alt', label: 'Marks' },
  Progress: { icon: 'chalkboard-teacher', label: 'Progress' },
  Settings: { icon: 'cog', label: 'Settings' },
};

const ROLES = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  PARENT: 'PARENT',
};

export default function RootStack({ route }) {
  const { colors } = useTheme();
  const { role } = route.params;

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
      borderBottomStartRadius: 30,
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
        <>
          <Tab.Screen
            name="Marks"
            component={MarkStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen name="Progress" component={HomeScreen} />
        </>
      )}
      {[ROLES.STUDENT, ROLES.PARENT].includes(role) && (
        <Tab.Screen name="ReportCard" component={HomeScreen} />
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
        options={{ title: 'Marks' }}
      />
      <Stack.Screen
        name="ClassDetails"
        component={ClassDetailsScreen}
        options={{ title: 'Class Details' }}
      />
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

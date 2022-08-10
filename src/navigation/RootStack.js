import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors, useTheme } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

import HomeScreen from '../screens/home/HomeScreen';
import Resources from '../screens/Resources/Resources';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const tabBarConfig = {
  ReportCard: { icon: 'flag', label: 'Report Card' },
  Resources: { icon: 'book', label: 'Resources' },
  Revision: { icon: 'calendar', label: 'Revision' },
  Helplines: { icon: 'phone', label: 'Helplines' },
  Marks: { icon: 'list-alt', label: 'Marks' },
  Progress: { icon: 'chalkboard-teacher', label: 'Progress' },
};

const ROLES = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  PARENT: 'PARENT',
};

export default function RootStack() {
  const { colors } = useTheme();

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
  });
  const [statusTabBar, setStatusTabBar] = useState(ROLES.STUDENT);

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {
        (statusTabBar === ROLES.TEACHER && (
          <>
            <Tab.Screen
              name="Marks"
              component={MoreStack}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Progress"
              component={MoreStack}
              options={{ headerShown: false }}
            />
          </>
        ))
      }
      {[ROLES.STUDENT, ROLES.PARENT].includes(statusTabBar) && (
        <Tab.Screen name="ReportCard" component={HomeScreen} />
      )}
      {[ROLES.STUDENT, ROLES.TEACHER].includes(statusTabBar) && (
        <>
          <Tab.Screen name="Resources" component={Resources} />
          <Tab.Screen name="Revision" component={HomeScreen} />
        </>
      )}

      {[ROLES.STUDENT, ROLES.PARENT].includes(statusTabBar) && (
        <Tab.Screen name="Helplines" component={HomeScreen} />
      )}
    </Tab.Navigator>
  );
}

function MoreStack() {
  const screenOptions = ({ route }) => ({
    headerStyle: { backgroundColor: '#fd3667' },
    headerTintColor: 'white',
  });

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="MoreScreen"
        component={HomeScreen}
        options={{ title: 'More' }}
      />
      <Stack.Screen
        name="Account"
        component={HomeScreen}
        options={{ title: 'Account' }}
      />
    </Stack.Navigator>
  );
}

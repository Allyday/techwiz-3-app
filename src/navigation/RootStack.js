import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { Octicons } from "@expo/vector-icons";

import HomeScreen from "../screens/home/HomeScreen";
import Resources from "../screens/Resources/Resources";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const tabBarConfig = {
  ReportCard: { icon: "flag", label: "Report Card" },
  Resources: { icon: "book", label: "Resources" },
  Revision: { icon: "calendar", label: "Revision" },
  Helplines: { icon: "phone", label: "Helplines" },
  Marks: { icon: "list-alt", label: "Marks" },
  Progress: { icon: "chalkboard-teacher", label: "Progress" },
};

export default function RootStack() {
  const screenOptions = ({ route }) => ({
    title: tabBarConfig[route.name].label,
    tabBarIcon: ({ focused, color, size }) => {
      const iconName = tabBarConfig[route.name].icon;

      return <FontAwesome5 name={iconName} size={20} color={color} />;
    },
    tabBarActiveTintColor: "#fd3667",
    tabBarInactiveTintColor: "#473f97",
    headerStyle: { backgroundColor: "#473f97", borderBottomStartRadius: 30 },
    headerTintColor: "white",
  });
  const [statusTabBar, setStatusTabBar] = useState(0);

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {statusTabBar == 2 ? (
        <>
          <Tab.Screen name="ReportCard" component={HomeScreen} />
          <Tab.Screen name="Helplines" component={HomeScreen} />
        </>
      ) : (
        <>
          <Tab.Screen name="Resources" component={Resources} />
          <Tab.Screen name="Revision" component={HomeScreen} />
          {statusTabBar == 1 ? (
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
          ) : (
            <>
              <Tab.Screen name="ReportCard" component={HomeScreen} />
              <Tab.Screen name="Helplines" component={HomeScreen} />
            </>
          )}
        </>
      )}
    </Tab.Navigator>
  );
}

function MoreStack() {
  const screenOptions = ({ route }) => ({
    headerStyle: { backgroundColor: "#fd3667" },
    headerTintColor: "white",
  });

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="MoreScreen"
        component={HomeScreen}
        options={{ title: "More" }}
      />
      <Stack.Screen
        name="Account"
        component={HomeScreen}
        options={{ title: "Account" }}
      />
    </Stack.Navigator>
  );
}

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';

import HomeScreen from '../screens/home/HomeScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const tabBarConfig = {
  Home: { icon: 'home', label: 'Home' },
  Sales: { icon: 'dollar-sign', label: 'Sales' },
  Payments: { icon: 'money-check-alt', label: 'Payments' },
  Customers: { icon: 'users', label: 'Customers' },
  More: { icon: 'bars', label: 'More' },
};

export default function RootStack() {
  const screenOptions = ({ route }) => ({
    title: tabBarConfig[route.name].label,
    tabBarIcon: ({ focused, color, size }) => {
      const iconName = tabBarConfig[route.name].icon;

      return <FontAwesome5 name={iconName} size={20} color={color} />;
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
    headerStyle: { backgroundColor: 'tomato' },
    headerTintColor: 'white',
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Sales" component={HomeScreen} />
      <Tab.Screen name="Payments" component={HomeScreen} />
      <Tab.Screen name="Customers" component={HomeScreen} />
      <Tab.Screen
        name="More"
        component={MoreStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function MoreStack() {
  const screenOptions = ({ route }) => ({
    headerStyle: { backgroundColor: 'tomato' },
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

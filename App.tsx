import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContextProvider } from './src/contexts/AuthContext';

import theme from './src/theme';

import Login from './src/screens/Login';
import FormScreen from './src/screens/Form';
import List from './src/screens/List';
import Profile from './src/screens/Profile';
import Details from './src/screens/Details';
import VagasList from './src/screens/List';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.COLORS.GREEN,
        tabBarInactiveTintColor: theme.COLORS.GRAY_03,
        tabBarStyle: {
          backgroundColor: theme.COLORS.GRAY_01,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Home" component={List} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <AuthContextProvider>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="FormScreen" component={FormScreen} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="VagasList" component={VagasList} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="List" component={List} />
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
        </AuthContextProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}

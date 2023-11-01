import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import ContactPage from './components/ContactPage';
import CouponInfo from './components/CouponInfo';
import UserProfile from './components/UserProfile';
import Login from './components/Login';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: '#007AFF', // Active tab color
      tabBarInactiveTintColor: '#8E8E93', // Inactive tab color
    }}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="CouponInfo" component={CouponInfo} />
    <Tab.Screen name="UserProfile" component={UserProfile} />
    <Tab.Screen name="Contact" component={ContactPage} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#F8F8F8', // Background color of the tab bar
  },
});

export default App;


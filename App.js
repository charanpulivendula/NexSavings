// App.js

import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import ContactPage from './components/ContactPage';
import Profile from './components/UserProfile';
import CouponInfo from './components/CouponInfo';
import UserProfile from './components/UserProfile';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="CouponInfo" component={CouponInfo} />
        <Tab.Screen name="UserProfile" component={UserProfile} />
        <Tab.Screen name="Contact" component={ContactPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

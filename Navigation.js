// Navigation.js
import React from 'react';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DataProvider } from './context/DataContext';

// Import your screen components
import TempratureScreen from './screens/Temprature';
import HumidityScreen from './screens/Humidity';
import PressureScreen from './screens/Pressure';
import SignupScreen from './screens/Signup';
import LoginScreen from './screens/Login';
import { Circle, G, Path, Rect, Svg } from 'react-native-svg';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const HomeTabs = () => (
  <DataProvider>
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'black', // Change the background color here
        },
      }}>
      <Tab.Screen name="Temperature" component={TempratureScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            useIsFocused() ?
              <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#FFA500">
                <Path d="M12 2c-1.7 0-3 1.3-3 3v9.5c-1.1 0.7-1.8 1.9-1.8 3.2 0 2.2 1.8 4 4 4s4-1.8 4-4c0-1.3-0.7-2.5-1.8-3.2v-9.5c0-1.7-1.3-3-3-3zm1 12h-2v-8h2v8zm-2 4c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2-0.9 2-2 2z" />
              </Svg>

              :
              <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#FFFFFF">
                <Path d="M12 2c-1.7 0-3 1.3-3 3v9.5c-1.1 0.7-1.8 1.9-1.8 3.2 0 2.2 1.8 4 4 4s4-1.8 4-4c0-1.3-0.7-2.5-1.8-3.2v-9.5c0-1.7-1.3-3-3-3zm1 12h-2v-8h2v8zm-2 4c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2-0.9 2-2 2z" />
              </Svg>
          ),
        }}

      />
      <Tab.Screen name="Humidity" component={HumidityScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            useIsFocused() ?
              <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#007BFF">
                <Path d="M19.03 11.98c-1.25-1.24-2.27-2.71-2.85-4.34a7.4 7.4 0 00-3.74 0c-1.57.63-2.92 1.56-4.15 2.79-1.16 1.16-2.06 2.57-2.63 4.1a1 1 0 00.5 1.2 1 1 0 001.2-.5c.5-1 1.17-1.85 1.97-2.65a6.42 6.42 0 012.6-1.6 5.4 5.4 0 012.69 0 6.43 6.43 0 012.6 1.6c.8.8 1.48 1.65 1.97 2.65a1 1 0 001.7.2c.3-.4.5-.8.6-1.3a.993.993 0 00-.4-1.1zM12 8.3a4.4 4.4 0 110 8.8 4.4 4.4 0 010-8.8zm0 7.4a3 3 0 110-6 3 3 0 010 6z" />
              </Svg>
              :
              <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40d" fill="#6C757D">
                <Path d="M19.03 11.98c-1.25-1.24-2.27-2.71-2.85-4.34a7.4 7.4 0 00-3.74 0c-1.57.63-2.92 1.56-4.15 2.79-1.16 1.16-2.06 2.57-2.63 4.1a1 1 0 00.5 1.2 1 1 0 001.2-.5c.5-1 1.17-1.85 1.97-2.65a6.42 6.42 0 012.6-1.6 5.4 5.4 0 012.69 0 6.43 6.43 0 012.6 1.6c.8.8 1.48 1.65 1.97 2.65a1 1 0 001.7.2c.3-.4.5-.8.6-1.3a.993.993 0 00-.4-1.1zM12 8.3a4.4 4.4 0 110 8.8 4.4 4.4 0 010-8.8zm0 7.4a3 3 0 110-6 3 3 0 010 6z" />
              </Svg>
          ),


        }} />
      <Tab.Screen name="Pressure" component={PressureScreen} options={{
        headerShown: false,
        tabBarIcon: () => (
          useIsFocused() ?
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#28A745">
              <Path d="M13.25 11.75a.75.75 0 000-1.5H6.75a.75.75 0 100 1.5h6.5zm4-5a.75.75 0 100-1.5H6.75a.75.75 0 100 1.5h10.5zm2 10a.75.75 0 100-1.5h-14a.75.75 0 100 1.5h14z" />
            </Svg>

            :
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#6C757D">
              <Path d="M13.25 11.75a.75.75 0 000-1.5H6.75a.75.75 0 100 1.5h6.5zm4-5a.75.75 0 100-1.5H6.75a.75.75 0 100 1.5h10.5zm2 10a.75.75 0 100-1.5h-14a.75.75 0 100 1.5h14z" />
            </Svg>
        ),
      }} />
    </Tab.Navigator>
  </DataProvider>

);

const Navigation = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigation;

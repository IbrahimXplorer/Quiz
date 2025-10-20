import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ResultScreen } from '../screens';
import { BottomTabNavigator } from './BottomTabNavigator';

import BootSplash from "react-native-bootsplash";

export type RootStackParamList = {
  Root: undefined;
  Result: { total: number; score: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <NavigationContainer onReady={() => {
      BootSplash.hide();
    }}>
      <Stack.Navigator
        initialRouteName="Root"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{ title: 'Quiz' }}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: 'Result' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

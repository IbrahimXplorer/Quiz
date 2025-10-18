import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QuizScreen, ResultScreen } from '../screens';

export type RootStackParamList = {
  Quiz: undefined;
  Result: { total: number; score: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Quiz"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
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

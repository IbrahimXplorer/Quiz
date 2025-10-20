import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { CoursesScreen, QuizScreen } from '../screens';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: '#ffcd00',
        tabBarInactiveTintColor: '#888',

        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0.5,
          borderTopColor: '#ddd',
          paddingBottom: 6,
        },

        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '600',
        },

        tabBarIcon: ({ color, focused }) => {
          let iconName: string = '';

          if (route.name === 'Quiz') {
            iconName = focused ? 'help-circle' : 'help-circle-outline';
          } else if (route.name === 'Courses') {
            iconName = focused ? 'book' : 'book-outline';
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Quiz" component={QuizScreen} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

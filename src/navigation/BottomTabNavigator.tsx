import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CoursesScreen, QuizScreen } from '../screens';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false,

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
     }}>
      <Tab.Screen name="Quiz" component={QuizScreen} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
    </Tab.Navigator>
  );
};

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FileStackScreen, HomeStackScreen} from '../stack/StackNavigation';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#6b4faa',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name={'home'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Files"
        component={FileStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name={'file'} size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

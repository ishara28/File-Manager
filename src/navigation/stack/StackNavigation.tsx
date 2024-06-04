import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NAVIGATIONS_SCREENS} from '../../constants/navigation';
import Home from '../../components/screens/home/Home';
import SavedFiles from '../../components/screens/files/SavedFiles';

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={NAVIGATIONS_SCREENS.HOME}
        component={Home}
        options={{headerTitle: 'Home'}}
      />
    </HomeStack.Navigator>
  );
};

const FileStack = createNativeStackNavigator();

const FileStackScreen = () => {
  return (
    <FileStack.Navigator>
      <FileStack.Screen
        name={NAVIGATIONS_SCREENS.SAVED_FILES}
        component={SavedFiles}
        options={{headerTitle: 'Saved Files'}}
      />
    </FileStack.Navigator>
  );
};

export {HomeStackScreen, FileStackScreen};

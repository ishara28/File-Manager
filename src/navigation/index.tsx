import React from 'react';
import TabNavigation from './bottomTab/TabNavigation';
import {NavigationContainer} from '@react-navigation/native';

const Navigator = () => {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
};

export default Navigator;

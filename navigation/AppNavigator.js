import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LogInScreen from '../screens/LogInScreen';

export default createAppContainer(createSwitchNavigator(
  {
    Main: MainTabNavigator,
    LogIn: LogInScreen
  },
  {
    initialRouteName: 'LogIn'
  }
));
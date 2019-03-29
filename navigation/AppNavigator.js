import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LogInScreen from '../screens/LogInScreen';
import NoteScreen from '../screens/NoteScreen';
import HomeScreen from '../screens/HomeScreen';
import NewNoteScreen from '../screens/NewNoteScreen'

const AppNavigator = createStackNavigator(
  { 
    Main: MainTabNavigator,
    LogIn: LogInScreen,
    Home: HomeScreen,
    OldLists: NoteScreen
  },
  {
    initialRouteName: 'LogIn'
  }
)

export default createAppContainer(AppNavigator)
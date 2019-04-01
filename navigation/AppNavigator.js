import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LogInScreen from '../screens/LogInScreen';
import NoteScreen from '../screens/NoteScreen';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const AppNavigator = createStackNavigator(
  { 
    Main: MainTabNavigator,
    Welcome: WelcomeScreen,
    LogIn: LogInScreen,
    Home: HomeScreen,
    OldLists: NoteScreen
  },
  {
    initialRouteName: 'Welcome'
  }
)

export default createAppContainer(AppNavigator)

// const HomeNavigator = createSwitchNavigator({
//   Welcome: WelcomeScreen,
//   Practice: PracticeScreen,
//   Results: ResultsScreen
// });

// const AppNavigator = createBottomTabNavigator(
//   {
//     Home: {
//       screen: HomeNavigator
//     },
//     HighScores: {
//       screen: HighScoresScreen
//     },
//     Settings: {
//       screen: SettingsScreen
//     }
//   }
// );

// export default createAppContainer(AppNavigator);
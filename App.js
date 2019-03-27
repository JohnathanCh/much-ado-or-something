import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import AppContainer from './navigation/AppNavigator';
import { createAppContainer } from 'react-navigation'
import * as firebase from 'firebase';
import { Provider } from 'react-redux';

import Store from './redux/Store'

const firebaseConfig = {
  apiKey: "AIzaSyAsfUauwieflAU58C-mdiQoU-4Hika_kC0",
  authDomain: "to-do-app-f598a.firebaseapp.com",
  databaseURL: "https://to-do-app-f598a.firebaseio.com",
  projectId: "to-do-app-f598a",
  storageBucket: "to-do-app-f598a.appspot.com",
  messagingSenderId: "455009651888"
};
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {

  render() {
      return (
        <Provider store={Store}>
          <View style={styles.container}>
            <AppContainer />
          </View>
        </Provider>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

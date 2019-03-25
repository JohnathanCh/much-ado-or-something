import React from 'react';
import Store from './redux/Store'

import App from './App'

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
            <App/>
        </Provider>
      );
  }
}
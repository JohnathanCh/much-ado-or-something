import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { 
  Form, 
  Label, 
  Input, 
  Item, 
  Content, 
  Container, 
  Button 
} from 'native-base';

import * as Expo from 'expo';
import * as firebase from 'firebase';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    email: '',
    password: ''
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      console.log("user in componentDidMount", user)
    })
  }

  _signUpUser = (email, password) => {
    // Alert.alert(email, password)

    try {
      if(this.state.password.length < 6) {
        Alert.alert('Error', 'Please enter at Least 6 characters');
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password)

    }
    catch(error){
      console.log(error.toString())
    }
  }

  _logInUser = (email, password) => {
    // Alert.alert(email, password)

    try{

      firebase.auth().signInWithEmailAndPassword(email, password)
      .then( user => {console.log(user)})
    }
    catch(error){
      console.log(error.toString())
    }
  }

  async _loginWithFacebook() {
    console.log("You Are in the _loginWithFacebook Function")

    const {type,token} = await Expo.Facebook.logInWithReadPermissionsAsync('800638413642073', {permissions: ['public_profile']})

    console.log("type", type)

    if(type == 'success'){
      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {console.log(error)})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}> */}
          {/* <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View> */}

          {/* <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>ITS WORKING</Text>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
            </View>

            <Text style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView> */}

        {/* <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View> */}

        <Container style={styles.form}>
            <Content>
              <Form>

                <Item floatingLabel>
                  <Label>Email</Label>
                  <Input 
                  onChangeText={(email) => {this.setState({
                    email: email
                  })}}/>
                </Item>

                <Item floatingLabel>
                  <Label>Password</Label>
                  <Input 
                  secureTextEntry={true}
                  onChangeText={(password) => {this.setState({
                    password: password
                  })}}/>
                </Item>

                <Button 
                full 
                rounded 
                style={styles.button}
                onPress={() => 
                this._logInUser(this.state.email, this.state.password)}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </Button>

                <Button 
                full 
                rounded 
                primary 
                style={styles.button}
                onPress={() => 
                this._signUpUser(this.state.email, this.state.password)}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </Button>

                <Button 
                full 
                rounded 
                primary 
                style={styles.button}
                onPress={() => this._loginWithFacebook()}>
                  <Text style={styles.buttonText}>Login with Facebook</Text>
                </Button>

              </Form>
            </Content>
        </Container>

      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  form: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'orange'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  button: {
    marginTop: 15,
  },
  buttonText: {
    color: 'white'
  }
});

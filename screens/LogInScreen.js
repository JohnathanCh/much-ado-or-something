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
import { connect } from 'react-redux';

import StyledText from '../styled_components/MyAppText'
import StyledHeader from '../styled_components/MyAppHeaderText'
import { logInUserThunk } from '../redux/user/UserActions'

class HomeScreen extends React.Component {

  state = {
    email: '',
    password: ''
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.props._logInUserThunk(user)
    })
  }

  componentDidUpdate() {
    if(this.props.loggedIn === true) {
      this.props.navigation.navigate('Home')
    }
  }

  _signUpUser = (email, password) => {

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

    try{
      firebase.auth().signInWithEmailAndPassword(email, password)
    }
    catch(error){
      console.log(error.toString())
    }
  }

  async _loginWithFacebook() {

    const {type,token} = await Expo.Facebook.logInWithReadPermissionsAsync('800638413642073', {permissions: ['public_profile']})

    if(type == 'success'){
      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {console.log("\n ERROR \n\n", error)})
    }
  }

  render() {
    console.log("\n PROPS \n\n", this.props)
    return (
      <View style={styles.container}>
        <Text>
          LOGIN
        </Text>

        <Container style={styles.form}>
            <Content>
            <StyledHeader>Much Ado...</StyledHeader>
            <StyledText>Or Something</StyledText>
              <Form>

                <Item floatingLabel>
                  <Label>Email</Label>
                  <Input 
                  autoCorrect={false}
                  spellCheck={false}
                  onChangeText={(email) => {this.setState({
                    email: email
                  })}}/>
                </Item>

                <Item floatingLabel>
                  <Label>Password</Label>
                  <Input 
                  autoCorrect={false}
                  spellCheck={false}
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

                <Button 
                full 
                rounded 
                primary 
                style={styles.button}
                onPress={() => this.props.navigation.navigate('OldLists')}>
                  <Text style={styles.buttonText}>NAVIGATE TEST</Text>
                </Button>

                <Text> {this.props.user.email}</Text>

              </Form>
            </Content>
        </Container>

      </View>
    );
  }
}

const MSTP = (state) => {
  return ({
    user: state.user,
    loggedIn: state.loggedIn
  })
}

const MDTP = (dispatch) => ({
  _logInUserThunk: (user)=> {
    dispatch(logInUserThunk(user))
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    backgroundColor: 'black',
    color: 'white',
    paddingTop: '50%',
  },
  form: {
    backgroundColor: 'orange',
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: '10%',
    width: '75%',
    height: '100%'
  },
  button: {
    marginTop: 15,
  },
  buttonText: {
    color: 'white'
  }
});

export default connect(MSTP, MDTP)(HomeScreen)

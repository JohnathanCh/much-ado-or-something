import React from 'react';
import {
  StyleSheet,
  Text,
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
    return (
      <View style={styles.container}>

        <Container style={styles.form}>
            <Content>
              <StyledHeader>Much Ado...</StyledHeader>
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
                
                <View style={styles.buttons}>
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
                </View>

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
    backgroundColor: '#82EAAC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'white',
    paddingTop: '50%',
  },
  form: {
    backgroundColor: '#82EAAC',
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: '10%',
    width: '75%',
    height: '100%',
  },
  buttons: {
    margin: 'auto',
    alignItems: 'flex-end'
  },
  button: {
    marginTop: 25,
    backgroundColor: '#22A255',
  },
  buttonText: {
    color: 'white'
  }
});

export default connect(MSTP, MDTP)(HomeScreen)

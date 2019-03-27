import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
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

  render() {
    return (
      <View style={styles.container}>
        <Container>
            <Content>

            <StyledHeader>
              <Text>
                HOME SCREEN
              </Text>
            </StyledHeader>

            <Button
            full
            rounded
            primary
            onPress={ () => {Alert.alert("NEW LIST")}}>
              <Text>
                Add a New List
              </Text>
            </Button>

            <ScrollView>


            </ScrollView>

            <Content>
              <Item floatingLabel>
              <Label>New To Do Item</Label>
                <Input
                autoCorrect={true}
                spellCheck={true}
                placeholder='New To Do Item'
                >
                </Input>
              </Item>
            </Content>
              
            </Content>
        </Container>

      </View>
    );
  }
}

const MSTP = (state) => {
  return ({
    user: state.user
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingTop: '50%',
    width: '75%'
  },
  button: {
    marginTop: 15,
  },
  buttonText: {
    color: 'white'
  }
});

export default connect(MSTP)(HomeScreen)

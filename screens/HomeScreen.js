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
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import Note from './NoteScreen';

class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      noteArray: [],
      noteText: '',
    }
  }

  _addNote = () => {

    if(this.state.noteText){
      let date = new Date()

      this.state.noteArray.push({ 
        note: this.state.noteText,
      })

      this.setState({
        noteArray: this.state.noteArray,
        noteText: '',
      })

      firebase.database().push().set({
        noteText: this.state.noteText
      })
    }
  }

  createNote = () => {
    return new Promise((resolve, reject) => {
      const { noteArray, noteText } = this.state

      var d = new Date();
      const newElement = {
        'date':d.getFullYear()+ "/"+(d.getMonth()+1) + "/"+ d.getDate(),
        'note': noteText
      }

      this.setState({
         noteArray: [...noteArray, newElement ],
         noteText:''
      }, () => resolve(newElement))

    })
  }

  _addNoteToFirebase = () => {
    const refInDatabase = firebase.database().ref('users/' + this.props.user.uid + '/notes/').push();
    this.createNote()
      .then((elementReceived) => refInDatabase.update(elementReceived))
      .then(() => console.log('inserted'))
      .catch((error) => console.log(error));
  }

  _deleteNote = (key) => {
    this.state.noteArray.splice(key, 1);
    this.setState({
      noteArray: this.state.noteArray
    })
  }

  render() {

    let notes = this.state.noteArray.map((val, key) => {
      return (<Note key={key} keyval={key} val={val} 
              deleteMethod={ () => this._deleteNote(key)}/>
      )

    } )
    return (
      <View style={styles.container}>
        <Container>
            <Content>

            <View style={styles.header}>
              <Text style={styles.headerText}>
                Much Ado..
              </Text>
            </View>

            <ScrollView>
            {notes}
            </ScrollView>
              
            </Content>

            <View style={styles.footer}>
              <Content>
                <Item >
                  <Input
                  autoCorrect={true}
                  spellCheck={true}
                  placeholder='New To Do Item'
                  underlineColorAndroid='transparent'
                  style={styles.textInput}
                  onChangeText={(noteText) => 
                  this.setState({noteText})}
                  value={this.state.noteText}
                  >
                  </Input>
                </Item>
              </Content>
            </View>

            <TouchableOpacity onPress={() => this._addNoteToFirebase() } style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
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
    flex: 1
  },
  header: {
    backgroundColor: "#E91E63",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 10,
    borderBottomColor: "#ddd"
  },
  headerText: {
    color: "white",
    fontSize: 18,
    padding: 26
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  textInput: {
    alignSelf: "stretch",
    color: "#fff",
    padding: 20,
    backgroundColor: "#252525",
    borderTopWidth: 2,
    borderTopColor: "#ededed",
    marginBottom: 10
  },
  addButton: {
    position: "absolute",
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: "#e91e63",
    width: 90,
    height: 90,
    borderRadius: 59,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24
  }
});﻿

export default connect(MSTP)(HomeScreen)

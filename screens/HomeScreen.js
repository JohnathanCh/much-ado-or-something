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

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     noteArray: [],
  //     noteText: '',
  //   }
  // }

  state = {
    noteArray: [],
    noteText: '',
  }

  componentDidMount(){
    // create listener on the node user/ this.user.uid /notes
    this.getNotes();
  }

snapshotToArray = (snapshot) => {
  var returnArr = [];

  snapshot.forEach(function(childSnapshot) {
      var note = childSnapshot.val();
      note.noteId = childSnapshot.key;

      returnArr.push(note);
  });

  return returnArr;
};

  getNotes = () =>{
      firebase.database().ref(`users/${this.props.user.uid}/notes`).once('value').then(snapshot => this.snapshotToArray(snapshot)).then(notes => {
        this.setState({
          noteArray: [...notes],
          noteText: this.state.noteText
        })
      })

      // firebase.database().ref(`users/${this.props.user.uid}/notes`).on('value', function (snapshot) {
      //   this.snapshotToArray(snapshot).then(notes => {
      //     this.setState({
      //     noteArray: [...notes] })})
      // })
  }

  _addNote = () => {

    if(this.state.noteText){
      this.state.noteArray.push({ 
        noteText: this.state.noteText,
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

      var date = new Date();
      const newElement = {
        'date':date.getFullYear()+ "/"+(date.getMonth()+1) + "/"+ date.getDate(),
        'noteText': noteText
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
      .then(() => console.log('note inserted into database'))
      .catch((error) => console.log(error));
  }

  deleteNoteFromFirebase = (noteId) => {
    firebase.database().ref('users/' + this.props.user.uid + '/notes/' + noteId).remove();
  }

  _deleteNote = (key) => {
    let removedNote = this.state.noteArray.splice(key, 1);
    // removedNote datastructure
    // [ Object {
    //     "date": "2019/3/28",
    //     "noteId": "-Lb4ltSfGi5UqJcAG9q5",
    //     "noteText": "Hi",
    //   },]

    this.setState({
      noteArray: this.state.noteArray
    })
    this.deleteNoteFromFirebase(removedNote[0].noteId)
  }

  render() {

    let notes = this.state.noteArray.map((val, key) => {
      return (<Note key={key} keyval={key} val={val} 
              deleteMethod={ () => this._deleteNote(key)}/>)})
              
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
                  multiline={true}
                  placeholder='New To Do Item'
                  underlineColorAndroid='transparent'
                  style={styles.textInput}
                  onChangeText={(noteText) => 
                  this.setState({noteText})}
                  value={this.state.noteText}
                  />
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
    flex: 1,
    backgroundColor: '#20B2AA',
  },
  header: {
    backgroundColor: "#20B2AA",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 10,
    borderBottomColor: "#94CDAB"
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
    zIndex: 10,
    minHeight: 50,
  },
  textInput: {
    alignSelf: "stretch",
    color: "white",
    padding: 20,
    backgroundColor: "#252525",
    borderTopWidth: 2,
    borderTopColor: "#486E57",
    height: 100,
  },
  addButton: {
    position: "absolute",
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: "#19E36A",
    width: 90,
    height: 90,
    borderRadius: 59,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8
  },
  addButtonText: {
    color: "#143722",
    fontSize: 50
  }
});﻿

export default connect(MSTP)(HomeScreen)

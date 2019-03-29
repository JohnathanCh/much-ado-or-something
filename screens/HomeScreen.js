import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { 
  Input, 
  Item, 
  Content, 
  Container, 
  Footer
} from 'native-base';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import Note from './NoteScreen';

class HomeScreen extends React.Component {

  state = {
    noteArray: [],
    noteText: '',
    updatingNote: false,
    updateNoteId: '',
  }

  componentDidMount(){
    this.getNotes();
  }

  componentDidUpdate(){
    if(this.state.updatingNote === false){
      this.getNotes()
    }
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
    if(this.state.noteText){
      const refInDatabase = firebase.database().ref('users/' + this.props.user.uid + '/notes/').push();
      this.createNote()
        .then((elementReceived) => refInDatabase.update(elementReceived))
        .then(() => console.log('note inserted into database'))
        .catch((error) => console.log(error));
    }
  }

  deleteNoteFromFirebase = (noteId) => {
    firebase.database().ref('users/' + this.props.user.uid + '/notes/' + noteId).remove();
  }

  _deleteNote = (key) => {
    let removedNote = this.state.noteArray.splice(key, 1);
    this.setState({
      noteArray: this.state.noteArray
    })
    this.deleteNoteFromFirebase(removedNote[0].noteId)

    // removedNote datastructure. It's an array with an obj inside
    // [ Object {
    //     "date": "2019/3/28",
    //     "noteId": "-Lb4ltSfGi5UqJcAG9q5",
    //     "noteText": "Hi",
    //   },]
  }

  _updateNote = (noteId, noteUpdate) => {
    this.setState({
      noteArray: this.state.noteArray,
      noteText: noteUpdate,
      updatingNote: true,
      updateNoteId: noteId
    })
  }

  _updateNoteInFirebase = (noteId, noteUpdate) => {
    firebase.database().ref('users/' + this.props.user.uid + '/notes/' + noteId).update({noteText: noteUpdate});

    this.setState({
      updatingNote: false,
      noteText: '',
      updateNoteId: 0,
    })
  }

  render() {

    let notes = this.state.noteArray.map((val, key) => {
      return (<Note key={key} keyval={key} val={val} 
              deleteMethod={ () => this._deleteNote(key)}
              updateMethod={ () => this._updateNote(val.noteId, val.noteText)}
              />)})
              
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

            <Footer>

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
            </Footer>

            {this.state.updatingNote ?             
            <TouchableOpacity onPress={() => this._updateNoteInFirebase(this.state.updateNoteId, this.state.noteText) } style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => this._addNoteToFirebase() } style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            }

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
    width: '100%',
    bottom: 0,
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

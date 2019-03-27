import React, { Component } from 'react';
import { View, Text } from 'react-native';

class NewNoteScreen extends Component {

  render() {
    return (
        <View>
          <Text>
            NEW NOTE SCREEN 
          </Text>
            <Content>
            <Item >
                <Input
                autoCorrect={true}
                spellCheck={true}
                placeholder='New To Do Item'
                underlineColorAndroid='transparent'
                >
                </Input>
            </Item>
            </Content>

        <TouchableOpacity>
            <Ionicons name="md-add" size={30} style={{padding: 10, alignSelf: 'center'}}/>
        </TouchableOpacity>
        <Text>
            NEW NOTE SCREEN 
          </Text>
        </View>
    );
  }
}

export default NewNoteScreen;

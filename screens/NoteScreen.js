import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {
    CheckBox,
    Body
} from 'native-base'
import { connect } from 'react-redux';

class Note extends Component {

    state = {
        checked: false
    }

    _checkBox = (e) => {
        this.setState({
            checked: !this.state.checked
        })
    }

    render() {
        console.group("\n\n\n Note props \n\n\n")
        console.log(this.props.val.noteId)
        console.groupEnd()

        return(
            <View key={this.props.keyval} style={styles.note}>
                <CheckBox checked={this.state.checked} onPress={() => this._checkBox()} style={styles.checkBox}/>
                <Body>

                {this.state.checked ?                 
                <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: 'red'}}>
                    {this.props.val.noteText}
                </Text>
                :
                <Text style={styles.noteText}>
                    {this.props.val.noteText}
                </Text>
                }

                </Body>
                
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => this.props.updateMethod(this.props.val.noteId, this.props.val.noteText)} style={styles.noteUpdate}>
                        <Text style={styles.noteUpdateText}>Update</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.deleteMethod(this.props.key)} style={styles.noteDelete}>
                        <Text style={styles.noteDeleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const MSTP = state => ({
    user: state.user
})

export default connect(MSTP)(Note)

const styles = StyleSheet.create({
    note: {
        position: "relative",
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#94CDAB',
        backgroundColor: 'lightgrey',
        // flexDirection: 'row',
    },
    checkBox: {
        alignSelf: 'flex-start',
    },
    noteText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        color: 'purple',
        flex: 3,
    },
    buttons: {
        // backgroundColor: 'red',
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'row',
        left: 100,
    },
    noteDelete: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10,
        borderRadius: 40,
        maxWidth: 100,
        maxHeight: 50,
        flex: 1,

    },
    noteDeleteText: {
        color: 'white',
    },
    noteUpdate: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10,
        borderRadius: 40,
        maxWidth: 100,
        maxHeight: 50,
        flex: 1,
    },
    noteUpdateText: {
        color: 'white',
    }
    
})
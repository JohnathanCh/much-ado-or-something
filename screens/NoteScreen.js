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
        return(
            <View key={this.props.keyval} style={styles.note}>
                <CheckBox checked={this.state.checked} onPress={() => this._checkBox()} />
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

                <TouchableOpacity onPress={() => this.props.deleteMethod(this.props.key)} style={styles.noteDelete}>
                    <Text style={styles.noteDeleteText}>D</Text>
                </TouchableOpacity>
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
        borderBottomColor: '#EDEDED',
    },
    noteText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderBottomColor: '#E91E63'
    },
    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10,
    },
    noteDeleteText: {
        color: 'white',
    }

})
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

class Note extends Component {
    render() {
        return(
            <View key={this.props.keyval} style={styles.note}>
                <Text style={styles.noteText}>
                    This is where the notes will be
                    {this.props.val.date}
                </Text>
                <Text style={styles.noteText}>
                    
                    {this.props.val.note}
                </Text>

                <TouchableOpacity onPress={() => this.props.deleteMethod} style={styles.noteDelete}>
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
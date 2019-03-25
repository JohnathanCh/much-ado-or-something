import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput
} from 'react-native';
import { connect } from 'react-redux';

class Notes extends Component {
    render() {
        console.log("\n These are the Props inside the Notes Component \n", this.props)
        return(
            <ScrollView>
                <Text>
                    This is where the notes will be
                </Text>
            </ScrollView>
        )
    }
}

const MSTP = state => ({
    user: state.user
})

export default connect(MSTP)(Notes)
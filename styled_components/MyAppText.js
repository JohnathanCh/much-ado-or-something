import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default class StyledText extends Component{
    render(){
        return <Text {...this.props} style={styles.text}/>
    }
}

const styles = StyleSheet.create({
    text: {
        color: 'red',
        backgroundColor: 'black'
    }
})
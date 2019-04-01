import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.welcomePage}>
        <Text style={styles.pageText}> Welcome to Much Ado! </Text>
      </View>
    );
  }
}

const MSTP = (state) => ({
    user: state.user
})

const styles = StyleSheet.create({
    welcomePage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'teal',
    },
    pageText: {
        color: 'white',        
    }
})

export default connect(MSTP)(WelcomeScreen)

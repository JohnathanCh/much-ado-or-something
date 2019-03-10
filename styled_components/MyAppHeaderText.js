import React, { Component } from 'react';
import { Text } from 'react-native'
import StyledText from './MyAppText'

export default class StyledHeader extends Component{
    render(){
        return (
        <StyledText>
            <Text style={{fontSize: 35}} {...this.props}/>
        </StyledText>
        )
    }
}
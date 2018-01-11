import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import signUpStyles from './style/signUpStyles';

export default class SignUpScreen extends React.Component {

    handleButtonPress = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View style={signUpStyles.container}>
                <TouchableHighlight style={signUpStyles.button} onPress={() => this.handleButtonPress()}>
                    <Text style={signUpStyles.text}>SignUp Screen</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
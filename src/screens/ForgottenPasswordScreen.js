import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import forgottenPasswordStyles from './style/forgottenPasswordStyles';

export default class ForgottenPasswordScreen extends React.Component {

  handleButtonPress = () => {
      this.props.navigation.goBack();
  };

  render() {
      return (
          <View style={forgottenPasswordStyles.container}>
              <TouchableHighlight style={forgottenPasswordStyles.button} onPress={() => this.handleButtonPress()}>
                  <Text style={forgottenPasswordStyles.text}>Forgotten Password Screen</Text>
              </TouchableHighlight>
          </View>
      );
  }
}
import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

export default class ForgottenPasswordScreen extends React.Component {

  handleButtonPress = () => {
      this.props.navigation.goBack();
  };

  render() {
      return (
          <View style={styles.container}>
              <TouchableHighlight style={styles.button} onPress={() => this.handleButtonPress()}>
                  <Text style={styles.text}>Forgotten Password Screen</Text>
              </TouchableHighlight>
          </View>
      );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#4F6D7A',
        width: 250,
        height: 50,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        color: '#fff',
    }
});
import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={styles.message}>
                    Nice to see you!
        </Text>

        <Button
          title='Log in'
          onPress={() => this.props.navigation.navigate('drawerStack')}
          color='#3cb371'
        />

        <Text
          style={styles.textLink}
          onPress={() => this.props.navigation.navigate('forgottenPasswordScreen')} >
                    Forgot your password?
        </Text>

        <Text
          style={styles.textLink}
          onPress={() => this.props.navigation.navigate('signupScreen')} >
                    New user? Sign up here!
        </Text>
        <Text
          style={styles.copyright}>
                    Copyright © Arter Oy 2017
        </Text>
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
  textLink: {
    color: 'blue',
    paddingTop: 15,
    fontSize: 16
  },
  message: {
    paddingBottom: 100,
    fontSize: 30,
    fontWeight: 'bold'
  },
  copyright: {
    paddingTop: 50,
    color: 'blue'
  }
});
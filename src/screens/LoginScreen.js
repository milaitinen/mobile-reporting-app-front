import React from 'react';
import { Text, ImageBackground } from 'react-native';

import styles from './style/styles';
import { SignInButton } from '../components/Button';
import { Input } from '../components/TextInput';

export default class LoginScreen extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            isLoading: true,
            TextInputUser: '',
            TextInputPassword: '',
            TextInputServer: ''
        };
    }

    render() {
        return (
            <ImageBackground source={require('./images/background.png')} style={styles.contentContainer}>
                <Text style={styles.title}>
                    MR-Application
                </Text>

                <Text style={styles.slogan}>
                    Keep calm and keep reporting
                </Text>

                <Input
                    source={require('./images/person.png')}
                    placeholder='Email'
                    onChangeText={TextInputUser => this.setState({ TextInputUser })}
                />
                <Input
                    source={require('./images/lock.png')}
                    secureTextEntry={true}
                    placeholder='Password'
                    onChangeText={TextInputPassword => this.setState({ TextInputPassword })}
                />
                <Input
                    source={require('./images/language.png')}
                    placeholder='Server url'
                    onChangeText={TextInputServer => this.setState({ TextInputServer })}
                />

                <SignInButton onPress={() => this.props.navigation.navigate('drawerStack')}>
                    Sign In
                </SignInButton>

                <Text style={styles.textLink} onPress={() => this.props.navigation.navigate('forgottenPasswordScreen')}>
                    Forgot password?
                </Text>

                <Text style={styles.signUp} onPress={() => this.props.navigation.navigate('signUpScreen')}>
                    Sign up
                </Text>

                <Text style={styles.copyright}>
                    Copyright © Arter Oy 2017
                </Text>
            </ImageBackground>
        );
    }
}
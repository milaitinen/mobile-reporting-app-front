import React from 'react';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import loginStyles from './style/styles';
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
            <LinearGradient
                colors={['#3d4f7c', '#31456f', '#1b3055']}
                style={loginStyles.contentContainer}
            >

                <Text style={loginStyles.title}>
                    MR-Application
                </Text>

                <Text style={loginStyles.slogan}>
                    Keep calm and keep reporting
                </Text>

                <Input
                    name={'user'}
                    placeholder='Email'
                    onChangeText={TextInputUser => this.setState({ TextInputUser })}
                />
                <Input
                    name={'lock'}
                    secureTextEntry={true}
                    placeholder='Password'
                    onChangeText={TextInputPassword => this.setState({ TextInputPassword })}
                />
                <Input
                    name={'globe'}
                    placeholder='Server url'
                    onChangeText={TextInputServer => this.setState({ TextInputServer })}
                />

                <SignInButton onPress={() => this.props.navigation.navigate('drawerStack')}>
                    Sign In
                </SignInButton>

                <Text style={loginStyles.textLink} onPress={() => this.props.navigation.navigate('forgottenPasswordScreen')}>
                    Forgot password?
                </Text>

                <Text style={loginStyles.signUp} onPress={() => this.props.navigation.navigate('signUpScreen')}>
                    Sign up
                </Text>

                <Text style={loginStyles.copyright}>
                    Copyright © Arter Oy 2017
                </Text>
            </LinearGradient>
        );
    }
}
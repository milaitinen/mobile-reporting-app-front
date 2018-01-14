import React from 'react';
import { Text, StatusBar } from 'react-native';

import loginStyles from './style/loginStyles';
import { SignInButton } from '../components/Button';
import { Input } from '../components/TextInput';
import { AppBackground } from '../components/AppBackground';

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
            <AppBackground>
                <StatusBar backgroundColor='#3d4f7c' barStyle='light-content'/>

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

                <Text style={loginStyles.copyright}>
                    Copyright © Arter Oy 2017
                </Text>
            </AppBackground>
        );
    }
}
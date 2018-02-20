import React from 'react';
import { Text, StatusBar, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import loginStyles from './style/loginStyles';
import { strings } from '../locales/i18n';
import { Input } from '../components/TextInput';
import { SignInButton } from '../components/Button';
import { AppBackground } from '../components/AppBackground';
import { insertUsername, insertToken } from '../redux/actions/user';
import { login, /* mockLogin, verifyToken, invalidCredentialsResponse*/ } from './api';

// "export" necessary in order to test component without Redux store
export class LoginScreen extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            // isLoading : true,
            password  : '',
            serverUrl : ''
        };


        if (this.props.token) { // this.props.token != null
            //TODO: verify token
            /*
            const response = verifyToken(this.props.user.token);
            if (someCondition(response)) {
            }
            */
            this.props.navigation.navigate('drawerStack');
        }
    }

    logIn = () => {
        login(this.props.username, this.state.password)
            .then(token => {
                if (token === undefined) { // TODO change undefined to invalidCredentialsResponse?
                    alert('Invalid username or password');
                } else {
                    this.setState({ password: '' });
                    this.props.dispatch(insertToken(token));
                    Keyboard.dismiss();
                    this.props.navigation.navigate('drawerStack');
                }
            });
    };

    render() {
        return (
            <AppBackground>
                <StatusBar backgroundColor='#3d4f7c' barStyle='light-content'/>

                <Text style={loginStyles.title}>
                    { strings('login.title') }
                </Text>

                <Text style={loginStyles.slogan}>
                    {strings('login.slogan')}
                </Text>

                <Input
                    name={'user'}
                    placeholder={ strings('login.username') }
                    onChangeText={username => this.props.dispatch(insertUsername(username))}
                />
                <Input
                    name={'lock'}
                    secureTextEntry={true}
                    placeholder={ strings('login.password') }
                    onChangeText={password => this.setState({ password })}
                />
                <Input
                    name={'globe'}
                    placeholder={ strings('login.serverUrl') }
                    onChangeText={serverUrl => this.setState({ serverUrl })}
                />

                <SignInButton onPress={this.logIn}>
                    { strings('login.signIn') }
                </SignInButton>

                <Text style={loginStyles.copyright}>
                    Copyright © Arter Oy 2018
                </Text>
            </AppBackground>
        );
    }
}

// maps Redux state to component props. Object that is returned can be accessed via 'this.props' e.g. this.props.username
const mapStateToProps = (state) => {
    const username = state.user.username;
    return {
        username
    };
};

export default connect(mapStateToProps)(LoginScreen);

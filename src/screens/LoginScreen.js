import React from 'react';
import { Text, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import loginStyles from './style/loginStyles';
import { strings } from '../locales/i18n';
import { SignInButton } from '../components/Button';
import { Input } from '../components/TextInput';
import { AppBackground } from '../components/AppBackground';
import { insertEmail, insertPassword, insertServerUrl, setAuthenticated } from '../redux/actions/user';
import { login, mockLogin, invalidCredentialsResponse } from './api';

// "export" necessary in order to test component without Redux store
export class LoginScreen extends React.Component {

    constructor(props)
    {
        super(props);
        /*
        this.state = {
            // isLoading     : true,
            emailAddress    : '',
            password        : '',
            serverUrl       : ''
        };
        */
    }


    logIn = () => {
        /*
        if (this.props.authenticated) {
            this.props.navigation.navigate('drawerStack');
        }
        */
        const loginResponse = mockLogin(this.props.email, this.props.password);
        if (loginResponse === invalidCredentialsResponse) {
            //todo: some other actions?
            alert('Invalid username or password'); //todo: get string from locales
        }
        else {
            this.props.dispatch(setAuthenticated(true));
            this.props.dispatch(insertEmail(this.props.email));
            this.props.dispatch(insertPassword(this.props.password));
            this.props.navigation.navigate('drawerStack');
        }
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
                    placeholder={ strings('login.email') }
                    onChangeText={emailAddress => this.props.dispatch(insertEmail(emailAddress))}
                />
                <Input
                    name={'lock'}
                    secureTextEntry={true}
                    placeholder={ strings('login.password') }
                    onChangeText={password => this.props.dispatch(insertPassword(password))}
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
                    Copyright © Arter Oy 2017
                </Text>
            </AppBackground>
        );
    }
}

// maps Redux state to component props. Object that is returned can be accessed via 'this.props' e.g. this.props.email
// NOTE: only 'authenticated' is currently in use. Others are not kept track of in Redux.
const mapStateToProps = (state) => {
    const authenticated = state.user.authenticated;
    const email = state.user.email;
    const password = state.user.password;
    return {
        authenticated,
        email,
        password,
    };
};

export default connect(mapStateToProps)(LoginScreen);

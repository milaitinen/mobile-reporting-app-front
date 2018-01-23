import React from 'react';
import { Text, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import loginStyles from './style/loginStyles';
import { strings } from '../locales/i18n';
import { SignInButton } from '../components/Button';
import { Input } from '../components/TextInput';
import { AppBackground } from '../components/AppBackground';
import { insertEmail, insertPassword, insertServerUrl } from '../actions/user';

class LoginScreen extends React.Component {

    /*constructor(props)
    {
        super(props);
        this.state = {
            //isLoading: true,
            //TextInputUser: '',
            //TextInputPassword: '',
            //TextInputServer: ''
        };
    }*/

    logIn = () => {
        console.log('authentication',this.props.authenticated);
        if (this.props.authenticated) {
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
                    onChangeText={address => this.props.dispatch(insertEmail(address))}
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
                    onChangeText={url => this.props.dispatch(insertServerUrl(url))}
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

// maps redux state to component props. Object that is returned can be accessed via 'this.props' e.g. this.props.email
const mapStateToProps = (state) => {
    const email = state.user.email;
    const password = state.user.password;
    const serverUrl = state.user.serverUrl;
    const authenticated = state.user.authenticated;
    return {
        email,
        password,
        serverUrl,
        authenticated,
    };
};

export default connect(mapStateToProps)(LoginScreen);
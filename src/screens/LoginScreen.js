import React from 'react';
import { Text, StatusBar, Keyboard, NetInfo } from 'react-native';
import { connect } from 'react-redux';

import loginStyles from './style/loginStyles';
import { strings } from '../locales/i18n';
import { SignInButton } from '../components/Button';
import { Input } from '../components/TextInput';
import { AppBackground } from '../components/AppBackground';
import {
    insertUsername,
    insertPassword,
    /*insertServerUrl,*/ insertToken
} from '../redux/actions/user';
import {
    login /* mockLogin, verifyToken, invalidCredentialsResponse*/
} from './api';
import { toggleConnection } from '../redux/actions/connection';

// "export" necessary in order to test component without Redux store
export class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        /*
        this.state = {
            // isLoading     : true,
            username    : '',
            password        : '',
            serverUrl       : ''
        };
        */

        if (this.props.token) {
            // this.props.token != null
            //TODO: verify token
            /*
            const response = verifyToken(this.props.user.token);
            if (someCondition(response)) {
            }
            */
            this.props.navigation.navigate('drawerStack');
        }
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
    }
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
    }

    _handleConnectionChange = isConnected => {
        this.props.dispatch(toggleConnection({ isConnected: isConnected }));
        console.log('called toggle with connection status ', isConnected);
        
    };

    logIn = () => {
        login(this.props.username, this.props.password).then(
            response => {
                if (response === undefined) {
                    // TODO change undefined to invalidCredentialsResponse?
                    alert('Invalid username or password');
                } else {
                    const token = response;
                    this.props.dispatch(insertToken(token));
                    Keyboard.dismiss();
                    this.props.navigation.navigate('drawerStack');
                }
            }
        );
    };

    render() {
    
        let statusBar = null;
        //for some reason i couldn't get this to work the right way : D
        if (this.props.isConnected) {
            statusBar = <StatusBar backgroundColor="#b52424" barStyle="light-content" />;
        } else {
            statusBar = <StatusBar backgroundColor="#3d4f7c" barStyle="light-content" />;
        }

        console.log('stata: ', this.props.isConnected);

        return <AppBackground>
            { statusBar }

            <Text style={loginStyles.title}>
                {strings('login.title')}
            </Text>

            <Text style={loginStyles.slogan}>
                {strings('login.slogan')}
            </Text>

            <Input name={'user'} placeholder={strings('login.username')} onChangeText={username => this.props.dispatch(insertUsername(username))} />
            <Input name={'lock'} secureTextEntry={true} placeholder={strings('login.password')} onChangeText={password => this.props.dispatch(insertPassword(password))} />
            <Input name={'globe'} placeholder={strings('login.serverUrl')} onChangeText={serverUrl => this.setState(
                { serverUrl }
            )} />

            <SignInButton onPress={this.logIn}>
                {strings('login.signIn')}
            </SignInButton>

            <Text style={loginStyles.copyright}>
                 Copyright © Arter Oy 2018
            </Text>
        </AppBackground>;
    }
}

// maps Redux state to component props. Object that is returned can be accessed via 'this.props' e.g. this.props.username
const mapStateToProps = state => {
    const password = state.user.password;
    const username = state.user.username;
    const isConnected = state.connection.isConnected;
    return {
        password,
        username,
        isConnected,
    };
};

export default connect(mapStateToProps)(LoginScreen);

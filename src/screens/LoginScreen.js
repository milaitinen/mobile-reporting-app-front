import React from 'react';
import { Text, Keyboard, NetInfo } from 'react-native';
import { connect } from 'react-redux';

import loginStyles from './style/loginStyles';
import { strings } from '../locales/i18n';
import { SignInButton } from '../components/Button';
import { Input } from '../components/TextInput';
import { AppBackground } from '../components/AppBackground';
import { insertUsername, insertPassword, /*insertServerUrl,*/ insertToken } from '../redux/actions/user';
import { login, /* mockLogin, verifyToken, invalidCredentialsResponse*/ } from './api';
import { NavigationActions } from 'react-navigation';
import { toggleConnection } from '../redux/actions/connection';
import { OfflineNotice } from '../components/OfflineNotice';

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
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    }
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }

    handleConnectionChange = isConnected => {
        this.props.dispatch(toggleConnection({ connectionStatus: isConnected }));
    };

    /**
     * Navigates to the given route and resets navigation
     * @param routeName
     */
    resetNavigationTo = (routeName) => {
        const actionToDispatch = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: routeName })]
        });
        this.props.navigation.dispatch(actionToDispatch);
    };

    logIn = () => {
        login(this.props.username, this.props.password).then(
            response => {
                if (response === undefined) {
                    alert('Invalid username or password');
                } else {
                    const token = response;
                    this.props.dispatch(insertToken(token));
                    Keyboard.dismiss();
                    this.resetNavigationTo('drawerStack');
                }
            });

        this.props.dispatch(insertPassword(null));
    };

    render() {
        return <AppBackground>
            <OfflineNotice isConnected={this.props.isConnected} />
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

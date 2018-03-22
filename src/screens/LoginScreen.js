import React from 'react';
import { Text, StatusBar, Keyboard, NetInfo, Platform, AsyncStorage, View } from 'react-native';
import { connect } from 'react-redux';

import loginStyles from './style/loginStyles';
import { strings } from '../locales/i18n';
import { Input } from '../components/TextInput';
import { SignInButton } from '../components/Button';
import { AppBackground } from '../components/AppBackground';
import { insertUsername, insertPassword, insertToken } from '../redux/actions/user';
import { isNetworkConnected, login } from './api';
import { NavigationActions } from 'react-navigation';
import { toggleConnection } from '../redux/actions/connection';
import { setInitialConnection } from '../redux/actions/connection';
import { OfflineNotice } from '../components/OfflineNotice';
import { LOGGED_IN_ROUTE_NAME } from '../navigation/AppNavigation';

// "export" necessary in order to test component without Redux store
export class LoginScreen extends React.Component {

    constructor(props)
    {
        super(props);

        if (this.props.token) { // this.props.token != null
            //TODO: verify token
            /*
            const response = verifyToken(this.props.user.token);
            if (someCondition(response)) {
            }
            */
            this.props.navigation.navigate(LOGGED_IN_ROUTE_NAME);
        }
    }

    componentDidMount() {
        /* First sets the initial connection state, and then adds eventlistener to listen to connection changes.
            Unused 'isConnected' was added to ensure that setInitialConnection runs before toggling anything*/
        isNetworkConnected()
            .then(isConnected => {
                this.props.dispatch(setInitialConnection({ connectionStatus: isConnected }));})
            .then(isConnected => Platform.OS === 'android' ? NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange) : '');
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') { NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange); }
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
        login(this.props.username, this.props.password)
            .then(token => {
                if (token === undefined) {
                    alert('Invalid username or password');
                } else {
                    this.props.dispatch(insertToken(token));
                    Keyboard.dismiss();
                    this.resetNavigationTo(LOGGED_IN_ROUTE_NAME);
                    this.props.dispatch(insertPassword(null));
                }
            });
    };

    render() {
        return (
            <AppBackground>
                <StatusBar
                    backgroundColor={ this.props.isConnected ? '#3d4f7c' : '#b52424'}
                    hidden={false}
                    barStyle="light-content"/>

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
                    Copyright © Arter Oy 2018
                </Text>
            </AppBackground>
        );
    }
}

// maps Redux state to component props. Object that is returned can be accessed via 'this.props' e.g. this.props.username
const mapStateToProps = (state) => {
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

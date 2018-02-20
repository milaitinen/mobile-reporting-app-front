import React from 'react';
import { Text, StatusBar, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import loginStyles from './style/loginStyles';
import { strings } from '../locales/i18n';
import { SignInButton } from '../components/Button';
import { Input } from '../components/TextInput';
import { AppBackground } from '../components/AppBackground';
import { insertUsername, insertPassword, /*insertServerUrl,*/ insertToken } from '../redux/actions/user';
import { login, /* mockLogin, verifyToken, invalidCredentialsResponse*/ } from './api';
import userReducer from '../redux/reducers/user';
import { emptyTemplates } from '../redux/actions/templates';
import { emptyReports } from '../redux/actions/reportsByTemplateID';
import { NavigationActions } from 'react-navigation';


// "export" necessary in order to test component without Redux store
export class LoginScreen extends React.Component {

    constructor(props)
    {
        super(props);
        /*
        this.state = {
            // isLoading     : true,
            username    : '',
            password        : '',
            serverUrl       : ''
        };
        */


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

    //A modified version of the function signOut (used in navigation/Sidebar.js)
    navigationReset = () => {
        // perform logging out related tasks here
        const signOutDestinationRouteName = 'loginStack';

        this.props.dispatch(insertToken(null));
        this.props.dispatch(emptyTemplates());
        this.props.dispatch(emptyReports());

        /*
        This sets the navigation back to the beginning, i.e. to the login screen.
        (This means that the back button in Android will not return to the signed in part of the app,
        but will instead exit the app.)
         */
        const actionToDispatch = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: signOutDestinationRouteName })]
        });
        this.props.navigation.dispatch(actionToDispatch);
    };

    logIn = () => {
        //Erases user input from the login screen and the navigation actions of a previous user.
        if (this.props.token !== null) this.navigationReset();

        login(this.props.username, this.props.password)
            .then(response => {
                if (response === undefined) { // TODO change undefined to invalidCredentialsResponse?
                    alert('Invalid username or password');
                } else {
                    const token = response;
                    this.props.dispatch(insertToken(token));
                    Keyboard.dismiss();
                    this.props.navigation.navigate('drawerStack');

                    this.props.dispatch(insertPassword(null));
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
    return {
        password,
        username
    };
};

export default connect(mapStateToProps)(LoginScreen);

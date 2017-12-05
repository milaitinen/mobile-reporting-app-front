import React from 'react';
import { Text } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import LoginScreen from '../Containers/LoginScreen';
import SignupScreen from '../Containers/SignUpScreen';
import ForgottenPasswordScreen from '../Containers/ForgottenPasswordScreen';

import MockFormScreen from '../Containers/MockFormScreen';
import TemplateScreen from '../Containers/TemplateScreen';
import TemplateView from '../Containers/TemplateView';
import NewFormScreen from '../Containers/NewFormScreen';



const TemplateStack = StackNavigator({

    Templates: { screen: TemplateView,     navigationOptions: ({ navigation }) => ({
        title: 'Templates',
        headerStyle: { backgroundColor: '#f0f8ff' },
        headerLeft: <Text style={{ fontSize: 30, fontWeight:'bold', paddingLeft: 15 } } onPress={() => {

            navigation.navigate('DrawerOpen');

        }}>☰</Text>
    })
    },

    Reports: { screen: TemplateScreen, navigationOptions: ({ navigation }) => ({
        title: navigation.state.routeName
    }) },

    NewForm: { screen: NewFormScreen, navigationOptions: { title: 'Create new report' } },

}, {

});

const DrawerStack = DrawerNavigator({
    Menu: { screen: TemplateStack, navigationOptions: { title: 'Templates' } },
    MockForms: { screen: MockFormScreen, navigationOptions: { title: 'Mockforms' } },

});

const LoginStack = StackNavigator({
    loginScreen: { screen: LoginScreen },
    signupScreen: { screen: SignupScreen, navigationOptions: { title: 'Create an account' } },
    forgottenPasswordScreen: { screen: ForgottenPasswordScreen, navigationOptions: { title: 'Forgot Password' } },
}, {

    headerMode: 'screen',
    navigationOptions: {
        headerStyle: { backgroundColor: '#f0f8ff' },
        header: null
    }
});

// Manifest of possible screens
const MainScreenNavigator = StackNavigator({
    loginStack: { screen: LoginStack },
    drawerStack: { screen: DrawerStack },

}, {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'loginStack'
});

export default MainScreenNavigator;
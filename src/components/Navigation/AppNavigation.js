import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'
import LoginScreen from '../Containers/LoginScreen'
import SignupScreen from '../Containers/SignupScreen'
import ForgottenPasswordScreen from '../Containers/ForgottenPasswordScreen'

import Heading from "../Header/index";
import MockFormScreen from "../MockFormScreen/index";
import ReviewScreen from "../ReviewScreen/index";
import MenuScreen from "../Containers/MenuScreen";


var MainScreenNavigator = TabNavigator({
    Forms: {screen: ReviewScreen},
    MockForms: {screen: MockFormScreen}
}, {
    swipeEnabled: true,
    tabBarOptions: {
        labelStyle: {
            fontSize: 16,
            padding: 10
        }
    }
});
/*
MainScreenNavigator.navigationOptions = {
    title: "Tab example"
};
*/

const styles = StyleSheet.create({ container: { flex: 1, marginTop: 30 } });

// -- Some new code --

const DrawerStack = DrawerNavigator({
    Menu: { screen: MenuScreen, navigationOptions: { title: 'Main Menu' } },
    Forms: { screen: ReviewScreen, navigationOptions: { title: 'Your forms' }},
    MockForms: { screen: MockFormScreen, navigationOptions: { title: 'Mockforms' } },
})

const DrawerNavigation = StackNavigator({
    DrawerStack: { screen: DrawerStack }
}, {
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
        headerStyle: {backgroundColor: '#f0f8ff'},
        headerLeft: <Text style={{fontSize: 30, fontWeight:'bold', paddingLeft: 15} } onPress={() => {
            // Coming soon: navigation.navigate('DrawerToggle')
            // https://github.com/react-community/react-navigation/pull/2492
            if (navigation.state.index === 0) {
                navigation.navigate('DrawerOpen')
            } else {
                navigation.navigate('DrawerClose')
            }
        }}>☰</Text>
    })
})

// login stack
const LoginStack = StackNavigator({
    loginScreen: { screen: LoginScreen },
    signupScreen: { screen: SignupScreen, navigationOptions: { title: 'Create an account' }},
    forgottenPasswordScreen: { screen: ForgottenPasswordScreen, navigationOptions: { title: 'Forgot Password' } },
    menuScreen: { screen: MenuScreen }
}, {
    headerMode: 'float',
    navigationOptions: {
        headerStyle: {backgroundColor: '#f0f8ff'},
        title: 'Mobile Reporting App'
    }
})

// Manifest of possible screens
const PrimaryNav = StackNavigator({
    loginStack: { screen: LoginStack },
    drawerStack: { screen: DrawerNavigation }
}, {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'loginStack'
})

export default PrimaryNav

//export default MainScreenNavigator;

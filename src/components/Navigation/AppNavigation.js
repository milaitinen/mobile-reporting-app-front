import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'
import LoginScreen from '../Containers/LoginScreen'
import SignupScreen from '../Containers/SignupScreen'
import ForgottenPasswordScreen from '../Containers/ForgottenPasswordScreen'

import MockFormScreen from "../MockFormScreen/index";
import ReviewScreen from "../ReviewScreen/index";
import MenuScreen from "../Containers/MenuScreen";
import TemplateView from "../Containers/TemplateView";


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


const DrawerStack = DrawerNavigator({
    Menu: { screen: TemplateView, navigationOptions: { title: 'Templates' } },
    MockForms: { screen: MockFormScreen, navigationOptions: { title: 'Mockforms' } },

})

const DrawerNavigation = StackNavigator({
    DrawerStack: { screen: DrawerStack ,navigationOptions: ({navigation}) => ({
            headerStyle: {backgroundColor: '#f0f8ff'},
            headerLeft: <Text style={{fontSize: 30, fontWeight:'bold', paddingLeft: 15} } onPress={() => {

                if (navigation.state.index === 0) {
                    navigation.navigate('DrawerOpen')
                } else {
                    navigation.navigate('DrawerClose')
                }
            }}>☰</Text>
        })},
    FormsFromBackendServer: { screen: ReviewScreen, navigationOptions: ({ navigation }) => ({
            title: navigation.state.routeName
        }),}
    },


    {
    headerMode: 'float',

})

// login stack
const LoginStack = StackNavigator({
    loginScreen: { screen: LoginScreen },
    signupScreen: { screen: SignupScreen, navigationOptions: { title: 'Create an account' }},
    forgottenPasswordScreen: { screen: ForgottenPasswordScreen, navigationOptions: { title: 'Forgot Password' } },
}, {

    headerMode: 'screen',
    navigationOptions: {
        headerStyle: {backgroundColor: '#f0f8ff'},
        title: 'Mobile Reporting App',
        header: null
    }
})

// Manifest of possible screens
const PrimaryNav = StackNavigator({
    loginStack: { screen: LoginStack },
    drawerStack: { screen: DrawerNavigation },

}, {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'loginStack'
})

export default PrimaryNav
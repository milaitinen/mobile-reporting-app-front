import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'
import LoginScreen from '../Containers/LoginScreen'
import SignupScreen from '../Containers/SignupScreen'
import ForgottenPasswordScreen from '../Containers/ForgottenPasswordScreen'

import MockFormScreen from "../MockFormScreen/index";
import ReviewScreen from "../ReviewScreen/index";
import NewFormScreen from "../Containers/NewFormScreen";
import TemplateView from "../Containers/TemplateView";




const TemplateStack = StackNavigator({

    Templates: { screen: TemplateView,     navigationOptions: ({navigation}) => ({
            title: 'Templates',
            headerStyle: {backgroundColor: '#f0f8ff'},
            headerLeft: <Text style={{fontSize: 30, fontWeight:'bold', paddingLeft: 15} } onPress={() => {

                navigation.navigate('DrawerOpen')

            }}>☰</Text>
        })
    },

    FormsFromBackendServer: { screen: ReviewScreen, navigationOptions: ({ navigation }) => ({
            title: navigation.state.routeName
        }) },

    NewForm: { screen: NewFormScreen, navigationOptions: { title: 'Create new report' }},

}, {

})

const DrawerStack = DrawerNavigator({
    Menu: { screen: TemplateStack, navigationOptions: { title: 'Templates' } },
    MockForms: { screen: MockFormScreen, navigationOptions: { title: 'Mockforms' } },

})

const LoginStack = StackNavigator({
    loginScreen: { screen: LoginScreen },
    signupScreen: { screen: SignupScreen, navigationOptions: { title: 'Create an account' }},
    forgottenPasswordScreen: { screen: ForgottenPasswordScreen, navigationOptions: { title: 'Forgot Password' } },
}, {

    headerMode: 'screen',
    navigationOptions: {
        headerStyle: {backgroundColor: '#f0f8ff'},
        header: null
    }
})

// Manifest of possible screens
const MainScreenNavigator = StackNavigator({
    loginStack: { screen: LoginStack },
    drawerStack: { screen: DrawerStack },

}, {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'loginStack'
})

export default MainScreenNavigator
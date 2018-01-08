import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgottenPasswordScreen from '../screens/ForgottenPasswordScreen';

import TemplateScreen from '../screens/TemplateScreen';
import NewFormScreen from '../screens/NewFormScreen';
import ReportsScreen from '../screens/ReportsScreen';


const TemplateStack = StackNavigator({
    Templates: {
        screen: TemplateScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Templates',
            headerStyle: { backgroundColor: '#f0f8ff' },
            headerLeft:
                <View style={{ paddingLeft: 15 }}>
                    <Icon name={'menu'} color={'gray'} size={30} onPress={() => { navigation.navigate('DrawerOpen'); }}  />
                </View>
        })
    },
    Reports: {
        screen: TemplateScreen,
        navigationOptions: ({ navigation }) => ({ title: navigation.state.routeName })
    },
    NewForm: {
        screen: NewFormScreen,
        navigationOptions: { title: 'Create new report' }
    },
    ReportsPage: {
        screen: ReportsScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Reports',
            headerStyle: { backgroundColor: '#f0f8ff' },
            headerLeft:
                <View style={{ paddingLeft: 15 }}>
                    <Icon name={'menu'} color={'gray'} size={30} onPress={() => { navigation.navigate('DrawerOpen'); }}  />
                </View>
        })
    },

}, {
    // is this part necessary?
});

const DrawerStack = DrawerNavigator({
    Menu: {
        screen: TemplateStack,
        navigationOptions: { title: 'Templates' }
    },
});

const LoginStack = StackNavigator({
    loginScreen: {
        screen: LoginScreen
    },
    signUpScreen: {
        screen: SignUpScreen,
        navigationOptions: { title: 'Create an account' }
    },
    forgottenPasswordScreen: {
        screen: ForgottenPasswordScreen,
        navigationOptions: { title: 'Forgot Password' }
    },
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

import React from 'react';

import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgottenPasswordScreen from '../screens/ForgottenPasswordScreen';

import TemplateScreen from '../screens/TemplateScreen';
import NewReportScreen from '../screens/NewReportScreen';

import navigationStyles from './navigationStyles';

import Sidebar from '../navigation/Sidebar';

//The stack that is contained within the drawer stack
const TemplateStack = StackNavigator({
    Templates: {
        screen: TemplateScreen,
        navigationOptions: ({ navigation }) => ({
            flex: 0.3,
            headerTitle: 'Templates',
            headerStyle: navigationStyles.HeaderContainer,
            headerTitleStyle: navigationStyles.ScreenHeader,
            headerLeft:
                <Icon
                    name={'menu'}
                    type={'feather'}
                    color={'#fff'}
                    size={35}
                    containerStyle={navigationStyles.menuIcon}
                    onPress={() => { navigation.navigate('DrawerOpen'); }}>
                </Icon>
        })
    },
    Reports: {
        screen: TemplateScreen,
        navigationOptions: ({ navigation }) => ({ title: navigation.state.routeName })
    },
    NewReport: {
        screen: NewReportScreen,
        navigationOptions: { title: 'Create new report' }
    },

}, {
    // is this part necessary?
});

const DrawerStack = DrawerNavigator({
    Menu: {
        screen: TemplateStack,
        navigationOptions: { title: 'Templates' }
    },
}, {
    //This loads the contents of the drawer from the custom Sidebar
    contentComponent: Sidebar,

    //These fix a bug with the drawer navigator
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
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
    initialRouteName: 'loginStack',
});

export default MainScreenNavigator;

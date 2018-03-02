import React from 'react';
import { StackNavigator, DrawerNavigator, HeaderBackButton, NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';

import LoginScreen from '../screens/LoginScreen';
import TemplateScreen from '../screens/TemplateScreen';
import NewReportScreen from '../screens/NewReportScreen';
import PreviewScreen from '../screens/PreviewScreen';
import ReportScreen from '../screens/ReportScreen';
import navigationStyles from './navigationStyles';
import Sidebar from '../navigation/Sidebar';
import { strings } from '../locales/i18n';
import { Alert } from 'react-native';

export const LOGGED_OUT_ROUTE_NAME = 'loginScreen';
export const LOGGED_IN_ROUTE_NAME = 'loggedInDrawer';

// The stack that is contained within the logged in drawer
const TemplateStack = StackNavigator({
    Templates: {
        screen: TemplateScreen,
        navigationOptions: ({ navigation }) => ({
            flex: 0.3,
            headerTitle: strings('templates.templates') ,
            headerStyle: navigationStyles.HeaderContainer,
            headerTitleStyle: navigationStyles.ScreenHeader,
            headerBackTitle: null,
            headerLeft:
                <Icon
                    name={'menu'}
                    type={'feather'}
                    iconStyle={navigationStyles.menuIcon}
                    containerStyle={navigationStyles.menuIconContainer}
                    onPress={() => { navigation.navigate('DrawerOpen'); }}>
                </Icon>,
        })
    },
    NewReport: {
        screen: NewReportScreen,
        navigationOptions: ({ navigation }) => ({
            flex: 0.3,
            headerTitle: strings('createNew.createNew'),
            headerStyle: navigationStyles.HeaderContainer,
            headerTitleStyle: navigationStyles.ScreenHeader,
            headerTintColor: '#fff',
            /*
            headerLeft: <HeaderBackButton
                tintColor='#fff'
                onPress={() => { //TODO: move somewhere else and unify with android hardware button version
                    Alert.alert(
                        'You have unsaved changes',
                        'Are you sure you want to leave without saving?',
                        [
                            { text: 'Cancel', onPress: () => console.log('Cancel pressed'), style: 'cancel' },
                            { text: 'No', onPress: () => console.log('No Pressed') },
                            { text: 'Yes', onPress: () => {
                                console.log('Yes Pressed');
                                navigation.goBack(null); }
                            },
                        ],
                        { cancelable: false }
                    );
                }} />,
                */
            drawerLockMode: 'locked-closed',
        })
    },
    Report: {
        screen: ReportScreen,
        navigationOptions: () => ({
            flex: 0.3,
            //headerTitle: strings('templates.report'), // this is overridden with the actual report title
            headerStyle: navigationStyles.HeaderContainer,
            headerTitleStyle: navigationStyles.ScreenHeader,
            headerTintColor: '#fff',
        })
    },
    Preview: {
        screen: PreviewScreen,
        navigationOptions: () => ({
            flex: 0.3,
            headerTitle: strings('templates.preview'),
            headerStyle: navigationStyles.HeaderContainer,
            headerTitleStyle: navigationStyles.ScreenHeader,
            headerTintColor: '#fff',
            drawerLockMode: 'locked-closed',
        })
    },

},
);

const LoggedInDrawer = DrawerNavigator({
    Menu: {
        screen: TemplateStack,
        navigationOptions: {
            title: strings('templates.templates'),
        }
    },
}, {
    // This loads the contents of the drawer from the custom Sidebar
    contentComponent: Sidebar,

    // These fix a bug with the drawer navigator
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
});


// Manifest of possible screens
const MainScreenNavigator = StackNavigator({
    loginScreen: { screen: LoginScreen },
    loggedInDrawer: { screen: LoggedInDrawer },
}, {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: LOGGED_OUT_ROUTE_NAME,
});

export default MainScreenNavigator;

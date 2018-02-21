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


// The stack that is contained within the drawer stack
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
    Reports: {
        screen: TemplateScreen,
        navigationOptions: ({ navigation }) => ({ title: navigation.state.routeName })
    },
    NewReport: {
        screen: NewReportScreen,
        navigationOptions: ({ navigation }) => ({
            flex: 0.3,
            headerTitle: strings('createNew.createNew') ,
            headerStyle: navigationStyles.HeaderContainer,
            headerTitleStyle: navigationStyles.ScreenHeader,
            headerTintColor: '#fff',
            headerLeft: <HeaderBackButton
                tintColor='#fff'
                onPress={() => {
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
        })
    },
    Report: {
        screen: ReportScreen,
        navigationOptions: () => ({
            flex: 0.3,
            headerTitle: 'Report', //TODO: translate
            headerStyle: navigationStyles.HeaderContainer,
            headerTitleStyle: navigationStyles.ScreenHeader,
            headerTintColor: '#fff',
        })
    },
    Preview: {
        screen: PreviewScreen,
        navigationOptions: () => ({
            flex: 0.3,
            headerTitle: 'Preview', //TODO: translate
            headerStyle: navigationStyles.HeaderContainer,
            headerTitleStyle: navigationStyles.ScreenHeader,
            headerTintColor: '#fff',
        })
    },

},
);

const DrawerStack = DrawerNavigator({
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

const LoginStack = StackNavigator({
    loginScreen: {
        screen: LoginScreen
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

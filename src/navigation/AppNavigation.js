import React from 'react';
import { StackNavigator, DrawerNavigator, HeaderBackButton } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { View, Text } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import TemplateScreen from '../screens/TemplateScreen';
import NewReportScreen from '../screens/NewReportScreen';
import PreviewScreen from '../screens/PreviewScreen';
import ReportScreen from '../screens/ReportScreen';
import navigationStyles from './navigationStyles';
import Sidebar from '../navigation/Sidebar';
import connectionReducer from '../redux/reducers/connection';
import { strings } from '../locales/i18n';
import { Alert } from 'react-native';
import OfflineNotice from '../components/OfflineNotice/OfflineNotice';

export const LOGGED_OUT_ROUTE_NAME = 'loginScreen';
export const LOGGED_IN_ROUTE_NAME = 'loggedInDrawer';

// The stack that is contained within the logged in drawer
const TemplateStack = StackNavigator({
    Templates: {
        screen: TemplateScreen,
        navigationOptions: ({ navigation }) => ({
            flex: 0.3,
            header:
                <View style={ navigationStyles.HeaderContainer}>
                    <OfflineNotice />
                    <Icon
                        name={'menu'}
                        type={'feather'}
                        iconStyle={navigationStyles.menuIcon}
                        containerStyle={navigationStyles.menuIconContainer}
                        onPress={() => { navigation.navigate('DrawerOpen'); }}>
                    </Icon>
                    <View style={ { flex:1,justifyContent: 'center',alignItems: 'center' } }>
                        <Text style={ navigationStyles.ScreenHeaderTemplates }>{ strings('templates.templates') }</Text>
                    </View>
                </View>
        })
    },
    NewReport: {
        screen: NewReportScreen,
        navigationOptions: ({ navigation }) => ({
            flex: 0.3,
            drawerLockMode: 'locked-closed',
            header:
               <View style={ navigationStyles.HeaderContainer}>
                   <OfflineNotice
                       hidden={false}
                       barStyle="light-content"/>
                   <HeaderBackButton
                       tintColor='#fff'
                       style={ navigationStyles.headerBackStyle }
                       onPress={() => {
                           Alert.alert(
                               'You have unsaved changes',
                               'Are you sure you want to leave without saving?',
                               [
                                   { text: 'Cancel', onPress: () => console.log('Cancel pressed'), style: 'cancel' },
                                   { text: 'Save', onPress: () => ReportScreen.save() },
                                   { text: 'Don\'t save', onPress: () => {
                                       console.log('Yes Pressed');
                                       navigation.goBack(null); }
                                   },
                               ],
                               { cancelable: false }
                           );
                       }}/>
                   <View style={ { flex:1,justifyContent: 'center',alignItems: 'center' } }>
                       <Text style={ navigationStyles.ScreenHeader }>{ strings('createNew.createNew') }</Text>
                   </View>
               </View>,
        })
    },
    Report: {
        screen: ReportScreen,
        navigationOptions: ({ navigation }) => ({
            flex: 0.3,
            header:
                <View style={ navigationStyles.HeaderContainer}>
                    <OfflineNotice />
                    <HeaderBackButton
                        tintColor='#fff'
                        style={ navigationStyles.headerBackStyle }
                        onPress={() => navigation.goBack(null) }/>
                    <View style={ { flex:1,justifyContent: 'center',alignItems: 'center' } }>
                        <Text style={ navigationStyles.ScreenHeader }>{ strings('templates.report') }</Text>
                    </View>
                </View>,

        })
    },
    Preview: {
        screen: PreviewScreen,
        navigationOptions: ({ navigation }) => ({
            flex: 0.3,
            drawerLockMode: 'locked-closed',
            header:
                <View style={ navigationStyles.HeaderContainer}>
                    <OfflineNotice />
                    <HeaderBackButton
                        tintColor='#fff'
                        style={ navigationStyles.headerBackStyle }
                        onPress={() => navigation.goBack(null) }/>
                    <View style={ { flex:1,justifyContent: 'center',alignItems: 'center' } }>
                        <Text style={ navigationStyles.ScreenHeader }>Preview</Text>
                    </View>
                </View>,
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

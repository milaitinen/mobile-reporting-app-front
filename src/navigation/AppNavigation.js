import React from 'react';
import { StackNavigator, DrawerNavigator, HeaderBackButton, NavigationActions } from 'react-navigation';
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
                    <View style={ navigationStyles.titleContainer }>
                        <Text style={ navigationStyles.ScreenHeader }>{ strings('templates.templates') }</Text>
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
                   <View style={ navigationStyles.backButtonContainer }>
                       <HeaderBackButton
                           tintColor='#fff'
                           style={ navigationStyles.headerBackStyle }
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
                           }}/>
                   </View>

                   <View style={ navigationStyles.titleContainer }>
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
                    <View style={ navigationStyles.backButtonContainer }>
                        <HeaderBackButton
                            tintColor='#fff'
                            style={ navigationStyles.headerBackStyle }
                            onPress={() => navigation.goBack(null) }/>
                    </View>
                    <View style={ navigationStyles.titleContainer }>
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
                    <View style={ navigationStyles.backButtonContainer }>
                        <HeaderBackButton
                            tintColor='#fff'
                            style={ navigationStyles.headerBackStyle }
                            onPress={() => navigation.goBack(null) }/>
                    </View>

                    <View style={ navigationStyles.titleContainer }>
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

/*
  Prevents navigating multiple times if this.props.navigation.navigate is triggered multiples times in a short
  period of time inside TemplateStack by comparing current and previous navigation routes. Router action and state
  are provided as parameters.
*/

const prevGetStateForActionTemplateStack = TemplateStack.router.getStateForAction;
TemplateStack.router.getStateForAction = (action, state) => {
    // Action type and routeName
    const { type, routeName } = action;
    /*
      If navigating to the same route after already navigating there, null is returned to prevent multiple navigations.
      Prevents from navigating to the same route in TemplateStack if already in the corresponding screen.
    */
    if (state &&
        type === NavigationActions.NAVIGATE &&
        routeName === state.routes[state.routes.length - 1].routeName) {
        return null;
    // Else add a screen to the stack - i.e. call default action for navigating.
    } else {
        return prevGetStateForActionTemplateStack(action, state);
    }
};

export default MainScreenNavigator;

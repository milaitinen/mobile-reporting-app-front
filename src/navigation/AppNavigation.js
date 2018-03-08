import React from 'react';
import { StackNavigator, DrawerNavigator, HeaderBackButton } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { View, Text } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import TemplateScreen from '../screens/TemplateScreen';
import NewReportScreen from '../screens/NewReportScreen';
import PreviewScreen from '../screens/PreviewScreen';
import navigationStyles from './navigationStyles';
import Sidebar from '../navigation/Sidebar';
import connectionReducer from '../redux/reducers/connection';
import { strings } from '../locales/i18n';
import { Alert } from 'react-native';
import OfflineNotice from '../components/OfflineNotice/OfflineNotice';


// The stack that is contained within the drawer stack
const TemplateStack = StackNavigator({
    Templates: {
        screen: TemplateScreen,
        navigationOptions: ({ navigation }) => ({
            flex: 0.3,
            header:
                <View style={ navigationStyles.HeaderContainer}>
                    <OfflineNotice isConnected={ connectionReducer }/>
                    <Text style={ navigationStyles.ScreenHeader }>{ strings('templates.templates') }</Text>
                    <Icon
                        name={'menu'}
                        type={'feather'}
                        iconStyle={navigationStyles.menuIcon}
                        containerStyle={navigationStyles.menuIconContainer}
                        onPress={() => { navigation.navigate('DrawerOpen'); }}>
                    </Icon>
                </View>
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

/* eslint-disable react/display-name */
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { BackHandler } from 'react-native';

import AppNavigator from './src/navigation/AppNavigation';
import createStore from './src/redux/store';

// global variables declared here - they can be used anywhere inside src directory.
EStyleSheet.build({
    // lighter blue: '#455fa1', '#364a7d', '#2e3f6b'
    $darkBlue: '#3d4f7c',
    $darkerBlue: '#31456f',
    $darkestBlue: '#1b3055',
    $primaryWhite: '#fff',
    $primaryFont: 'Roboto-Light',


    $containerBorderRadius: 5,
    $buttonBorderRadius: 10,
    $dropdownRadius: 1,
});

class App extends React.Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    render() {
        const { dispatch, nav } = this.props;
        const navigation = addNavigationHelpers({
            dispatch,
            state: nav
        });

        return <AppNavigator navigation={navigation} />;
    }
}

const mapStateToProps = (state) => ({
    nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore;

// <Navigator onNavigationStateChange={null} /> useful in dev-mode?
export default class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}
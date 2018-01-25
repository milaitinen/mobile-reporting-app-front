/* eslint-disable react/display-name */
import React from 'react';
import AppNavigator from './src/navigation/AppNavigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider, connect } from 'react-redux';

import createStore from './src/redux/store';
import { addNavigationHelpers } from 'react-navigation';

//TODO: Fix android hardware back button navigation and jest tests:
//see: https://reactnavigation.org/docs/guides/redux#Mocking-tests
//and: https://reactnavigation.org/docs/guides/redux#Handling-the-Hardware-Back-Button-in-Android

// global variables declared here - they can be used anywhere inside src directory.
EStyleSheet.build({
    // lighter blue: '#455fa1', '#364a7d', '#2e3f6b'
    $darkBlue: '#3d4f7c',
    $darkerBlue: '#31456f',
    $darkestBlue: '#1b3055',
    $primaryWhite: '#fff',
    $primaryFont: 'Roboto-Light',
});

class App extends React.Component {
    render() {
        return (
            <AppNavigator navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.nav,
            })} />
        );
    }
}

const mapStateToProps = (state) => ({
    nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App)

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
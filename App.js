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
    $gray1: '#adadad',
    $gray2: '#a0a0a0',
    $draftBlue: '#8cc9e5',
    $sendGreen: '#99d9ad',
    $fieldBg: '#1b305570',
    $placeholder: '#8f8f8f',
    $inactive: '#9bcff9',
    $active: '#359ef3',
    $disabled: '#e4e4e4',
    $disabledBorder: '#c2c2c2',
    $disabledPlaceholder: '#c2c2c2',
    $containerBorderRadius: 5,
    $inputBorderRadius: 3,
    $buttonBorderRadius: 10,
    $buttonBorderRadiusSmall: 7,
    $dropdownRadius: 3,
    $containerBorderWidth: 2,
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
        dispatch(NavigationActions.back());
        //If navigation state doesn't change (can't go back),
        //this returns false and exits the app
        return nav !== this.props.nav;
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
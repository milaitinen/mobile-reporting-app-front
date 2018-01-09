import React from 'react';
import Navigator from './src/navigation/AppNavigation';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({
    $darkBlue: '#3d4f7c',
    $darkerBlue: '#31456f',
    $darkestBlue: '#1b3055',

});

export default class App extends React.Component {
    render() {
        return (
            <Navigator/>
        );
    }
}

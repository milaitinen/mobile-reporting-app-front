import React from 'react';
import Navigator from './src/navigation/AppNavigation';
import EStyleSheet from 'react-native-extended-stylesheet';

// global variables declared here - they can be used anywhere inside src directory.
EStyleSheet.build({
    // lighter blue: '#455fa1', '#364a7d', '#2e3f6b'
    $darkBlue: '#3d4f7c',
    $darkerBlue: '#31456f',
    $darkestBlue: '#1b3055',
    $primaryWhite: '#fff',
    $primaryFont: 'Roboto-Light',
});

export default class App extends React.Component {
    render() {
        return (
            <Navigator/>
        );
    }
}

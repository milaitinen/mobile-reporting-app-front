import { NavigationActions } from 'react-navigation';
import React from 'react';
import { View, Text } from 'react-native';

export default class Sidebar extends React.Component {


    //TODO: improve code style
    logout = (route) => {
        //perform other logging out related tasks here
        console.log('logging out');
        console.log(`2 + 2 = ${2 + 2}`);

        const actionToDispatch = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: route })]
        });
        this.props.navigation.dispatch(actionToDispatch);
    }

    //TODO: update the look
    render () {
        return (
            <View>
                <Text onPress={ () => console.log('painoit ekaa nappia')}>
                    ensimmäinen juttu
                </Text>
                <Text onPress={ () => this.logout('loginStack') }>
                    toka juttu
                </Text>
            </View>
        );
    }
}

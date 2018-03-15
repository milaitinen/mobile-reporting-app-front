import { NavigationActions } from 'react-navigation';
import React from 'react';
import { Button, View } from 'react-native';
import { strings } from '../locales/i18n';
import { insertToken, insertUsername } from '../redux/actions/user';
import { emptyTemplates } from '../redux/actions/templates';
import { emptyReports } from '../redux/actions/reports';
import { connect } from 'react-redux';
import { LOGGED_OUT_ROUTE_NAME } from './AppNavigation';

class Sidebar extends React.Component {

    signOut = () => {
        // perform other logging out related tasks here

        this.props.dispatch(insertUsername(null));
        this.props.dispatch(insertToken(null));
        this.props.dispatch(emptyTemplates());
        this.props.dispatch(emptyReports());

        /*
        This sets the navigation back to the beginning, i.e. to the login screen.
        This means that the back button in Android will not return to the signed in part of the app,
        but will instead exit the app.
         */
        const actionToDispatch = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: LOGGED_OUT_ROUTE_NAME })]
        });
        this.props.navigation.dispatch(actionToDispatch);
    };

    // TODO: update the look and consider removing inline style
    render () {
        return (
            <View style={ { padding: 20 } }>
                <Button onPress={() => this.signOut()} title={strings('navigation.signOut')}/>
            </View>
        );
    }
}

export default connect()(Sidebar);
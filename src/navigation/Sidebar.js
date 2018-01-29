import { NavigationActions } from 'react-navigation';
import React from 'react';
import { View, Button } from 'react-native';
import { strings } from '../locales/i18n';
import { insertEmail, insertPassword, setAuthenticated } from '../redux/actions/user';
import { connect } from 'react-redux';

class Sidebar extends React.Component {

    signOutDestinationRouteName = 'loginStack';

    signOut = () => {
        // perform other logging out related tasks here

        this.props.dispatch(setAuthenticated(false));
        this.props.dispatch(insertEmail(null));
        this.props.dispatch(insertPassword(null));

        /*
        This sets the navigation back to the beginning, i.e. to the login screen.
        This means that the back button in Android will not return to the signed in part of the app,
        but will instead exit the app.
         */
        const actionToDispatch = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: this.signOutDestinationRouteName })]
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

const mapStateToProps = (store) => {
    return  {
        authenticated: store.user.authenticated,
    };
}

export default connect(mapStateToProps)(Sidebar);
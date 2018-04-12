import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';

/**
 * A modified status bar -component that changes color depending on the network connection status
 */
export class OfflineNotice extends React.Component {

    render() {
        const backgroundColor = this.props.isConnected ? '#3d4f7c' : '#b52424';

        if (Platform.OS === 'ios') {
            return (
                <View style={[styles.offlineContainer, { backgroundColor }]}>
                    <StatusBar translucent backgroundColor={ backgroundColor }/>
                </View>
            );
        } else {
            return (
                <StatusBar backgroundColor={ backgroundColor } barStyle="light-content" />
            );
        }
    }
}

export const mapStateToProps = ( state ) => { // exported for testing purposes
    return {
        isConnected: state.connection.isConnected,
    };
};

export default connect(mapStateToProps)(OfflineNotice);

import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';

/**
 * A modified status bar -component that changes color depending on the network connection status
 */
class OfflineNotice extends React.Component {

    render() {
        const backgroundColor = this.props.isConnected ? '#3d4f7c' : '#b52424';

        if (Platform.OS === 'ios') {
            console.log('connection at offlinenotice: '+this.props.isConnected);
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

const mapStateToProps = ( state ) => {
    return {
        isConnected: state.connection.isConnected,
    };
};

export default connect(mapStateToProps)(OfflineNotice);

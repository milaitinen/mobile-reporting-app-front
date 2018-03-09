import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';

/**
 * A modified status bar -component that changes color depending on the network connection status
 */
class OfflineNotice extends React.Component {
    constructor(props) {
        super(props);
        this.backgroundColor = () => this.props.isConnected ? '#3d4f7c' : '#b52424';
    }

    render(backgroundColor) {
        if (Platform.OS === 'android') {
            return (
                <StatusBar
                    backgroundColor={ backgroundColor }
                    barStyle="light-content" />
            );
        } else {
            return (
                <View style={[styles.offlineContainer, { backgroundColor }]}>
                    <StatusBar translucent backgroundColor={ backgroundColor }/>
                </View>
            );
        }
    }
}

const mapStateToProps = ( state ) => {
    return {
        isConnected: state.isConnected,
    };
};

export default connect(mapStateToProps)(OfflineNotice);

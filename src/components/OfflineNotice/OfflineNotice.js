import React from 'react';
import { View, StatusBar } from 'react-native';
import styles from './styles';

const OfflineNotice = ({ isConnected }) => {

    const backgroundColor = isConnected ? '#3d4f7c' : '#b52424';

    return (
        <View style={[styles.offlineContainer, { backgroundColor } ]}>
            <StatusBar translucent backgroundColor={ backgroundColor }/>
        </View>
    );
};
export default OfflineNotice;

import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import styles from './styles';

const OfflineNotice = ({ isConnected }) => {

    const backgroundColor = isConnected ? '#3d4f7c' : '#b52424';

    if(Platform.OS === 'android') {
        return (
            <StatusBar
                backgroundColor={ backgroundColor }
                barStyle="light-content" />
        );
    } else {
        return (
            <View style={[styles.offlineContainer, { backgroundColor }]}>
                <StatusBar translucent backgroundColor={backgroundColor}/>
            </View>
        );
    }
};
export default OfflineNotice;

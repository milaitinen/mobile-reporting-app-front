import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import styles from './styles';

const OfflineNotice = ({ isConnected }) => {

    const color = isConnected ? '#3d4f7c' : '#b52424';

    // not a good solution since alert will trigger when writing in offline mode >__>
    // if (!isConnected) {
    //     alert('No internet connection');
    // }
    return (
        <StatusBar
            backgroundColor={ color }
            barStyle="light-content" />
    );
};
export default OfflineNotice;

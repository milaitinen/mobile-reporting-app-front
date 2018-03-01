import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import styles from './styles';

const OfflineNotice = ({ isConnected }) => {

    const color = isConnected ? '#3d4f7c' : '#b52424';

    return (
        <StatusBar
            backgroundColor={ color }
            barStyle="light-content" />
    );
};
export default OfflineNotice;

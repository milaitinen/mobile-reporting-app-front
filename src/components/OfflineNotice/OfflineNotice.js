import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import styles from './styles';

const OfflineNotice = ({ color, isConnected }) => {
    if (isConnected) {
        alert('No internet connection');
    }
    return (
        <StatusBar backgroundColor={ color } barStyle="light-content" />
    );
};
export default OfflineNotice;

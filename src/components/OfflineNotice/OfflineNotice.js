import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import styles from './styles';

const { width } = Dimensions.get('window');

const OfflineNotice = () => {
    return (
        <View style={[styles.offlineContainer, { width: width }]}>
            <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
    );
};


export default OfflineNotice;
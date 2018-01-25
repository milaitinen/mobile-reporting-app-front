import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

const RightButton = ({ onPressPrev, onPressNew }) => {

    return (
        <View style={styles.backgroundStyle}>
            <TouchableHighlight
                onPress={onPressPrev}
                style = {styles.buttonContainer}>
                <View style={styles.separator}><Icon name={'find-in-page'} type={'Materialicons'} iconStyle={styles.iconStyleA} /></View>
            </TouchableHighlight>
            <TouchableHighlight
                onPress={onPressNew}
                style = {styles.buttonContainer}>
                <View><Icon name={'note-add'} type={'Materialicons'} iconStyle={styles.iconStyle} /></View>
            </TouchableHighlight>
        </View>

    );

};

export default RightButton;
import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

const RightButton = ({ onPressPrev, onPressNew }) => {

    return (
        <View style={{ flexDirection: 'row', backgroundColor: '#99d9ad'  }}>
            <TouchableHighlight
                onPress={onPressPrev}
                style = {styles.buttonContainer}>
                <View><Icon name={'find-in-page'} type={'Materialicons'} iconStyle={styles.iconStyle} /></View>
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
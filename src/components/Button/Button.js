import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import styles from './buttonStyles';
import color from 'color';

const CustomButton = ({ title, type, onPress }) => {

    if (type === 'send') {
        return (
            <View style={styles.view}>
                <TouchableHighlight
                    underlayColor={color('white').darken(0.1)}
                    style={styles.sendButtonContainer}
                    onPress={onPress}>
                    <View style={styles.buttonContent}>
                        <Icon name={'send'} color={EStyleSheet.value('$sendGreen')} size={18}/>
                        <Text style={styles.text}>{title}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
    return (
        <View style={styles.view}>
            <TouchableHighlight
                underlayColor={color('white').darken(0.1)}
                style={styles.saveButtonContainer}
                onPress={onPress}>
                <View style={styles.buttonContent}>
                    <Icon name={'save'} color={EStyleSheet.value('$draftBlue')} size={18}/>
                    <Text style={styles.text}>{title}</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
};

export default CustomButton;
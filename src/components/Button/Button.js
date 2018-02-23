import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import color from 'color';
import { Icon } from 'react-native-elements';
import styles from './buttonStyles';

// TODO: styling
const CustomButton = ({ title, type, onPress }) => {

    if (type === 'send') {
        return (
            <View style={styles.view}>
                <TouchableHighlight
                    underlayColor={color('#9dcbe5').darken(0.1)}
                    style={styles.sendButtonContainer}
                    onPress={onPress}>
                    <View style={styles.buttonContent}>
                        <Icon name={'send'} color={'#474c52'} size={18}/>
                        <Text style={styles.text}>{title}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
    return (
        <View style={styles.view}>
            <TouchableHighlight
                underlayColor={color('#87cce5').darken(0.1)}
                style={styles.saveButtonContainer}
                onPress={onPress}>
                <View style={styles.buttonContent}>
                    <Icon name={'save'} color={'#474c52'} size={18}/>
                    <Text style={styles.text}>{title}</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
};

export default CustomButton;
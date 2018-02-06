import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import color from 'color';

import styles from './buttonStyles';

// TODO: styling
const Button = ({ children, type }) => {
    const underlayColor = color('#9dcbe5').darken(0.1);

    return (
        <View style={styles.view}>
            <TouchableHighlight
                style={(type === 'send') ? styles.sendButtonContainer : styles.saveButtonContainer}
                underlayColor={underlayColor}
            >
                <Text style={styles.text}>{children}</Text>
            </TouchableHighlight>
        </View>
    );
};

export default Button;
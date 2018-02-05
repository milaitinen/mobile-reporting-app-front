import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import color from 'color';

import styles from './styles';

// TODO: styling
const Button = ({ children }) => {
    const underlayColor = color('#9dcbe5').darken(0.1);

    return (
        <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableHighlight
                style={styles.buttonContainer}
                underlayColor={underlayColor}
            >
                <Text style={styles.text}>{children}</Text>
            </TouchableHighlight>
        </View>
    );
};

export default Button;
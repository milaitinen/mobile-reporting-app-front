import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import color from 'color';

import styles from './signInstyles';

const SignInButton = ({ onPress, children }) => {
    const underlayColor = color('#9dcbe5').darken(0.1);

    return (
        <View style={styles.view}>
            <TouchableHighlight
                onPress={onPress}
                style={styles.buttonContainer}
                underlayColor={underlayColor}
            >
                <Text style={styles.text}>{children}</Text>
            </TouchableHighlight>
        </View>
    );
};

export default SignInButton;
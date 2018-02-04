import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import color from 'color';

import styles from './styles';

const SignInButton = ({ onPress, children }) => {
    const underlayColor = color('#9dcbe5').darken(0.1);

    return (
        <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center' }}>
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
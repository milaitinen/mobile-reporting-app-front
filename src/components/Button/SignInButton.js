import React from 'react';
import { Text, TouchableHighlight } from 'react-native';

import styles from './styles';

const SignInButton = ({ onPress, children }) => (
    <TouchableHighlight
        onPress={onPress}
        style={styles.touchable}
    >
        <Text style={styles.text}>{children}</Text>
    </TouchableHighlight>
);

export default SignInButton;
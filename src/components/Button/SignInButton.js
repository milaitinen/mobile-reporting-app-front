import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const SignInButton = ({ onPress, children }) => (
    <TouchableHighlight
        onPress={onPress}
        style={styles.touchable}
    >
        <Text style={styles.text}>{children}</Text>
    </TouchableHighlight>
);

SignInButton.propTypes = {
    children: PropTypes.string,
    onPress: PropTypes.func,
};

export default SignInButton;
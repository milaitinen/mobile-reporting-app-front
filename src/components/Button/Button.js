import React from 'react';
import { View } from 'react-native';
import color from 'color';
import { Button } from 'react-native-elements';

import styles from './buttonStyles';

// TODO: styling
const CustomButton = ({ title, type }) => {
    const underlayColor = color('#9dcbe5').darken(0.1);

    if (type === 'send') {
        return (
            <Button
                containerViewStyle={styles.view}
                title={title}
                textStyle={styles.text}
                icon={{ name: 'send', color: '#474c52' }}
                style={styles.sendButtonContainer}
                underlayColor={underlayColor}
                buttonStyle={styles.sendButtonContainer}
            >
            </Button>
        );
    }
    return (
        <Button
            containerViewStyle={styles.view}
            title={title}
            textStyle={styles.text}
            icon={{ name: 'save', color: '#474c52' }}
            style={styles.sendButtonContainer}
            underlayColor={underlayColor}
            buttonStyle={styles.saveButtonContainer}
        >
        </Button>
    );
};

export default CustomButton;
import React from 'react';
import { View } from 'react-native';
import color from 'color';
import { Button } from 'react-native-elements';

import styles from './buttonStyles';

// TODO: styling
const CustomButton = ({ title, type }) => {

    if (type === 'send') {
        return (
            <Button
                containerViewStyle={styles.view}
                title={title}
                textStyle={styles.text}
                icon={{ name: 'send', color: '#474c52' }}
                style={styles.sendButtonContainer}
                buttonStyle={styles.sendButtonContainer}
                rounded
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
            buttonStyle={styles.saveButtonContainer}
            rounded
        >
        </Button>
    );
};

export default CustomButton;
import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import styles from './styles';

const Input = (props) => {
    return (
        <View
            style={styles.InputContainer}>
            <Icon name={props.name} color={'white'} size={16} />
            <TextInput
                autoCapitalize = 'none'
                onChangeText={props.onChangeText}
                underlineColorAndroid='transparent'
                style={styles.InputStyle}
                placeholderTextColor='white'
                {...props}
            />
        </View>
    );
};

export default Input;
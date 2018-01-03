import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import styles from './styles';

const Input = (props) => {
    return (
        <View style={styles.SectionStyle}>
            <Icon name={props.name} color={'white'} size={16} />
            <TextInput
                onChangeText={props.onChangeText}
                underlineColorAndroid='transparent'
                style={styles.TextInputStyleClass}
                placeholderTextColor='white'
                {...props}
            />
        </View>
    );
};

export default Input;
import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import styles from './styles';

const IconInput = (props) => {
    return (
        <View
            style={styles.IconInputContainer}>
            <Icon name={props.name} color={'white'} size={16} />
            <TextInput
                autoCapitalize = 'none'
                onChangeText={props.onChangeText}
                underlineColorAndroid='transparent'
                style={styles.IconInputStyle}
                placeholderTextColor='white'
                {...props}
            />
        </View>
    );
};

export default IconInput;
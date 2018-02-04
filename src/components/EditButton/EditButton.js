import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

const EditButton = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style = {styles.containerStyle}
        ><View>
                <Icon
                    name='edit-2'
                    type='feather'
                    iconStyle= {styles.iconStyle}
                />
            </View>
        </TouchableOpacity>
    );

};

export default EditButton;
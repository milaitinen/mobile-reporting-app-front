import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

const EditButton = ({ onPress }) => {
    return (
        <TouchableHighlight
         //   onPress={onPress}
            style = {styles.buttonContainer}
        ><View>
                <Icon
                    name='edit-2'
                    type='feather'
                    iconStyle= {styles.iconStyle}
                    containerStyle={styles.containerStyle} />
            </View>
        </TouchableHighlight>
    );

};

export default EditButton;
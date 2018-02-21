import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';
import color from 'color';

// TODO: rename to be more accurate
const RightButton = ({ onPressPrev, onPressNew }) => {
    const previewUnderlay = color('#A4CBE7').darken(0.1);
    const newReportUnderlay = color('##99d9ad').darken(0.1);


    return (
        <View style={styles.backgroundStyle}>
            <TouchableHighlight onPress={onPressPrev} underlayColor={previewUnderlay}>
                <View>
                    <Icon
                        name={'find-in-page'}
                        type={'Materialicons'}
                        iconStyle={[styles.iconStyle, { color: '#8096a8', backgroundColor: '#A4CBE7', } ]} />
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={onPressNew} underlayColor={newReportUnderlay}>
                <View>
                    <Icon
                        name={'note-add'}
                        type={'Materialicons'}
                        iconStyle={[styles.iconStyle, { color: '#77a482', backgroundColor: '#99d9ad', } ]} />
                </View>
            </TouchableHighlight>
        </View>

    );

};

export default RightButton;
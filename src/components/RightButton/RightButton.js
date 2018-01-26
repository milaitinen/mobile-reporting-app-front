import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

const RightButton = ({ onPressPrev, onPressNew }) => {

    return (
        <View style={styles.backgroundStyle}>
            <TouchableHighlight onPress={onPressPrev}>
                <View>
                    <Icon
                        name={'find-in-page'}
                        type={'Materialicons'}
                        iconStyle={[styles.iconStyle, { color: '#8096a8', backgroundColor: '#A4CBE7', } ]} />
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={onPressNew}>
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
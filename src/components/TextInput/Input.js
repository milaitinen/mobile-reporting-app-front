import React from 'react';
import { View, TextInput, Image } from 'react-native';

import styles from './styles';

const Input = (props) => {

  return (
    <View style={styles.SectionStyle}>
      <Image
        source={props.source}
        style={styles.ImageStyle}/>
      <TextInput
        onChangeText={props.onChangeText}
        underlineColorAndroid='transparent'
        style={styles.TextInputStyleClass}
        {...props}
      />
    </View>
  );
};

export default Input;
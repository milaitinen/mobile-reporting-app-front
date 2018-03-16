import { CheckBox } from 'react-native-elements';
import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import styles from './checkboxStyles';

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            //checked: props.isChecked || false,
        };
    }

    toggle = () => {
        this.setState({ checked: !this.state.checked });
    };

    render(){
        const unchecked = this.props.editable ? EStyleSheet.value('$inactive') : EStyleSheet.value('$disabledBorder');
        const text = this.props.editable ? styles.text : styles.disabledText;
        const container = this.props.editable ? styles.container : styles.disabled;
        return (
            <CheckBox
                title={this.props.title}
                checked={this.state.checked}
                disabled={!this.props.editable}
                iconType={'material'}
                uncheckedIcon={'check-box-outline-blank'}
                checkedIcon={'check-box'}
                uncheckedColor={unchecked}
                checkedColor={EStyleSheet.value('$active')}
                textStyle={this.state.checked ? styles.selectedText : text}
                containerStyle={this.state.checked ? styles.selectedContainer : container}
                onPress={() => {
                    this.props.onPressFunction((!this.state.checked) ? '1' : '0');
                    this.toggle();
                }}
            />
        );
    }
}



export default Checkbox;

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
        return (
            <CheckBox
                title={this.props.title}
                checked={this.state.checked}
                disabled={!this.props.editable}
                iconType={'material'}
                uncheckedIcon={'check-box-outline-blank'}
                checkedIcon={'check-box'}
                uncheckedColor={EStyleSheet.value('$inactive')}
                checkedColor={EStyleSheet.value('$active')}
                textStyle={this.state.checked ? styles.selectedText : styles.text}
                containerStyle={this.state.checked ? styles.selectedContainer : styles.container}
                onPress={() => this.toggle()}
                onIconPress={() => {
                    if (this.props.editable) {
                        this.props.onIconPressFunction((!this.state.checked) ? '1' : '0');
                        this.toggle();
                    }
                }}
            />
        );
    }
}



export default Checkbox;

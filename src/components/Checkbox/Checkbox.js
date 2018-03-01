import { CheckBox } from 'react-native-elements';
import React, { Component } from 'react';
import styles from './checkboxStyles';

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
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
                checkedColor={'#A4CBE7'}
                onPress={() => this.toggle()}
                onIconPress={() => {
                    this.props.onIconPressFunction((!this.state.checked) ? '1' : '0');
                    this.toggle();
                }}
            />
        );
    }
}



export default Checkbox;

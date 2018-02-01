import { CheckBox } from 'react-native-elements';
import React, { Component } from 'react';

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        };
    }

    render(){
        return (
            <CheckBox
                title={this.props.title}
                checked={this.state.checked}
                disabled={!this.props.isEditable}
                checkedColor={'#A4CBE7'}
                onPress={() => this.setState({ checked: !this.state.checked })}
            />
        );
    }
}



export default Checkbox;
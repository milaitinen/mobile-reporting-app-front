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

    render(){
        return (
            <CheckBox
                title={this.props.title}
                checked={this.state.checked}
                disabled={!this.props.editable}
                checkedColor={'#88c9e5'}
                containerStyle={styles.container}
                textStyle={styles.text}
                onPress={() => this.setState({ checked: !this.state.checked })}
            />
        );
    }
}



export default Checkbox;
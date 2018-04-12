import React, { Component } from 'react';
import { TextInput } from 'react-native';
import styles from './styles';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false
        };
    }

    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });

    render() {
        const props = this.props;
        const isFocused = this.state;
        const input_style = isFocused? [styles.inputContainer, styles.active] : styles.inputContainer;
        return (
            <TextInput
                {...props}
                style={input_style}
                onFocus={this.handleFocus()}
                onBlur={this.handleBlur()}
            />
        );
    }
}

export default Input;
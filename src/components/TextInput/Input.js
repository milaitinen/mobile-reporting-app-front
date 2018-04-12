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

    handleFocus() {
        this.setState({ isFocused: true });
    }

    handleBlur() {
        this.setState({ isFocused: false });
    }

    render() {
        const inputStyle = this.props.multiline ? styles.multilineInput : styles.inputContainer;
        const containerStyle = this.props.isPreview ? [inputStyle, styles.disabled] : inputStyle;
        const isFocused = this.state.isFocused;
        const input_style = isFocused? [containerStyle, styles.active] : containerStyle;
        return (
            <TextInput
                {...this.props}
                style={input_style}
                onFocus={() => this.handleFocus()}
                onBlur={() => this.handleBlur()}
                selectionColor={styles.$activeBlue}
            />
        );
    }
}

export default Input;
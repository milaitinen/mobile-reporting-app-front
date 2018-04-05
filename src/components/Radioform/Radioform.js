import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import React, { Component } from 'react';
import styles from './styles';

class Radioform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    press(value) {
        this.setState({ value: value });
    }

    render() {
        const container = this.props.editable ? styles.radioInputContainer : [styles.radioInputContainer, styles.disabled];
        const button = this.props.editable ? styles.$lightBlue : styles.$gray;
        const label = this.props.editable ? styles.radioLabel : styles.disabledText;
        return (
            <RadioForm>
                {this.props.options.map((obj, i) =>
                    <RadioButton
                        key={i}
                        style={this.state.value === obj.value ? styles.selectedInputContainer : container}>
                        <RadioButtonInput
                            disabled={!this.props.editable}
                            obj={obj}
                            index={i}
                            isSelected={this.state.value === obj.value}
                            onPress={(value) => this.press(value)}
                            borderWidth={1.5}
                            buttonInnerColor={'#359ef3'}
                            buttonOuterColor={this.state.value === obj.value ? styles.$blue : button}
                            buttonSize={16}
                            buttonOuterSize={24}
                            buttonWrapStyle={styles.buttonWrap}
                        />
                        <RadioButtonLabel
                            disabled={!this.props.editable}
                            obj={obj}
                            index={i}
                            labelHorizontal={true}
                            onPress={(value) => this.press(value)}
                            labelStyle={this.state.value === obj.value ? styles.selectedLabel : label}
                            labelWrapStyle={styles.labelWrap}
                        />
                    </RadioButton>
                )}
            </RadioForm>
        );
    }
}

export default Radioform;
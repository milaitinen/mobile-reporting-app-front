import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import React, { Component } from 'react';
import styles from './styles';

class Radioform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: this.props.initial || 0
        };
    }

    press(index) {
        this.setState({ index: index });
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
                        style={this.state.index === i ? styles.selectedInputContainer : container}>
                        <RadioButtonInput
                            disabled={!this.props.editable}
                            obj={obj}
                            index={i}
                            isSelected={this.state.index === i}
                            onPress={() => this.press(i)}
                            borderWidth={1.5}
                            buttonInnerColor={'#359ef3'}
                            buttonOuterColor={this.state.index === i ? styles.$blue : button}
                            buttonSize={16}
                            buttonOuterSize={24}
                            buttonWrapStyle={styles.buttonWrap}
                        />
                        <RadioButtonLabel
                            disabled={!this.props.editable}
                            obj={obj}
                            index={i}
                            labelHorizontal={true}
                            onPress={(value) => {
                                this.props.onPress(value);
                                this.press(i);
                            }}
                            labelStyle={this.state.index === i ? styles.selectedLabel : label}
                            labelWrapStyle={styles.labelWrap}
                        />
                    </RadioButton>
                )}
            </RadioForm>
        );
    }
}

export default Radioform;
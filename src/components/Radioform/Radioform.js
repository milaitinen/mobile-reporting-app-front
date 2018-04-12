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
        const editable = this.props.editable;
        const isPreview = this.props.isPreview;
        const container = (editable || !isPreview) ? styles.radioInputContainer : [styles.radioInputContainer, styles.disabled];
        const button = (editable || !isPreview) ? styles.$lightBlue : styles.$gray;
        const label = (editable || !isPreview) ? styles.radioLabel : styles.disabledText;
        return (
            <RadioForm>
                {this.props.options.map((obj, i) =>
                    <RadioButton
                        key={i}
                        style={this.state.index === i ? styles.selectedInputContainer : container}>
                        <RadioButtonInput
                            disabled={!editable}
                            obj={obj}
                            index={i}
                            isSelected={this.state.index === i}
                            onPress={(value) => {
                                this.props.onPress(value);
                                this.press(i);
                            }}
                            borderWidth={1.5}
                            buttonInnerColor={styles.$blue}
                            buttonOuterColor={this.state.index === i ? styles.$blue : button}
                            buttonSize={16}
                            buttonOuterSize={24}
                            buttonWrapStyle={styles.buttonWrap}
                        />
                        <RadioButtonLabel
                            disabled={!editable}
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
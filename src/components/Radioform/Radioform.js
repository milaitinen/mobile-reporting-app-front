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

    render() {

        return (
            <RadioForm>
                {this.props.options.map((obj, i) =>
                    <RadioButton
                        key={i}
                        style={this.state.value === obj.value ? styles.selectedInputContainer : styles.radioInputContainer}>
                        <RadioButtonInput
                            disabled={!this.props.editable}
                            obj={obj}
                            index={i}
                            isSelected={this.state.value === obj.value}
                            onPress={(value) => { this.setState({ value: value }); }}
                            borderWidth={1}
                            buttonInnerColor={'#359ef3'}
                            buttonOuterColor={this.state.value === obj.value ? '#359ef3' : '#9bcff9'}
                            buttonSize={16}
                            buttonOuterSize={24}
                            buttonWrapStyle={styles.buttonWrap}
                        />
                        <RadioButtonLabel
                            disabled={!this.props.editable}
                            obj={obj}
                            index={i}
                            labelHorizontal={true}
                            onPress={(value) => { this.setState({ value: value }); }}
                            labelStyle={this.state.value === obj.value ? styles.selectedLabel : styles.radioLabel}
                            labelWrapStyle={styles.labelWrap}
                        />
                    </RadioButton>
                )}
            </RadioForm>
        );
    }
}

export default Radioform;
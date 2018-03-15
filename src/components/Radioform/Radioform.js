import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import styles from './styles';

class Radioform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    select = (value) => {
        this.setState({ value: value });
    };

    render() {
        return(
            <RadioForm animation={true}>
                {this.props.options.map((obj, i) =>
                    <TouchableOpacity
                        key={i}
                        onPress={this.select(this.key)}
                        style={styles.radioInputContainer}>
                        <RadioButton>
                            <RadioButtonInput
                                disabled={!this.props.editable}
                                obj={obj}
                                index={i}
                                isSelected={this.state.value === this.index}
                                onPress={this.select(this.index)}
                                borderWidth={1}
                                buttonColor={'#88c9e5'}
                                buttonSize={16}
                                buttonOuterSize={24}
                                buttonWrapStyle={{ borderWidth: 1, }}
                            />
                            <RadioButtonLabel
                                disabled={!this.props.editable}
                                obj={obj}
                                index={i}
                                labelHorizontal={true}
                                onPress={this.select(this.index)}
                                labelStyle={styles.radioLabel}
                                labelWrapStyle={{ borderWidth: 1, height: 24 }}
                            />
                        </RadioButton>
                    </TouchableOpacity>
                )}
            </RadioForm>
        );
    }
}

export default Radioform;
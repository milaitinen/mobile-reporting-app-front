import { CheckBox } from 'react-native-elements';
import React, { Component } from 'react';
import styles from './checkboxStyles';

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.isChecked || false,
        };
    }

    componentDidMount() {
        this.setState({ checked : this.props.defaultValue });
    }

    toggle = () => {
        this.setState({ checked: !this.state.checked });
    };

    render(){
        const editable = this.props.editable;
        const isPreview = this.props.isPreview;
        const unchecked = (editable || !isPreview) ? styles.$inactiveBlue : styles.$disabledGray;
        const text = (editable || !isPreview) ? styles.text : styles.disabledText;
        const container = (editable || !isPreview) ? styles.container : styles.disabled;

        return (
            <CheckBox
                title={this.props.title}
                checked={this.state.checked}
                disabled={!editable}
                iconType={'material'}
                uncheckedIcon={'check-box-outline-blank'}
                checkedIcon={'check-box'}
                uncheckedColor={unchecked}
                checkedColor={styles.$activeBlue}
                textStyle={this.state.checked ? styles.selectedText : text}
                containerStyle={this.state.checked ? styles.selectedContainer : container}
                onPress={() => {
                    this.props.onPressFunction((!this.state.checked) ? '1' : '0');
                    this.toggle();
                }}
            />
        );
    }
}



export default Checkbox;

import React, { Component } from 'react';
import styles from './styles';
import ModalDropdown from 'react-native-modal-dropdown';
import { View, Text, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import color from 'color';


class Dropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.defaultValue
        };
    }

    /* commented it out at least temporarily for easy testing
    renderButtonText = (rowData) => {
        return rowData;
    };
    */

    renderRow = (rowData, rowID, highlighted) => {
        const evenRow = rowID % 2;
        const active = styles.$activeBlue;
        const inactive = '#cceeff';
        return (
            <TouchableHighlight underlayColor={evenRow ? color(inactive).darken(0.3) : color(active).darken(0.1)}>
                <View style={[styles.dropdownRow, { backgroundColor: evenRow ? '#eef8ff' : 'white' }]}>
                    <Text style={[styles.dropdownRowText, highlighted && { color: active }]}>
                        {rowData}
                    </Text>
                    {this.state.value === rowData ? (
                        <Icon name={'check'} type={'feather'} color={active}/>
                    ) : (
                        null
                    )}
                </View>
            </TouchableHighlight>
        );
    };

    renderSeparator(rowID) {
        if (rowID === this.props.options.length - 1) return;
        const key = 'spr_${rowID}';
        return (
            <View style={styles.dropdownSeparator} key={key}/>
        );
    }

    onSelect(idx, value) {
        this.setState({ value: value });
    }

    render() {
        const disabled = this.props.disabled;
        const isPreview = this.props.isPreview;
        const button = (disabled && isPreview) ? [styles.dropdownButton, styles.disabled] : styles.dropdownButton;
        const text = (disabled && isPreview) ? [styles.dropdownText, styles.disabledText] : styles.dropdownText;
        const iconColor = (disabled && isPreview) ? styles.$gray1 : styles.$gray2;
        return (
            <ModalDropdown
                ref={ ModalDrop => this.modalDropdown = ModalDrop }
                onPress={() => this.modalDropdown.show()}
                style={button}
                textStyle={text}
                dropdownStyle={styles.dropStyleClass}
                defaultValue={this.state.value}
                disabled={disabled}
                options={this.props.options}
                onSelect={(idx, value) => {
                    console.log('idx', idx);
                    console.log('value', value);
                    this.props.onSelect(value);
                    this.onSelect(idx, value);
                }}
                renderButtonText={(rowData) => rowData}
                renderRow={this.renderRow.bind(this)}
                renderSeparator={(rowID) => this.renderSeparator(rowID)}
            >
                <View style={styles.buttonContent}>
                    <Text style={text}>
                        {this.state.value}
                    </Text>
                    <Icon name={'expand-more'} color={iconColor} style={styles.icon}/>
                </View>
            </ModalDropdown>
        );
    }
}


export default Dropdown;
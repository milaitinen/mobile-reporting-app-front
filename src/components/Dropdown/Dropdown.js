import React, { Component } from 'react';
import styles from './styles';
import ModalDropdown from 'react-native-modal-dropdown';
import { View, Text, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import color from 'color';
import EStyleSheet from 'react-native-extended-stylesheet';


class Dropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.defaultValue
        };
    }

    /* commented it out at least temporarily to easy testing
    renderButtonText = (rowData) => {
        return rowData;
    };
    */

    renderRow = (rowData, rowID, highlighted) => {
        const evenRow = rowID % 2;
        const active = EStyleSheet.value('$active');
        const inactive = '#cceeff';
        return (
            <TouchableHighlight underlayColor={evenRow ? color(inactive).darken(0.3) : color(active).darken(0.1)}>
                <View style={[styles.dropdownRow, { backgroundColor: evenRow ? inactive : 'white' }]}>
                    <Text style={[styles.dropdownRowText, highlighted && { color: EStyleSheet.value('$active') }]}>
                        {rowData}
                    </Text>
                    {this.state.value === rowData ? (
                        <Icon name={'check'} type={'feather'} color={EStyleSheet.value('$active')}/>
                    ) : (
                        null
                    )}
                </View>
            </TouchableHighlight>
        );
    };

    renderSeparator(sectionID, rowID) {
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
        const button = this.props.disabled ? [styles.dropdownButton, styles.disabled] : styles.dropdownButton;
        const text = this.props.disabled ? [styles.dropdownText, styles.disabledText] : styles.dropdownText;
        const iconColor = this.props.disabled ? EStyleSheet.value('$disabledPlaceholder') :EStyleSheet.value('$placeholder');
        return (
            <ModalDropdown
                ref={ ModalDrop => this.modalDropdown = ModalDrop }
                onPress={() => this.modalDropdown.show()}
                style={button}
                textStyle={text}
                dropdownStyle={styles.dropStyleClass}
                defaultValue={this.state.value}
                disabled={this.props.disabled}
                options={this.props.options}
                onSelect={(idx, value) => this.onSelect(idx, value)}
                renderButtonText={(rowData) => rowData}
                renderRow={this.renderRow.bind(this)}
                renderSeparator={(sectionID, rowID) => this.renderSeparator(sectionID, rowID)}
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
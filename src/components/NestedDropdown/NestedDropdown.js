import React, { Component } from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import { View, Text, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';
import color from 'color';

/*
* Initial implementation of nested dropdowns. Does not completely work and is not in use yet.
* */
class NestedDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.defaultValue
        };
    }

    renderButtonText = (rowData) => {
        return rowData;
    };

    innerOptions = (rowData) => {
        if (rowData === 'option 1') {
            return this.props.innerOptions[0];
        } else {
            return this.props.innerOptions[1];
        }
    };

    renderRow = (rowData, rowID, highlighted) => {
        const evenRow = rowID % 2;
        return (
            <ModalDropdown
                options={(rowData) => this.innerOptions(rowData)}
                style={[styles.dropdownRow, { backgroundColor: evenRow ? '#DFF1F6' : 'white' }]}
                dropdownStyle={ styles.dropStyleClass }
                defaultValue={rowData}
                textStyle={[styles.dropdownRowText, highlighted && { color: '#474c52' }]}
                renderButtonText={(rowData) => this.renderButtonText(rowData)}
                renderRow={this.renderInnerRow.bind(this)}
                renderSeparator={(sectionID, rowID) => this.renderSeparator(sectionID, rowID)}
                onSelect={(idx, value) => this.onSelect(idx, value)}

            />
        );
    };

    //TODO: Fix this method to render inner options.
    renderInnerRow = (rowData, rowID, highlighted) => {
        const evenRow = rowID % 2;
        return (
            <TouchableHighlight underlayColor={evenRow ? color('#DFF1F6').darken(0.2) : color('#87d8f6').darken(0.1)}>
                <View style={[styles.dropdownRow, { backgroundColor: evenRow ? '#DFF1F6' : 'white' }]}>
                    <Text style={[styles.dropdownRowText, highlighted && { color: '#474c52' }]}>
                        {rowData}
                    </Text>
                    {this.state.value === rowData ? (
                        <Icon name={'check'} type={'feather'} color={'#474c52'}/>
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
        return (
            <ModalDropdown
                ref={ModalDrop => this.modalDropdown = ModalDrop}
                onPress={() => this.modalDropdown.show()}
                style={styles.dropdownButton}
                textStyle={styles.dropdownText}
                dropdownStyle={styles.dropStyleClass}
                defaultValue={this.state.value}
                disabled={this.props.disabled}
                options={this.props.options}
                renderButtonText={(rowData) => this.renderButtonText(rowData)}
                renderRow={this.renderRow.bind(this)}
                renderSeparator={(sectionID, rowID) => this.renderSeparator(sectionID, rowID)}
            >
                <View style={styles.buttonContent}>
                    <Text style={styles.dropdownText}>
                        {this.state.value}
                    </Text>
                    <Icon name={'expand-more'} color={'#C4C4C4'} style={styles.icon}/>
                </View>
            </ModalDropdown>
        );
    }
}

export default NestedDropdown;
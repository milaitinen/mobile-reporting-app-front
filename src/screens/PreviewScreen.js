import React from 'react';
import { View, ScrollView, TextInput, Text, ActivityIndicator, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import { Checkbox } from '../components/Checkbox';
import { Radioform } from '../components/Radioform';
import { Dropdown } from '../components/Dropdown';
import { Datepicker } from '../components/Datepicker';
import ModalDropdown from 'react-native-modal-dropdown';
import { connect } from 'react-redux';
import moment from 'moment';

import { AppBackground } from '../components/AppBackground';
import { EditButton } from '../components/EditButton';
import { fetchFieldsByTemplateID } from './api';
import { insertTitle } from '../redux/actions/preview';
import { createReport, insertFieldAnswer } from '../redux/actions/newReport';

import newReportStyles from './style/newReportStyles';
import templateScreenStyles from './style/templateScreenStyles';
import styles from '../components/Dropdown/styles';
import EStyleSheet from 'react-native-extended-stylesheet';

// "export" necessary in order to test component without Redux store
export class PreviewScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading   : true,
            isEditable  : false,
            number      : '',
        };
    }

    componentDidMount() {
        this.getFieldsByID();
        this.setState({ isEditable: this.props.navigation.state.params.isEditable });
    }

    getFieldsByID = () => {
        fetchFieldsByTemplateID(this.props.username, this.props.templateID, this.props.token)
            .then(responseJson => {
                this.setState({ dataFieldsByID: responseJson, isLoading: false });
            })
            .catch(error => console.error(error) )
            .done();
    };

    handleOnPress = () => {
        this.props.dispatch(createReport(this.props.templateID, moment().format('YYYY-MM-DD')));
        this.props.navigation.navigate('NewReport', { refresh: this.props.navigation.state.params.refresh, isEditable: true });
    };

    onChanged = (text) => {
        let newText = '';
        const numbers = '0123456789';

        for (let i=0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            } else {
                alert('Please enter numbers only');
            }
        }
        this.setState({ number: newText });
    };

    render() {

        if (this.state.isLoading) {
            return (
                <AppBackground>
                    <ActivityIndicator
                        animating={this.state.animating}
                        style={[templateScreenStyles.activityIndicator, { height: 80 }]}
                        size='large'
                        color={'#9dcbe5'}
                    />
                </AppBackground>
            );
        }

        const { isEditable } = this.state;
        const renderedFields = this.state.dataFieldsByID.map((field, index) => {
            switch (field.typeID) {

                case 1: // Name
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={newReportStyles.text}>{field.title}</Text>
                            <TextInput
                                editable={isEditable}
                                placeholder={field.defaultValue}
                                placeholderTextColor={EStyleSheet.value('$disabledPlaceholder')}
                                onSubmitEditing={(event) => this.props.dispatch(insertTitle(event.nativeEvent.text))}
                                underlineColorAndroid='transparent'
                                style={[newReportStyles.textInput, newReportStyles.disabled]}
                            />
                        </View>
                    );

                case 2: // Checkbox
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={newReportStyles.text}>{field.title}</Text>
                            <Checkbox
                                key={index}
                                title={'This is a nice checkbox'}
                                editable={isEditable}
                            />
                        </View>
                    );

                case 3: // Dropdown
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={ newReportStyles.text }>{field.title}</Text>
                            <ModalDropdown
                                disabled={!isEditable}
                                options={['option 1', 'option 2']}
                                dropdownStyle={styles.dropStyleClass}
                                defaultValue={'Select option'}
                                style={[styles.dropdownButton, styles.disabled]}
                                textStyle={[styles.dropdownText, styles.disabledText]}
                                renderRow={ () =>
                                    <View>
                                        <ModalDropdown
                                            options={['option 3', 'option 4']}
                                            style={styles.lowerDropdownStyleClass}
                                            dropdownStyle={styles.dropStyleClass}
                                        />
                                    </View>
                                }
                            >
                                <View style={styles.buttonContent}>
                                    <Text style={[styles.dropdownText, styles.disabledText]}>
                                        Select option
                                    </Text>
                                    <Icon name={'expand-more'} color={EStyleSheet.value('$disabledPlaceholder')} style={styles.icon}/>
                                </View>
                            </ModalDropdown>
                        </View>

                    );

                case 4: // TextRow (One row text field)
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={newReportStyles.text}>{field.title}</Text>
                            <TextInput
                                editable={isEditable}
                                placeholder={field.defaultValue}
                                placeholderTextColor={EStyleSheet.value('$disabledPlaceholder')}
                                underlineColorAndroid='transparent'
                                style={[newReportStyles.textInput, newReportStyles.disabled]}
                            />
                        </View>
                    );

                case 5: //Radio form
                    return (
                        <View key={index} style={newReportStyles.altFieldContainer}>
                            <Text style={newReportStyles.text}>{field.title}</Text>
                            <Radioform
                                options={[{ label: 'Yes', value: 0 }, { label: 'No', value: 1 }]}
                                editable={isEditable}
                                initial={JSON.parse(field.defaultValue)}
                            />
                        </View>
                    );

                case 6: // Calendar
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={newReportStyles.text}>{field.title}</Text>
                            <Datepicker
                                editable={isEditable}
                                mode={'date'}
                                answer={field.defaultValue}
                                onChange={(date) => this.props.dispatch(insertFieldAnswer(field, date))}
                            />
                        </View>
                    );

                case 7: // Instructions
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={newReportStyles.text}>{field.title}</Text>
                            <Text style={newReportStyles.instructions}>
                                {field.defaultValue}
                            </Text>
                        </View>
                    );

                case 8: // Text (Multiple row text field)
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={ newReportStyles.text }>{field.title}</Text>
                            <TextInput
                                multiline
                                editable={isEditable}
                                style={[newReportStyles.multilineTextInput, newReportStyles.disabled]}
                                placeholder={field.defaultValue}
                                placeholderTextColor={EStyleSheet.value('$disabledPlaceholder')}
                            />
                        </View>
                    );

                case 9: // Time
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={ newReportStyles.text }>{field.title}</Text>
                            <Datepicker
                                editable={isEditable}
                                mode={'time'}
                                answer={field.defaultValue}
                                onChange={(time) => this.props.dispatch(insertFieldAnswer(field, time))}
                            />
                        </View>
                    );

                case 10: // Digits (Text input that only accepts numeric characters)
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={ newReportStyles.text }>{field.title}</Text>
                            <TextInput
                                editable={isEditable}
                                style={[newReportStyles.textInput, newReportStyles.disabled]}
                                placeholder={field.defaultValue}
                                placeholderTextColor={EStyleSheet.value('$disabledPlaceholder')}
                                keyboardType = 'numeric'
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text))}
                                value = {this.state.number}
                            />
                        </View>
                    );

                case 11: // Link
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={newReportStyles.text}>{field.title}</Text>
                            <View style={newReportStyles.linkContainer}>
                                <Icon name={'link'} type={'feather'} iconStyle={[newReportStyles.linkIcon, newReportStyles.disabledIcon]}/>
                                <Text
                                    disabled={!isEditable}
                                    style={[newReportStyles.link, newReportStyles.disabledLink]}
                                    onPress={() => Linking.openURL(field.defaultValue)}>
                                    Link to somewhere
                                </Text>
                            </View>
                        </View>
                    );

                case 12: // User dropdown
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={ newReportStyles.text }>{field.title}</Text>
                            <Dropdown
                                disabled={!isEditable}
                                defaultValue={'Select user'}
                                options={JSON.parse(field.defaultValue)}
                            />
                        </View>
                    );

                default:
                    return (
                        null
                    );

            }
        });

        return (
            <AppBackground>
                <View style={newReportStyles.ViewContainer}>
                    <ScrollView keyboardShouldPersistTaps={'handled'} style={newReportStyles.ReportScrollView}>
                        {renderedFields}
                    </ScrollView>
                    <EditButton onPress={() => this.handleOnPress()}/>
                </View>
            </AppBackground>
            /*
                <TextInput
                    placeholder={ strings('createNew.enterNew') }
                    onChangeText={(TextInputName) => this.setState({ TextInputName })}
                    underlineColorAndroid='transparent'
                    style={newReportStyles.textInput}
                />
                <Button
                    title={ strings('createNew.createNew') }
                    onPress={ this.send }
                >
                </Button>
            */
        );
    }
}

// maps redux state to component props. Object that is returned can be accessed via 'this.props' e.g. this.props.email
const mapStateToProps = (state) => {
    const userID = state.user.userID;
    const templateID = state.preview.templateID;
    const title = state.preview.title;
    const number = state.preview.number;
    const token = state.user.token;
    const username = state.user.username;
    return {
        userID,
        templateID,
        title,
        number,
        token,
        username
    };
};

export default connect(mapStateToProps)(PreviewScreen);

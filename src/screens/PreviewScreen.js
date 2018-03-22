import React from 'react';
import { View, ScrollView, TextInput, Text, ActivityIndicator, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import { Checkbox } from '../components/Checkbox';
import { Radioform } from '../components/Radioform';
import { Dropdown } from '../components/Dropdown';
import { Datepicker } from '../components/Datepicker';
import ModalDropdown from 'react-native-modal-dropdown';
import { connect } from 'react-redux';

import { AppBackground } from '../components/AppBackground';
import { EditButton } from '../components/EditButton';
//import { strings } from '../locales/i18n';
import { insertTitle } from '../redux/actions/preview';

import newReportStyles from './style/newReportStyles';
import templateScreenStyles from './style/templateScreenStyles';
import styles from '../components/Dropdown/styles';
import EStyleSheet from 'react-native-extended-stylesheet';

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
        const { templates, templateID } = this.props;
        this.getTemplateFields(templates, templateID);
    }

    getTemplateFields = (templates, templateID) => {
        const isEditable = this.props.navigation.state.params.isEditable;
        const fields = templates[templateID] ? templates[templateID].fields : [];

        this.setState({ fields: fields, isEditable: isEditable, isLoading: false });
    };

    handleOnPress = () => {
        this.props.navigation.navigate('NewReport', {
            templateID: this.props.templateID,
            refresh: this.props.navigation.state.params.refresh,
            isEditable: true
        });
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
        const optionAnswers = report.option_answers;
        const renderedFields = this.state.fields.map((field, index) => {
            const renderedField = () => {
                switch (field.type) {

                    case 'NAME': // Name
                        return (
                            <TextInput
                                editable={isEditable}
                                placeholder={field.default_value}
                                placeholderTextColor={EStyleSheet.value('$disabledPlaceholder')}
                                onSubmitEditing={(event) => this.props.dispatch(insertTitle(event.nativeEvent.text))}
                                underlineColorAndroid='transparent'
                                style={[newReportStyles.textInput, newReportStyles.disabled]}
                            />
                        );

                    case 'CHECKBOX': // Checkbox
                    {
                        const checkboxes = field.field_options.map((option, index) => {
                            const answer = optionAnswers.find((answer) => (answer.field_option_id === option.field_option_id) && answer.selected);
                            return (
                                <Checkbox
                                    key={index}
                                    editable={isEditable}
                                    title={option.value}
                                    defaultValue={(answer != null)}
                                />
                            );
                        });
                        return (
                            <View key={index}>
                                {checkboxes}
                            </View>
                        );
                    }


                    case 'NESTED_DROPDOWN': // Dropdown
                        return (
                            <ModalDropdown
                                disabled={!isEditable}
                                options={['option 1', 'option 2']}
                                dropdownStyle={styles.dropStyleClass}
                                defaultValue={'Select option'}
                                style={[styles.dropdownButton, styles.disabled]}
                                textStyle={[styles.dropdownText, styles.disabledText]}
                                renderRow={() =>
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
                                    <Icon name={'expand-more'} color={EStyleSheet.value('$disabledPlaceholder')}
                                        style={styles.icon}/>
                                </View>
                            </ModalDropdown>
                        );

                    case 'TEXTFIELD_SHORT': // TextRow (One row text field)
                        return (
                            <TextInput
                                editable={isEditable}
                                placeholder={field.default_value}
                                placeholderTextColor={EStyleSheet.value('$disabledPlaceholder')}
                                underlineColorAndroid='transparent'
                                style={[newReportStyles.textInput, newReportStyles.disabled]}
                            />
                        );

                    // Choice (Yes/No) NOTE: Error will be removed when options come from the database.
                    case 'RADIOBUTTON': {
                        const labels = field.field_options.map((option) => {
                            return (
                                { label: option.value, value: option }
                            );
                        });
                        return (
                            <Radioform
                                options={props}
                                editable={isEditable}
                                initial={JSON.parse(field.default_value)}
                            />
                        );
                    }

                    case 'CALENDAR': // Calendar
                        return (
                            <Datepicker
                                editable={isEditable}
                                mode={'date'}
                                answer={field.default_value}
                                onChange={(date) => {
                                    this.setState({ date: date });
                                }}
                            />
                        );

                    case 'INSTRUCTIONS': // Instructions
                        return (
                            <Text style={newReportStyles.instructions}>
                                {field.default_value}
                            </Text>
                        );

                    case 'TEXTFIELD_LONG': // Text (Multiple row text field)
                        return (
                            <TextInput
                                multiline
                                editable={isEditable}
                                style={[newReportStyles.multilineTextInput, newReportStyles.disabled]}
                                placeholder={field.default_value}
                                placeholderTextColor={EStyleSheet.value('$disabledPlaceholder')}
                            />
                        );

                    case 'TIME': // Time
                        return (
                            <Datepicker
                                editable={isEditable}
                                mode={'time'}
                                answer={field.default_value}
                                onChange={(time) => {
                                    this.setState({ time: time });
                                }}
                            />
                        );

                    case 'NUMBERFIELD': // Digits (Text input that only accepts numeric characters)
                        return (
                            <TextInput
                                editable={isEditable}
                                style={newReportStyles.textInput}
                                placeholder={field.default_value}
                                placeholderTextColor={EStyleSheet.value('$disabledPlaceholder')}
                                keyboardType='numeric'
                            />
                        );

                    case 'LINK': // Link
                        return (
                            <View key={index} style={newReportStyles.linkContainer}>
                                <Icon name={'link'} type={'feather'} iconStyle={newReportStyles.linkIcon}/>
                                <Text
                                    disabled={!isEditable}
                                    style={[newReportStyles.link, newReportStyles.disabledLink]}
                                    onPress={() => Linking.openURL(field.default_value)}>
                                    Link to somewhere
                                </Text>
                            </View>
                        );

                    case 'DROPDOWN': // User dropdown
                        return (
                            <Dropdown
                                disabled={!isEditable}
                                defaultValue={'Select user'}
                                options={JSON.parse(field.default_value)}
                            />
                        );

                    default:
                        return (
                            null
                        );
                }
            };

            return (
                <View key={index} style={newReportStyles.fieldContainer}>
                    <Text style={newReportStyles.text}>
                        {(field.required) ? field.title + ' *' : field.title}
                    </Text>
                    {renderedField()}
                </View>
            );
        });

        return (
            <AppBackground>
                <View style={ newReportStyles.ViewContainer }>
                    <ScrollView keyboardShouldPersistTaps={'handled'} style={ newReportStyles.ReportScrollView }>
                        {renderedFields}
                    </ScrollView>
                    <EditButton onPress={() => this.handleOnPress()} />
                </View>
            </AppBackground>
        );
    }
}

// maps redux state to component props. Object that is returned can be accessed via 'this.props' e.g. this.props.email
const mapStateToProps = (state) => {
    const userID = state.user.userID;
    const templateID = state.preview.templateID;
    const templates = state.templates;
    const title = state.preview.title;
    const number = state.preview.number;
    const token = state.user.token;
    const username = state.user.username;
    return {
        userID,
        templateID,
        templates,
        title,
        number,
        token,
        username
    };
};

export default connect(mapStateToProps)(PreviewScreen);

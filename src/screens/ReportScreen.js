import React from 'react';
import { Button, View, ScrollView, TextInput, Alert, Text, ActivityIndicator, Linking, Picker } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import RadioForm from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import ModalDropdown from 'react-native-modal-dropdown';
import moment from 'moment';
import { connect } from 'react-redux';
import { Checkbox } from '../components/Checkbox';

import { AppBackground } from '../components/AppBackground';
import { createNewReport, removeDraft, saveDraft } from './api';
import { strings } from '../locales/i18n';
import { insertFieldAnswer, emptyFields } from '../redux/actions/newReport';

import newReportStyles from './style/newReportStyles';
import templateScreenStyles from './style/templateScreenStyles';


export class ReportScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDraft         : false, // for future use?
            report          : null,
            title           : null,
            isUnsaved       : true,
            isLoading       : true,
            number          : '',
            isEditable      : false,
            fields  : null,
        };
    }

    componentDidMount() {

        const { templateID, reportID } = this.props.navigation.state.params;
        const { reports } = this.props;
        const report = reports[templateID].find((obj) => obj.report_id === reportID);
        this.setState({ report: report });
        this.setState({ isLoading : false });
        //this.getFieldsByReportID();
    }

    getFieldsByReportID = () => {
        const { templateID, reportID } = this.props.navigation.state.params;
        const { reports, templates } = this.props;

        const report = reports[templateID].find((obj) => obj.report_id === reportID);
        const fieldAnswers = report.answers;

        const stringAnswers = report.string_answers;
        const optionAnswers = report.option_answers;

        fieldAnswers.map((field) => this.props.dispatch(insertFieldAnswer(field, field.answer)));

        this.setState({ report: report });
        this.setState({ fields: fieldAnswers, isLoading: false });
    };

    // delete draft from asyncstorage
    deleteDraft = () => {
        const { templateID, reportID } = this.props.navigation.state.params;
        const { username } = this.props;

        removeDraft(username, templateID, reportID);
        this.props.dispatch(emptyFields());

        Alert.alert('Deleted draft.');

        this.props.navigation.state.params.refresh();
        this.props.navigation.dispatch(NavigationActions.back());
    };

    // save report locally in asyncstorage
    save = () => {
        const { username, answers } = this.props;
        const { templateID } = this.props.navigation.state.params;

        const report = this.state.report;
        report.title = this.state.title || report.title;
        report.dateCreated = moment().format('YYYY-MM-DD');
        report.answers = Object.values(answers);
        saveDraft(username, templateID, report);

        Alert.alert('Saved');

        this.props.dispatch(emptyFields());             // return newReport state to its initial state
        this.props.navigation.state.params.refresh();   // update templateScreen
        this.props.navigation.dispatch(NavigationActions.back());
    };

    // Inserts data to server with a post method.
    send = () => {
        const report = {
            templateID: this.props.navigation.state.params.templateID,
            title: this.props.navigation.state.params.title,
            dateCreated: moment().format('YYYY-MM-DD'),
            answers: [
                {
                    fieldID: 1,
                    answer: 'Answer 1'
                },
                {
                    fieldID: 2,
                    answer: 'Answer 2'
                }
            ]
        };

        createNewReport(this.props.username, report, this.props.token).then(response => {
            if (response.status === 200) {
                this.props.navigation.state.params.refresh();
                this.props.navigation.dispatch(NavigationActions.back());
                return strings('createNew.reportAdded');
            } else {
                return response.status;
            }
        }).then((message) => {
            // Showing response message coming from server after inserting records.
            Alert.alert(message);
        }).catch((error) => {
            console.error(error);
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
        const { answers } = this.props;

        const template = Object.values(this.props.templates).find((template) => template.template_id == this.state.report.template_id);
        const optionAnswers = this.state.report.option_answers;
        const renderedFields = template.fields.map((field, index) => {
            const stringAnswer = this.state.report.string_answers.find((answer) => answer.field_id == field.field_id);
            const fieldOptions = field.field_options;

            switch (field.type) {
                case 'TEXTFIELD_SHORT' : // Name
                {
                    const answer = this.state.report.string_answers.find((answer) => answer.field_id == field.field_id);
                    return (
                        <View key={index}>
                            <Text style={newReportStyles.textStyleClass}>{field.title}</Text>
                            <TextInput
                                editable={isEditable}
                                value={answer.value}
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text))}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInputStyleClass}
                            />
                        </View>
                    );
                }
                case 'CHECKBOX' : // Checkbox TODO defaultValue doesn't work here
                {
                    const checkboxes = field.field_options.map((option, index) => {
                        const answer = optionAnswers.find((answer) => answer.field_option_id == option.field_option_id);
                        return (
                            <Checkbox
                                key={index}
                                style={newReportStyles.checkboxStyle}
                                title={option.value}
                                editable={isEditable}
                                defaultValue={(answer != null) ? true : false}
                                //The ability to dispatch the checkbox status is passed on to the component
                                //as a prop, and the component itself can call this function in its
                                //onIconPress, i.e. when the checkbox is pressed
                                onIconPressFunction={(answer) => this.props.dispatch(insertFieldAnswer(field, answer))}
                            />
                        );
                    });
                    return (
                        <View key={index}>
                            <Text style={newReportStyles.textStyleClass}>{field.title}</Text>
                            {checkboxes}
                        </View>
                    );
                }
                case 'RADIOBUTTON': // Choice (Yes/No)
                {
                    const labels = field.field_options.map((option) => {
                        return (
                            {label: option.value}
                        );
                    });

                    const initialIndex = field.field_options.findIndex((option) => {
                        console.log(JSON.stringify(option));
                        return optionAnswers.map((answers) => answers.field_option_id).includes(option.field_option_id);
                    });

                    return (
                        <View key={index}>
                            <Text style={newReportStyles.textStyleClass}>{field.title}</Text>
                            <RadioForm
                                disabled={!isEditable}
                                radio_props={labels}
                                initial={initialIndex}
                                //onPress={() => this.props.dispatch(insertFieldAnswer(field, '1'))} //TODO this only allows '1' to be saved...
                                buttonColor={'#9dcbe5'}
                                labelStyle={{paddingRight: 12, paddingLeft: 6}}
                                //formHorizontal={true}
                            />
                        </View>
                    );
                }
                case 'DROPDOWN' : // Dropdown
                {

                    const selected = field.field_options.find((option) => {
                        return this.state.report.option_answers.map((answer) => answer.field_option_id)
                            .includes(option.field_option_id);
                    });


                    //console.log(JSON.stringify(answer));

                    return (
                        <View key={index}>
                            <Text style={newReportStyles.textStyleClass}>{field.title}</Text>
                            <View style={newReportStyles.mainDropdownStyleClass}>
                                <ModalDropdown
                                    dropdownStyle={ newReportStyles.dropStyleClass }
                                    disabled={!isEditable}
                                    options={field.field_options.map((option) => option.value)}
                                    defaultValue={selected.value}/>
                            </View>
                        </View>
                    );
                }
                case 'CALENDAR': // Calendar
                {
                    const answer = this.state.report.string_answers.find((answer) => answer.field_id == field.field_id);
                    return (
                        <View key={index}>
                            <Text style={newReportStyles.textStyleClass}>{field.title}</Text>
                            <DatePicker
                                disabled={!isEditable}
                                style={newReportStyles.dateStyleClass}
                                customStyles={{
                                    dateInput: {
                                        borderColor: '#e0e8eb',
                                        backgroundColor: '#e0e8eb',
                                        borderRadius: 5,
                                    },
                                }}
                                date={answer.value}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="2018-01-01"
                                maxDate="2018-12-31"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                iconComponent={<Icon name={'event'} type={'MaterialIcons'} iconStyle={newReportStyles.dateIconStyle}/>}
                                onDateChange={(date) => this.props.dispatch(insertFieldAnswer(field, date))}
                            />
                        </View>
                    );
                }
                case 'INSTRUCTIONS': // Instruction
                {
                    const answer = this.state.report.string_answers.find((answer) => answer.field_id == field.field_id);
                    return (
                        <View key={index}>
                            <Text style={newReportStyles.textStyleClass}>{field.title}</Text>
                            <Text
                                style={newReportStyles.multilinedTextInputStyleClass}>
                                {answer.value}
                            </Text>
                        </View>
                    );
                }
                case 'TEXTFIELD_LONG': // Text (Multiple row text field)
                {
                    const answer = this.state.report.string_answers.find((answer) => answer.field_id == field.field_id);
                    return (
                        <View key={index}>
                            <Text style={newReportStyles.textStyleClass}>{field.title}</Text>
                            <TextInput
                                editable={isEditable}
                                style={newReportStyles.multilinedTextInputStyleClass}
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text))}
                                //placeholder={field.answer}
                                //defaultValue={field.default_value}
                                value={answer.value}
                                multiline={true}
                            />
                        </View>
                    );
                }
                case 'TIME': // Time
                {
                    const answer = this.state.report.string_answers.find((answer) => answer.field_id == field.field_id);
                    return (
                        <View key={index}>
                            <Text style={newReportStyles.textStyleClass}>{field.title}</Text>
                            <DatePicker
                                disabled={!isEditable}
                                style={newReportStyles.dateStyleClass}
                                customStyles={{
                                    dateInput: {
                                        borderColor: '#e0e8eb',
                                        backgroundColor: '#e0e8eb',
                                        borderRadius: 5,
                                    }
                                }}
                                date={answer.value}
                                mode="time"
                                format="HH:mm"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                minuteInterval={10}
                                iconComponent={<Icon name={'schedule'} type={'MaterialIcons'}
                                iconStyle={newReportStyles.dateIconStyle}/>}
                                onDateChange={(time) => this.props.dispatch(insertFieldAnswer(field, time))}
                            />
                        </View>
                    );
                }
                case 'NUMBERFIELD': // Digits (Text input that only accepts numeric characters)
                {
                    const answer = this.state.report.string_answers.find((answer) => answer.field_id == field.field_id).value;
                    return (
                        <View key={index}>
                            <Text style={newReportStyles.textStyleClass}>{field.title}</Text>
                            <TextInput
                                editable={isEditable}
                                style={newReportStyles.textInputStyleClass}
                                value={answer}
                                keyboardType='numeric'
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text))}
                            />
                        </View>
                    );
                }
                case 'LINK': // Link
                {
                    const answer = this.state.report.string_answers.find((answer) => answer.field_id == field.field_id);
                    return (
                        <View key={index} style={{flexDirection: 'row'}}>
                            <Icon name={'link'} type={'feather'} iconStyle={newReportStyles.linkIconStyle}/>
                            <Text
                                style={newReportStyles.linkStyleClass}
                                onPress={() => Linking.openURL(answer.value)}>
                                {answer.value}
                            </Text>
                        </View>
                    );
                }
                case 12: // User dropdown
                    return (
                        <View key={index} style={newReportStyles.mainDropdownStyleClass} onPress={() => this.modalDropdown.show()}>
                            <ModalDropdown
                                ref={ModalDrop => this.modalDropdown = ModalDrop}
                                dropdownStyle={newReportStyles.dropStyleClass}
                                disabled={!isEditable}
                                options={field.answer.split(',')}/>
                            <Icon name={'arrow-drop-down'} type={'MaterialIcons'} iconStyle={newReportStyles.dropIconStyle}/>
                        </View>
                    );

                default:
                    return (
                        null
                    );
            }
        });

        //TODO: button styling
        return (
            <AppBackground style={'no-padding'}>
                <View style={ newReportStyles.ViewContainer }>
                    <View style={ newReportStyles.ReportContainer }>
                        <ScrollView keyboardShouldPersistTaps={'handled'} style={ newReportStyles.ReportScrollView }>
                            <Text style={newReportStyles.textStyleClass}>Report title</Text>
                            <TextInput
                                editable={isEditable}
                                defaultValue={this.props.navigation.state.params.title}
                                onChangeText={(text) => this.setState({ title: text })}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInputStyleClass}
                            />
                            {renderedFields}
                        </ScrollView>
                    </View>
                </View>

                {
                    (this.props.navigation.state.params.reportID < 0) &&
                        <View style={ newReportStyles.buttonView}>
                            <Button title={strings('createNew.save')} key={999} type={'save'} onPress={ () => this.save()} />
                            <Button title={strings('createNew.send')} type={'send'} onPress={() => console.log('send')}  />
                            <Button title={'Delete'} disabled={false} onPress={() => this.deleteDraft()} />
                        </View>
                }

            </AppBackground>
            /*
                <TextInput
                    placeholder={ strings('createNew.enterNew') }
                    onChangeText={(TextInputName) => this.setState({ TextInputName })}
                    underlineColorAndroid='transparent'
                    style={newReportStyles.textInputStyleClass}
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
    const token         = state.user.token;
    const username      = state.user.username;
    const number        = state.newReport.number;
    const answers       = state.newReport.answers;
    const reports       = state.reports;
    const templates     = state.templates;
    return {
        username,
        number,
        token,
        reports,
        templates,
        answers
    };
};

export default connect(mapStateToProps)(ReportScreen);

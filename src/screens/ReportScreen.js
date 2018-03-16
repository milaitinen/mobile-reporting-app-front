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
import { insertFieldAnswer, emptyFields, openReport, insertTitle } from '../redux/actions/newReport';

import newReportStyles from './style/newReportStyles';
import templateScreenStyles from './style/templateScreenStyles';


export class ReportScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title           : null,
            isUnsaved       : true,
            isLoading       : true,
            number          : '',
            isEditable      : false,
            fields          : null,
        };
    }

    componentDidMount() {
        const { templateID, reportID } = this.props.navigation.state.params;
        const { reports, templates } = this.props;
        const report = reports[templateID].find((obj) => obj.report_id === reportID);
        const fields = templates[templateID] ? templates[templateID].fields : [];

        this.props.dispatch(openReport(report));
        this.setState({ fields: fields, isEditable: reportID < 0, isLoading : false });
    }

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

    save = () => {
        const { username, report } = this.props;
        const { templateID } = this.props.navigation.state.params;
        saveDraft(username, templateID, report); // give a negative id
        report.date_created = moment().format('YYYY-MM-DD');

        //this.props.dispatch(storeDraftByTemplateID(templateID, report)); // store drafts together with other reports in reports state)

        Alert.alert('Saved!');

        this.setState({ isLoading: true });

        //return to template screen and have it refreshed
        this.props.dispatch(emptyFields());
        this.props.navigation.state.params.refresh();
        this.props.navigation.dispatch(NavigationActions.back());
    };

    // Inserts data to server with a post method.
    send = () => {
        const { username, report, token } = this.props;

        createNewReport(username, report, token).then(response => {
            if (response.status === 200) {
                this.props.navigation.state.params.refresh();
                this.props.navigation.dispatch(NavigationActions.back());
                return Alert.alert('Report sent!');
            } else {
                return response.status;
            }
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
        const { report } = this.props;
        const optionAnswers = report.option_answers;

        const renderedFields = this.state.fields.map((field, index) => {
            const stringAnswer = report.string_answers.find((answer) => answer.field_id === field.field_id);
            const fieldOptions = field.field_options;

            switch (field.type) {
                case 'TEXTFIELD_SHORT' : // Name
                {
                    const answer = report.string_answers.find((answer) => answer.field_id === field.field_id);
                    return (
                        <View key={index} >
                            <Text style={newReportStyles.textStyleClass}>{field.title}</Text>
                            <TextInput
                                value={answer.value}
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text, false))}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInputStyleClass}
                            />
                        </View>
                    );
                }

                case 'CHECKBOX' : // Checkbox TODO defaultValue doesn't work here
                {
                    const checkboxes = field.field_options.map((option, index) => {
                        const answer = optionAnswers.find((answer) => (answer.field_option_id === option.field_option_id) && answer.selected);
                        return (
                            <Checkbox
                                key={index}
                                editable={true}
                                style={newReportStyles.checkboxStyle}
                                title={option.value}
                                defaultValue={(answer != null)}
                                //The ability to dispatch the checkbox status is passed on to the component
                                //as a prop, and the component itself can call this function in its
                                //onIconPress, i.e. when the checkbox is pressed
                                onPressFunction={() => this.props.dispatch(insertFieldAnswer(field, option, true))}
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

                case 'DROPDOWN' : // Dropdown
                {

                    const selected = field.field_options.find((option) => {
                        return report.option_answers.map((answer) => answer.field_option_id)
                            .includes(option.field_option_id);
                    });

                    return (
                        <View key={index}>
                            <Text style={newReportStyles.textStyleClass}>{field.title}</Text>
                            <View style={newReportStyles.mainDropdownStyleClass}>
                                <ModalDropdown
                                    dropdownStyle={ newReportStyles.dropStyleClass }
                                    options={field.field_options.map((option) => option.value)}
                                    defaultValue={selected.value}/>
                            </View>
                        </View>
                    );
                }

                case 'RADIOBUTTON': // Choice (Yes/No) NOTE: Error will be removed when options come from the database.
                {
                    const labels = field.field_options.map((option) => {
                        return (
                            { label: option.value, value: option }
                        );
                    });

                    const answerIndex = field.field_options.findIndex((option) =>
                        (optionAnswers.find(a => a.field_option_id === option.field_option_id && a.selected)));

                    return (
                        <RadioForm
                            disabled={!isEditable}
                            radio_props={labels}
                            initial={answerIndex || 0}
                            itemRealKey="value"
                            onPress={(label) => this.props.dispatch(insertFieldAnswer(field, label, true))} //TODO this only allows '1' to be saved...
                            buttonColor={'#9dcbe5'}
                            labelStyle={{ paddingRight: 12, paddingLeft: 6 }}
                            //formHorizontal={true}
                        />
                    );
                }

                case 'CALENDAR': // Calendar
                {
                    const answer = report.string_answers.find((answer) => answer.field_id === field.field_id);
                    return (
                        <View key={index}>
                            <Text style={newReportStyles.textStyleClass}>{field.title}</Text>
                            <DatePicker
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
                                onDateChange={(date) => this.props.dispatch(insertFieldAnswer(field, date, false))}
                            />
                        </View>
                    );
                }

                case 'INSTRUCTIONS': // Instruction
                {
                    const answer = report.string_answers.find((answer) => answer.field_id === field.field_id);
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
                    const answer = report.string_answers.find((answer) => answer.field_id === field.field_id);
                    return (
                        <View key={index}>
                            <Text style={newReportStyles.textStyleClass}>{field.title}</Text>
                            <TextInput
                                style={newReportStyles.multilinedTextInputStyleClass}
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text, false))}
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
                    const answer = report.string_answers.find((answer) => answer.field_id === field.field_id);
                    return (
                        <View key={index}>
                            <Text style={newReportStyles.textStyleClass}>{field.title}</Text>
                            <DatePicker
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
                                iconComponent={
                                    <Icon
                                        name={'schedule'}
                                        type={'MaterialIcons'}
                                        iconStyle={newReportStyles.dateIconStyle}
                                    />
                                }
                                onDateChange={(time) => this.props.dispatch(insertFieldAnswer(field, time, false))}

                            />
                        </View>
                    );
                }

                case 'NUMBERFIELD': // Digits (Text input that only accepts numeric characters)
                {
                    const answer = report.string_answers.find((answer) => answer.field_id === field.field_id).value;
                    return (
                        <View key={index}>
                            <Text style={newReportStyles.textStyleClass}>{field.title}</Text>
                            <TextInput
                                style={newReportStyles.textInputStyleClass}
                                value={answer}
                                keyboardType='numeric'
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text, false))}
                            />
                        </View>
                    );
                }

                case 'LINK': // Link
                {
                    const answer = report.string_answers.find((answer) => answer.field_id === field.field_id);
                    return (
                        <View key={index} style={{ flexDirection: 'row' }}>
                            <Icon name={'link'} type={'feather'} iconStyle={newReportStyles.linkIconStyle}/>
                            <Text
                                style={newReportStyles.linkStyleClass}
                                onPress={() => Linking.openURL(answer.value)}>
                                {answer.value}
                            </Text>
                        </View>
                    );
                }
                case 'USER_DROPDOWN': // User dropdown
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
                                onChangeText={(title) => this.props.dispatch(insertTitle(title))}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInputStyleClass}
                            />
                            <View pointerEvents={isEditable ? undefined : 'none'} >
                                {renderedFields}
                            </View>
                        </ScrollView>
                    </View>
                </View>

                {
                    (this.props.navigation.state.params.reportID < 0) &&
                        <View style={ newReportStyles.buttonView}>
                            <Button title={strings('createNew.save')} key={999} type={'save'} onPress={ () => this.save()} />
                            <Button title={strings('createNew.send')} type={'send'} onPress={() => this.send()}  />
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
    const reports       = state.reports;
    const templates     = state.templates;
    const report        = state.newReport;
    return {
        username,
        report,
        number,
        token,
        reports,
        templates
    };
};

export default connect(mapStateToProps)(ReportScreen);

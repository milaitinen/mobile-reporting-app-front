import React from 'react';
import { /*Button, */ View, ScrollView, TextInput, Alert, Text, ActivityIndicator, Linking, /*Picker*/ } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
// import ModalDropdown from 'react-native-modal-dropdown';
import moment from 'moment';
import { connect } from 'react-redux';
import { Checkbox } from '../components/Checkbox';
import { Radioform } from '../components/Radioform';
import { Dropdown } from '../components/Dropdown';
import { Button } from '../components/Button';
import { Datepicker } from '../components/Datepicker';
import { AppBackground } from '../components/AppBackground';
import { createNewReport, removeDraft, saveDraft } from './api';
import { strings } from '../locales/i18n';
import { insertFieldAnswer, emptyFields, openReport, insertTitle } from '../redux/actions/newReport';

import newReportStyles from './style/newReportStyles';
import templateScreenStyles from './style/templateScreenStyles';
// import styles from '../components/Dropdown/styles';
// import EStyleSheet from 'react-native-extended-stylesheet';

// TODO: COMMENT EVERYTINGS great. isEditable changed based on draft/report?
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
        Alert.alert('Deleted draft.');

        this.setState({ isLoading: true });

        this.props.dispatch(emptyFields());
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
            //const stringAnswer = report.string_answers.find((answer) => answer.field_id === field.field_id);
            //const fieldOptions = field.field_options;

            const renderedField = () => {
                switch (field.type) {
                    case 'TEXTFIELD_SHORT' : // Name
                    {
                        const answer = report.string_answers.find((answer) => answer.field_id === field.field_id);
                        return (
                            <TextInput
                                value={answer.value}
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text, false))}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInput}
                            />
                        );
                    }

                    case 'CHECKBOX' : // Checkbox TODO defaultValue doesn't work here
                    {
                        const checkboxes = field.field_options.map((option, index) => {
                            const answer = optionAnswers.find((answer) => (answer.field_option_id === option.field_option_id) && answer.selected);
                            return (
                                <Checkbox
                                    key={index}
                                    editable={isEditable}
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
                            <Dropdown
                                disabled={!isEditable}
                                defaultValue={selected.value}
                                options={field.field_options.map((option) => option.value)}
                            />
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
                            <Radioform
                                options={labels}
                                editable={isEditable}
                                initial={answerIndex || 0}
                                onPress={(label) => this.props.dispatch(insertFieldAnswer(field, label, true))} //TODO this only allows '1' to be saved...
                            />
                        );
                    }

                    case 'CALENDAR': // Calendar
                    {
                        const answer = report.string_answers.find((answer) => answer.field_id === field.field_id);
                        return (
                            <Datepicker
                                editable={isEditable}
                                mode={'date'}
                                answer={answer.value}
                                onChange={(date) => this.props.dispatch(insertFieldAnswer(field, date, false))}
                            />
                        );
                    }

                    case 'INSTRUCTIONS': // Instruction
                    {
                        const answer = report.string_answers.find((answer) => answer.field_id === field.field_id);
                        return (
                            <Text
                                style={newReportStyles.instructions}>
                                {answer.value} {/*TODO: this is supposed to be the default value since instructions can't be changed*/}
                            </Text>
                        );
                    }

                    case 'TEXTFIELD_LONG': // Text (Multiple row text field)
                    {
                        const answer = report.string_answers.find((answer) => answer.field_id === field.field_id);
                        return (
                            <TextInput
                                multiline
                                style={newReportStyles.multilineTextInput}
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text, false))}
                                value={answer.value}
                            />
                        );
                    }

                    case 'TIME': // Time
                    {
                        const answer = report.string_answers.find((answer) => answer.field_id === field.field_id);
                        return (
                            <Datepicker
                                editable={isEditable}
                                mode={'time'}
                                answer={answer.value}
                                onChange={(time) => this.props.dispatch(insertFieldAnswer(field, time, false))}
                            />
                        );
                    }

                    case 'NUMBERFIELD': // Digits (Text input that only accepts numeric characters)
                    {
                        const answer = report.string_answers.find((answer) => answer.field_id === field.field_id).value;
                        return (
                            <TextInput
                                style={newReportStyles.textInput}
                                value={answer}
                                keyboardType='numeric'
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text, false))}
                            />
                        );
                    }

                    case 'LINK': // Link
                    {
                        const answer = report.string_answers.find((answer) => answer.field_id === field.field_id);
                        return (
                            <View key={index} style={newReportStyles.linkContainer}>
                                <Icon name={'link'} type={'feather'} iconStyle={newReportStyles.linkIcon}/>
                                <Text
                                    style={newReportStyles.link}
                                    onPress={() => {
                                        const url = answer.value;
                                        // This checks if any installed app can handle the
                                        // url before attempting to open it.
                                        // This is done as shown in React Native docs.
                                        Linking.canOpenURL(url).then(supported => {
                                            if (!supported) {
                                                console.log('Can\'t handle url: ' + url);
                                            } else {
                                                return Linking.openURL(url);
                                            }
                                        }).catch(err => console.error('An error occurred', err));
                                    }}>
                                    {answer.value}
                                </Text>
                            </View>
                        );
                    }
                    case 'USER_DROPDOWN': // User dropdown
                        return (
                            <Dropdown
                                disabled={!isEditable}
                                defaultValue={field.answer}
                                options={field.answer.split(',')}
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
                    <View style={newReportStyles.fieldTitle}>
                        <Text style={ newReportStyles.text }>
                            {field.title}
                        </Text>
                        {
                            (field.required) &&
                            <Text style={newReportStyles.required}> *</Text>
                        }
                    </View>
                    {renderedField()}
                </View>);
        });

        return (
            <AppBackground>
                <View style={ newReportStyles.ViewContainer }>
                    <ScrollView keyboardShouldPersistTaps={'handled'} style={ newReportStyles.ReportScrollView }>
                        <View style={newReportStyles.fieldContainer}>
                            <View style={newReportStyles.fieldTitle}>
                                <Text style={newReportStyles.text}>Otsikko</Text>
                                <Text style={newReportStyles.required}> *</Text>
                            </View>
                            <TextInput
                                editable={isEditable}
                                defaultValue={this.props.navigation.state.params.title}
                                onChangeText={(title) => this.props.dispatch(insertTitle(title))}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInput}
                            />
                        </View>

                        <View pointerEvents={isEditable ? undefined : 'none'}>
                            {renderedFields}
                        </View>
                        {
                            (this.props.navigation.state.params.reportID < 0) &&
                            <View>
                                <Button title={strings('createNew.save')} key={999} type={'save'} onPress={ () => this.save()} />
                                <Button title={strings('createNew.send')} type={'send'} onPress={() => this.send()}  />
                                <Button title={'Delete'} type={'delete'} disabled={false} onPress={() => this.deleteDraft()} />
                            </View>
                        }
                    </ScrollView>
                </View>
            </AppBackground>

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

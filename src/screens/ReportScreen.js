import React from 'react';
import {
    ActivityIndicator,
    Alert,
    BackHandler,
    Linking,
    ScrollView,
    Text,
    TextInput,
    View
} from 'react-native';
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
import { createNewReport, removeDraft, saveDraft, fetchEmptyTemplate, saveToQueueWithTemplateID } from '../api';
import { strings } from '../locales/i18n';
import { insertFieldAnswer, emptyFields, openReport, insertDate, insertTitle, createDraft } from '../redux/actions/newReport';
import { setUnsaved, setSavingRequested } from '../redux/actions/reportEditing';
import { handleBack } from '../functions/handleBack';
import { ReportEditingBackButton } from '../components/ReportEditingBackButton';
// import { storeDraftByTemplateID, storeQueuedReportByTemplateID } from '../redux/actions/reports';

import newReportStyles from './style/newReportStyles';
import templateScreenStyles from './style/templateScreenStyles';

// import styles from '../components/Dropdown/styles';
// import EStyleSheet from 'react-native-extended-stylesheet';

// TODO: COMMENT EVERYTINGS great. isEditable changed based on draft/report?
export class ReportScreen extends React.Component {

    static navigationOptions = () => {
        return {
            // the Redux-connected on-screen back button is set here
            headerLeft: ReportEditingBackButton,
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            isNewReport     : false,
            title           : null,
            isLoading       : true,
            number          : '',
            isEditable      : false,
            fields          : null,
        };
    }

    _handleBack = () => handleBack(this.props.dispatch, this.props.isUnsaved);

    componentWillMount() {
        const isNewReport = this.props.navigation.state.params.isNewReport;
        this.setState({ isNewReport: isNewReport });

        if (isNewReport) {
            // BackHandler for detecting hardware button presses for back navigation (Android only)
            BackHandler.addEventListener('hardwareBackPress', this._handleBack);
            this.props.dispatch(setUnsaved(true));
        }
    }

    componentDidMount() {
        if (this.state.isNewReport) {
            this._createDraft();
        } else {
            const { templateID, reportID } = this.props.navigation.state.params;
            const { reports, templates } = this.props;

            const report = reports[templateID].find((obj) => obj.report_id === reportID);
            const fields = templates[templateID] ? templates[templateID].fields : [];

            this.props.dispatch(openReport(report));
            this.setState({ fields: fields, isEditable: reportID < 0, isLoading : false });

            // BackHandler for detecting hardware button presses for back navigation (Android only)
            BackHandler.addEventListener('hardwareBackPress', this._handleBack);
        }
    }

    componentWillUnmount() {
        // Removes the BackHandler EventListener when unmounting
        BackHandler.removeEventListener('hardwareBackPress', this._handleBack);

        if (this.props.isSavingRequested) {
            if (this.state.isNewReport || this.props.navigation.state.params.reportID < 0) {
                this.save();
                this.props.dispatch(setSavingRequested(false));
            }
        }
        this.props.dispatch(setUnsaved(false));
    }

    _createDraft = () => {
        const { username, templates, token } = this.props;
        const { isEditable, templateID } = this.props.navigation.state.params;

        fetchEmptyTemplate(username, templateID, token)
            .then(template => {
                this.props.dispatch(createDraft(template));
                this.props.dispatch(insertDate(moment().format('YYYY-MM-DD')));
                this.setState({ fields: templates[templateID] ? templates[templateID].fields : [] });
            })
            .then(() => this.setState({ isEditable: isEditable, isLoading: false }))
            .catch(error => console.error(error));
    };

    // delete draft from asyncstorage
    _deleteDraft = () => {
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
        const { username, report, newReport } = this.props;
        const { templateID } = this.props.navigation.state.params;
        const { isNewReport } = this.state;
        const draft = isNewReport ? newReport : report;

        // Update date_created to current date
        if (!isNewReport) draft.date_created = moment().format('YYYY-MM-DD');

        saveDraft(username, templateID, draft); // give a negative id
        Alert.alert(strings('createNew.saved'));

        this.setState({ isLoading: true });

        //refresh template screen
        this.props.dispatch(emptyFields());
        this.props.navigation.state.params.refresh();

    };

    saveToPending = () => {
        const { username, report } = this.props;
        const { templateID, reportID } = this.props.navigation.state.params;

        report.report_id = null;    // sets id to null, will get proper id when sent
        // Update date_created to current date
        if (!this.state.isNewReport) report.date_created = moment().format('YYYY-MM-DD');

        Alert.alert(strings('createNew.queued'));
        saveToQueueWithTemplateID(username, templateID, report);

        if (!this.state.isNewReport) removeDraft(username, templateID, reportID);

        this.setState({ isLoading: true });

        //refresh template screen
        this.props.dispatch(emptyFields());
        this.props.navigation.state.params.refresh();
        this.props.navigation.goBack();

    };

    saveAndLeave = () => {
        this.save();
        this.props.navigation.goBack();
    };

    // Inserts data to server with a post method.
    send = () => {
        const { username, report, newReport, token } = this.props;
        const { isNewReport } = this.state;
        const draft = isNewReport ? newReport : report;

        if (!this.props.isConnected){
            Alert.alert(
                'You are offline',
                'Report will be added to queue and will be sent when online',
                [
                    { text: strings('createNew.cancel'), onPress: () => console.log('Cancel pressed'), style: 'cancel' },
                    { text: 'Ok', onPress: () => {
                        console.log('Ok Pressed');
                        this.saveToPending();
                    },
                    }
                ],
                { cancelable: false }
            );
            return;
        }

        if (!isNewReport) draft.date_created = moment().format('YYYY-MM-DD');

        createNewReport(username, draft, token)
            .then(response => {
                if (response.status === 200) {
                    this.props.navigation.state.params.refresh();
                    this.props.navigation.dispatch(NavigationActions.back());
                    if (!isNewReport) {
                        const { templateID, reportID } = this.props.navigation.state.params;
                        removeDraft(username, templateID, reportID);
                    }
                    return Alert.alert('Report sent!');
                } else {
                    console.log('response.status', response.status);
                    return response.status;
                }
            }).catch((error) => {
                console.error(error);
            });
    };

    insertAnswer = (field, value, isOption) => {
        const { dispatch, isUnsaved } = this.props;

        dispatch(insertFieldAnswer(field, value, isOption));
        if (!isUnsaved) dispatch(setUnsaved(true));
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

        const { isEditable, isNewReport } = this.state;
        const { report, newReport, isUnsaved, dispatch } = this.props;
        const optionAnswers = isNewReport ? newReport.option_answers : report.option_answers;

        const renderedFields = this.state.fields.map((field, index) => {

            const renderedField = () => {
                switch (field.type) {
                    /*
                    case 'NAME': // Name TODO: necessary? same as title?
                    {
                        return (
                            <TextInput
                                placeholder={field.default_value}
                                onChangeText={(text) => this.insertAnswer(field, text, false)}
                                placeholderTextColor={newReportStyles.$gray}
                                //Title is now set separately from this field
                                //onSubmitEditing={(event) => this.props.dispatch(insertTitle(event.nativeEvent.text))}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInput}
                            />
                        );
                    }
                    */
                    case 'TEXTFIELD_SHORT' : // Name
                    {
                        const answer = report.string_answers.find((answer) => answer.field_id === field.field_id);
                        return (
                            <TextInput
                                placeholder={isNewReport ? field.default_value : null}
                                placeholderTextColor={isNewReport ? newReportStyles.$gray : null}
                                value={isNewReport ? null : answer.value}
                                onChangeText={(text) => this.insertAnswer(field, text, false)}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInput}
                            />
                        );
                    }

                    case 'CHECKBOX' : // Checkbox TODO defaultValue doesn't work here
                    {
                        const checkboxes = field.field_options.map((option, index) => {
                            const answer = optionAnswers
                                .find((answer) => (answer.field_option_id === option.field_option_id) && answer.selected);

                            return (
                                <Checkbox
                                    key={index}
                                    editable={isEditable}
                                    style={newReportStyles.checkboxStyle}
                                    title={option.value}
                                    defaultValue={(answer != null)}
                                    //The ability to dispatch the checkbox status is passed on to the component
                                    //as a prop, and the component itself can call this function in its
                                    //onIconPress, i.e. when the checkbox is pressed
                                    onPressFunction={() => this.insertAnswer(field, option, true)}
                                />
                            );
                        });
                        return (
                            <View key={index}>
                                {checkboxes}
                            </View>
                        );
                    }

                    /*
                    case 'NESTED_DROPDOWN': // Dropdown
                    {
                        return (
                            <ModalDropdown
                                disabled={!isEditable}
                                options={['option 1', 'option 2']}
                                dropdownStyle={styles.dropStyleClass}
                                defaultValue={'Select option'}
                                style={styles.dropdownButton}
                                textStyle={styles.dropdownText}
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
                                    <Text style={styles.dropdownText}>
                                        Select option
                                    </Text>
                                    <Icon name={'expand-more'} color={EStyleSheet.value('$placeholder')} style={styles.icon}/>
                                </View>
                            </ModalDropdown>
                        );
                    }
                     */

                    case 'DROPDOWN' : // Dropdown
                    {
                        const selected = isNewReport
                            ? null
                            : field.field_options.find((option) => {
                                return report.option_answers
                                    .find((answer) => answer.field_option_id === option.field_option_id && answer.selected);
                            });

                        const getOptionByValue = (value) => field.field_options.find(op => op.value === value);

                        return (
                            <Dropdown
                                disabled={!isEditable}
                                defaultValue={isNewReport ? 'Select user' : selected.value}
                                options={field.field_options.map((option) => option.value)}
                                onSelect={(value) => this.insertAnswer(field, getOptionByValue(value), true)}
                            />
                        );
                    }
                    case 'RADIOBUTTON': // Choice (Yes/No) NOTE: Error will be removed when options come from the database.
                    {
                        const labels = field.field_options.map((option) => {
                            return ({ label: option.value, value: option });
                        });
                        const answerIndex = field.field_options.findIndex((option) =>
                            isNewReport
                                ? option.default_value
                                : (optionAnswers.find(a => a.field_option_id === option.field_option_id && a.selected)));

                        return (
                            <Radioform
                                options={labels}
                                editable={isEditable}
                                initial={answerIndex || 0}
                                itemRealKey="value"
                                onPress={(label) => this.insertAnswer(field, label, true)}
                            />
                        );
                    }

                    case 'CALENDAR': // Calendar
                    {
                        const answer = isNewReport
                            ? newReport.string_answers.find((answer) => answer.field_id === field.field_id).value
                            : report.string_answers.find((answer) => answer.field_id === field.field_id).value;
                        return (
                            <Datepicker
                                editable={isEditable}
                                mode={'date'}
                                answer={answer}
                                onChange={(date) => this.insertAnswer(field, date, false)}
                            />
                        );
                    }

                    case 'INSTRUCTIONS': // Instruction
                    {
                        return (
                            <Text style={newReportStyles.instructions}>
                                {field.default_value}
                            </Text>
                        );
                    }

                    case 'TEXTFIELD_LONG': // Text (Multiple row text field)
                    {
                        const answer = isNewReport ? null : report.string_answers.find((answer) => answer.field_id === field.field_id);
                        return (
                            <TextInput
                                multiline
                                style={newReportStyles.multilineTextInput}
                                onChangeText={(text) => this.insertAnswer(field, text, false)}
                                value={answer ? answer.value : null}
                                placeholder={isNewReport ? field.default_value : null}
                                placeholderTextColor={isNewReport ? newReportStyles.$gray : null}
                            />
                        );
                    }

                    case 'TIME': // Time
                    {
                        const answer = isNewReport
                            ? newReport.string_answers.find((answer) => answer.field_id === field.field_id).value
                            : report.string_answers.find((answer) => answer.field_id === field.field_id).value;

                        return (
                            <Datepicker
                                editable={isEditable}
                                mode={'time'}
                                answer={answer}
                                onChange={(time) => this.insertAnswer(field, time, false)}
                            />
                        );
                    }

                    case 'NUMBERFIELD': // Digits (Text input that only accepts numeric characters)
                    {
                        const answer = isNewReport ? null : report.string_answers.find((answer) => answer.field_id === field.field_id).value;
                        return (
                            <TextInput
                                style={newReportStyles.textInput}
                                value={answer}
                                placeholder={isNewReport ? field.default_value : null}
                                placeholderTextColor={isNewReport ? newReportStyles.$gray: null}
                                keyboardType='numeric'
                                onChangeText={(text) => this.insertAnswer(field, text, false)}
                            />
                        );
                    }

                    case 'LINK': // Link
                    {
                        const answer = isNewReport
                            ? field.default_value
                            : report.string_answers.find((answer) => answer.field_id === field.field_id).value;

                        return (
                            <View key={index} style={newReportStyles.linkContainer}>
                                <Icon name={'link'} type={'feather'} iconStyle={newReportStyles.linkIcon}/>
                                <Text
                                    style={newReportStyles.link}
                                    onPress={() => {
                                        const url = answer;
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
                                    {answer}
                                </Text>
                            </View>
                        );
                    }
                    case 'USER_DROPDOWN': // User dropdown
                        return (
                            <Dropdown
                                disabled={!isEditable}
                                defaultValue={isNewReport ? 'Select user' : field.answer}
                                options={isNewReport ? JSON.parse(field.default_value) : field.answer.split(',')}
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
                                placeholder={isNewReport ? 'Otsikko' : null}
                                placeholderTextColor={isNewReport ? newReportStyles.$gray : null}
                                defaultValue={isNewReport ? null : this.props.navigation.state.params.title}
                                onChangeText={(title) => {
                                    dispatch(insertTitle(title));
                                    if (!isUnsaved) dispatch(setUnsaved(true));
                                }}
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
                                <Button title={strings('createNew.save')} key={999} type={'save'} onPress={ () => this.saveAndLeave()} />
                                <Button title={strings('createNew.send')} type={'send'} onPress={() => this.send()}  />
                                <Button title={'Delete'} type={'delete'} disabled={false} onPress={() => this._deleteDraft()} />
                            </View>
                        }
                        {
                            (isNewReport) &&
                            <View>
                                <Button title={strings('createNew.save')} key={999} type={'save'} onPress={ () => this.saveAndLeave()} />
                                <Button title={strings('createNew.send')} type={'send'} onPress={() => this.send()}  />
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
    const newReport     = state.newReport;
    const reports       = state.reports;
    const title         = state.newReport.title;
    const templates     = state.templates;
    const report        = state.newReport;
    const isConnected   = state.connection.isConnected;
    const isUnsaved     = state.reportEditing.isUnsaved;
    const isSavingRequested = state.reportEditing.isSavingRequested;

    return {
        username,
        report,
        number,
        token,
        newReport,
        reports,
        title,
        templates,
        isConnected,
        isSavingRequested,
        isUnsaved,
    };
};

export default connect(mapStateToProps)(ReportScreen);

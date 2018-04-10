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
import moment from 'moment';
import { connect } from 'react-redux';
import { Checkbox } from '../components/Checkbox';
import { Datepicker } from '../components/Datepicker';
import { Radioform } from '../components/Radioform';
import { Dropdown } from '../components/Dropdown';
import { Button } from '../components/Button';
import ModalDropdown from 'react-native-modal-dropdown';

import { AppBackground } from '../components/AppBackground';
import { createNewReport, saveDraft, fetchEmptyTemplate } from './api';
import { strings } from '../locales/i18n';
import { emptyFields, insertFieldAnswer, insertTitle, insertDate, createDraft } from '../redux/actions/newReport';
import { storeDraftByTemplateID } from '../redux/actions/reports';
import { handleBack } from '../functions/handleBack';
import { ReportEditingBackButton } from '../components/ReportEditingBackButton';

import newReportStyles from './style/newReportStyles';
import templateScreenStyles from './style/templateScreenStyles';
import styles from '../components/Dropdown/styles';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setUnsaved } from '../redux/actions/reportEditing';





// "export" necessary in order to test component without Redux store
export class NewReportScreen extends React.Component {
    static navigationOptions = () => {
        return {
            // the Redux-connected on-screen back button is set here
            headerLeft: ReportEditingBackButton,
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading       : true,
            number          : '',
            isEditable      : false,
            fields          : null,
        };
    }

    _handleBack = () => handleBack(this.props.dispatch, this.props.isUnsaved);

    componentWillMount() {
        // BackHandler for detecting hardware button presses for back navigation (Android only)
        BackHandler.addEventListener('hardwareBackPress', this._handleBack);
        // TODO: implement checking isUnsaved, now it is assumed to be true.
        this.props.dispatch(setUnsaved(true));
    }

    componentDidMount() {
        this.instantiate();
    }

    componentWillUnmount() {
        console.log('calling this');
        // Removes the BackHandler EventListener when unmounting
        BackHandler.removeEventListener('hardwareBackPress', this._handleBack);
        if (this.props.isSavingRequested) {
            this.save();
        }
        this.props.dispatch(setUnsaved(false));
    }

    // TODO come up with a better name
    instantiate = () => {
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

    // save report locally in asyncstorage
    save = () => {
        const { username, newReport } = this.props;
        const { templateID } = this.props.navigation.state.params;
        const report = newReport;
        saveDraft(username, templateID, report); // give a negative id
        Alert.alert('Report saved!');
        this.setState({ isLoading: true });
        //refresh template screen
        this.props.dispatch(emptyFields());
        this.props.navigation.state.params.refresh();
    };

    //A helper method that calls save and then navigates back
    saveAndLeave = () => {
        this.save();
        this.props.navigation.goBack();
    }

    // Inserts data to server with a post method.
    send = () => {
        const { username, newReport, token } = this.props;
        /*
        if (!this.props.isConnected){
            Alert.alert(
                strings('createNew.noConnection'),
                [
                    { text: strings('createNew.cancel'), onPress: () => console.log('Cancel pressed'), style: 'cancel' },
                    { text: strings('createNew.no'), onPress: () => console.log('No Pressed') },
                    { text: strings('createNew.yes'), onPress: () => console.log('Yes Pressed') },
                    //TODO: actually save changes when no connection :D
                ],
                { cancellable: false }
            );
        }
        */
        createNewReport(username, newReport, token).then(response => {
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
        const { newReport } = this.props;
        const optionAnswers = newReport.option_answers;

        const renderedFields = this.state.fields.map((field, index) => {

            const renderedField = () => {
                switch (field.type) { // typeID because fetchFieldsByTemplateID returns typeID (in ReportScreen typeID->fieldID)
                    case 'NAME': // Name TODO: necessary? same as title?
                    {
                        return (
                            <TextInput
                                editable={isEditable}
                                placeholder={field.default_value}
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text, false))}
                                placeholderTextColor={EStyleSheet.value('$placeholder')}
                                //Title is now set separately from this field
                                //onSubmitEditing={(event) => this.props.dispatch(insertTitle(event.nativeEvent.text))}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInput}
                            />
                        );
                    }
                    case 'CHECKBOX': // Checkbox
                    {
                        const checkboxes = field.field_options.map((option, index) => {
                            const answer = optionAnswers.find((answer) => (answer.field_option_id === option.field_option_id) && answer.selected);
                            return (
                                <Checkbox
                                    key={index}
                                    editable={isEditable}
                                    style={newReportStyles.checkboxStyle}
                                    title={option.value}
                                    defaultValue={(answer != null)}
                                    //The ability to dispatch the checkbox status is passed on to the component
                                    //as a prop, and the component itself can call this function in its
                                    //onPress, i.e. when the checkbox is pressed
                                    onPressFunction={() => this.props.dispatch(insertFieldAnswer(field, option, true))}
                                />
                            );
                        });
                        return (
                            <View>
                                { checkboxes }
                            </View>
                        );
                    }
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
                    case 'DROPDOWN':
                    {
                        const getOptionByValue = (value) => {
                            return field.field_options[value];
                        };

                        return (
                            <Dropdown
                                disabled={!isEditable}
                                defaultValue={'Select user'}
                                options={field.field_options.map((option) => option.value)}
                                onSelect={(value) => this.props.dispatch(insertFieldAnswer(field, getOptionByValue(value), true))}
                            />

                        );
                    }
                    case 'TEXTFIELD_SHORT': // TextRow (One row text field)
                    {
                        return (
                            <TextInput
                                editable={isEditable}
                                placeholder={field.default_value}
                                placeholderTextColor={EStyleSheet.value('$placeholder')}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInput}
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text, false))}
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

                        const initialIndex = field.field_options.findIndex((option) => {
                            return (option.default_value);
                        });

                        return (
                            <Radioform
                                options={labels}
                                editable={isEditable}
                                initial={initialIndex}
                                itemRealKey="value"
                                onPress={(label) => this.props.dispatch(insertFieldAnswer(field, label, true))}
                            />
                            // saving worked with this:
                            // onPress={(value) => this.props.dispatch(insertFieldAnswer(field, value))}
                        );
                    }

                    case 'CALENDAR': // Calendar
                    {
                        const date = newReport.string_answers.find((answer) => answer.field_id === field.field_id).value;
                        return (
                            <Datepicker
                                editable={isEditable}
                                mode={'date'}
                                answer={date}
                                onChange={(date) => this.props.dispatch(insertFieldAnswer(field, date, false))}
                            />
                        );
                    }
                    case 'INSTRUCTIONS': // Instructions
                    {
                        return (
                            <Text style={newReportStyles.instructions}>
                                {field.default_value}
                            </Text>
                        );
                    }
                    case 'TEXTFIELD_LONG': // Text (Multiple row text field)
                    {
                        return (
                            <TextInput
                                multiline
                                editable={isEditable}
                                style={ newReportStyles.multilineTextInput }
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text, false))}
                                placeholder={field.default_value}
                                placeholderTextColor={EStyleSheet.value('$placeholder')}
                            />
                        );
                    }
                    case 'TIME': // Time
                    {
                        const time = newReport.string_answers.find((answer) => answer.field_id === field.field_id).value;
                        return (
                            <Datepicker
                                editable={isEditable}
                                mode={'time'}
                                answer={time}
                                onChange={(time) => this.props.dispatch(insertFieldAnswer(field, time, false))}
                            />
                        );
                    }
                    case 'NUMBERFIELD': // Digits (Text input that only accepts numeric characters)
                    {
                        return (
                            <TextInput
                                editable={isEditable}
                                style={newReportStyles.textInput}
                                placeholder={field.default_value}
                                placeholderTextColor={EStyleSheet.value('$placeholder')}
                                keyboardType='numeric'
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text, false))}
                            />
                        );
                    }
                    case 'LINK': // Link
                    {
                        return (
                            <View style={newReportStyles.linkContainer}>
                                <Icon name={'link'} type={'feather'} iconStyle={newReportStyles.linkIcon}/>
                                <Text
                                    disabled={!isEditable}
                                    style={newReportStyles.link}
                                    onPress={() => {
                                        const url = field.default_value;
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
                                    Link to somewhere
                                </Text>
                            </View>
                        );
                    }
                    case 'USER_DROPDOWN': // User dropdown TODO: separate case needed? Dropdown contains the exact same code
                    {
                        return (
                            <Dropdown
                                disabled={!isEditable}
                                defaultValue={'Select user'}
                                options={JSON.parse(field.default_value)}
                            />
                        );
                    }
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
                                placeholder={'Otsikko'}
                                placeholderTextColor={EStyleSheet.value('$placeholder')}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInput}
                                onChangeText={(text) => this.props.dispatch(insertTitle(text))}
                            />
                        </View>
                        {renderedFields}
                        <Button title={strings('createNew.save')} key={999} type={'save'} onPress={() => this.saveAndLeave()}/>
                        <Button title={strings('createNew.send')} type={'send'} onPress={() => this.send()}/>
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
    const templates     = state.templates;
    const reports       = state.reports;
    const newReport     = state.newReport;
    const title         = state.newReport.title;
    const number        = state.newReport.number;
    const isUnsaved     = state.reportEditing.isUnsaved;
    const isConnected = state.connection.isConnected;
    const isSavingRequested = state.reportEditing.isSavingRequested;

    return {
        username,
        templates,
        title,
        number,
        newReport,
        token,
        reports,
        isUnsaved,
        isConnected,
        isSavingRequested,
    };
};

export default connect(mapStateToProps)(NewReportScreen);

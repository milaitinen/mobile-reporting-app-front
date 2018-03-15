import React from 'react';
import {
    ActivityIndicator,
    Alert,
    BackHandler,
    Button,
    Linking,
    ScrollView,
    Text,
    TextInput,
    View
} from 'react-native';
import { HeaderBackButton, NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import { Checkbox } from '../components/Checkbox';
import { Dropdown } from '../components/Dropdown';
import ModalDropdown from 'react-native-modal-dropdown';

import { AppBackground } from '../components/AppBackground';
import { createNewReport, saveDraft, fetchEmptyTemplate } from './api';
import { strings } from '../locales/i18n';
import { emptyFields, insertFieldAnswer, insertTitle, setUnsaved, createDraft } from '../redux/actions/newReport';
import { storeDraftByTemplateID } from '../redux/actions/reports';

import newReportStyles from './style/newReportStyles';
import templateScreenStyles from './style/templateScreenStyles';
import styles from '../components/Dropdown/styles';


/**
 * Handles the back-navigation logic in newReportScreen.
 *
 * This should be used inside a Redux-connected component, so that the
 * component can get the parameters from Redux and pass them on to this function.
 * Then this function can i.e. dispatch Redux actions.
 *
 * Note that the return values are only needed for the Android hardware back button,
 * and are not necessary with the on-screen back button.
 * @param isUnsaved
 * @param dispatch
 * @returns {boolean}
 */
const handleBack = (isUnsaved, dispatch) => {
    if (isUnsaved) {
        Alert.alert(
            'You have unsaved changes',
            'Are you sure you want to leave without saving?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel pressed'), style: 'cancel' },
                { text: 'No', onPress: () => console.log('No Pressed') },
                { text: 'Yes', onPress: () => {
                    console.log('Yes Pressed');
                    dispatch(emptyFields());
                    //dispatch(setUnsaved(false));
                    dispatch(NavigationActions.back());
                }
                },
            ],
            { cancelable: false }
        );
        return true;
    }
    dispatch(NavigationActions.back());
    // A true return value will prevent the regular handling of the Android back button,
    // whereas false would allow the previous backhandlers to take action after this.
    return true;
};

//A wrapper for the back button, that can be connected to Redux
class HeaderBackButtonWrapper extends React.Component {
    render() {
        return (
            <HeaderBackButton tintColor='#fff' onPress={() => handleBack(this.props.isUnsaved, this.props.dispatch)} />
        );
    }
}


// maps redux state to component props. Object that is returned can be accessed via 'this.props' e.g. this.props.email
const mapStateToProps = (state) => {
    const token         = state.user.token;
    const username      = state.user.username;
    const templates     = state.templates;
    const reports       = state.reports;
    const templateID    = state.newReport.templateID;
    const title         = state.newReport.title;
    const number        = state.newReport.number;
    const isUnsaved     = state.newReport.isUnsaved;
    return {
        username,
        templates,
        templateID,
        title,
        number,
        token,
        reports,
        isUnsaved,
    };
};

const HeaderBackButtonWrapperWithRedux = connect(mapStateToProps)(HeaderBackButtonWrapper);


// "export" necessary in order to test component without Redux store
export class NewReportScreen extends React.Component {
    static navigationOptions = () => {
        return {
            // the Redux-connected on-screen back button is set here
            headerLeft: HeaderBackButtonWrapperWithRedux,
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading       : true,
            number          : '',
            isEditable      : false,
            fields  : null,
        };
    }

    _handleBack = () => handleBack(this.props.isUnsaved, this.props.dispatch);

    componentWillMount() {
        // BackHandler for detecting hardware button presses for back navigation (Android only)
        BackHandler.addEventListener('hardwareBackPress', this._handleBack);
    }

    componentDidMount() {
        this.instantiate();
    }

    componentWillUnmount() {
        // Removes the BackHandler EventListener when unmounting
        BackHandler.removeEventListener('hardwareBackPress', this._handleBack);
    }

    // TODO come up with a better name
    instantiate = () => {
        const { username, templates, templateID, token } = this.props;
        const isEditable = this.props.navigation.state.params.isEditable;

        fetchEmptyTemplate(username, templateID, token)
            .then(template => {
                this.props.dispatch(createDraft(template));
                this.setState({ fields: templates[templateID] ? templates[templateID].fields : [] });
            })
            .then(() => this.setState({ isEditable: isEditable, isLoading: false }))
            .catch(error => console.error(error));
    };

    // save report locally in asyncstorage
    save = () => {
        const { templateID, username } = this.props;

        const report = {
            templateID: templateID,
            userID: 1,      // TODO what to do with userID, orderNo, and id in the future...?
            orderNo: null,
            title: this.props.title || 'Draft',
            dateCreated: moment().format('YYYY-MM-DD'),
            dateAccepted: null,
            id: null
        };

        report.id = saveDraft(username, templateID, report);

        this.props.dispatch(storeDraftByTemplateID(templateID, report)); // store drafts together with other reports in reports state)
        this.props.dispatch(emptyFields());

        Alert.alert('Report saved!');

        //this.setState({ isUnsaved: false });

        //return to template screen and have it refreshed
        this.props.navigation.state.params.refresh();
        this.props.navigation.dispatch(NavigationActions.back());
    };

    // Inserts data to server with a post method.
    send = () => {
        const report = {
            templateID: this.props.templateID,
            title: this.props.title,
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
        const renderedFields = this.state.fields.map((field, index) => {

            switch (field.type) { // typeID because fetchFieldsByTemplateID returns typeID (in ReportScreen typeID->fieldID)

                case 'NAME': // Name
                    return (
                        <View key={index}>
                            <Text style={newReportStyles.textStyleClass}>{field.title}</Text>
                            <TextInput
                                editable={isEditable}
                                placeholder={field.default_value}
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text, false))}
                                placeholderTextColor={'#adadad'}
                                //Title is now set separately from this field
                                //onSubmitEditing={(event) => this.props.dispatch(insertTitle(event.nativeEvent.text))}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInputStyleClass}
                            />
                        </View>
                    );

                case 'CHECKBOX': // Checkbox
                    return (
                        <Checkbox
                            key={index}
                            style={ newReportStyles.checkboxStyle }
                            title={'This is a nice checkbox'}
                            editable={isEditable}
                            //The ability to dispatch the checkbox status is passed on to the component
                            //as a prop, and the component itself can call this function in its
                            //onIconPress, i.e. when the checkbox is pressed
                            onIconPressFunction={(answer) => this.props.dispatch(insertFieldAnswer(field, answer, true))}
                        />
                    );

                case 'NESTED_DROPDOWN': // Dropdown
                    return (
                        <View key={index}>
                            <Text style={ newReportStyles.textStyleClass }>{field.title}</Text>
                            <ModalDropdown
                                disabled={!isEditable}
                                options={['option 1', 'option 2']}
                                dropdownStyle={ newReportStyles.dropStyleClass }
                                defaultValue={'Select option'}
                                style={newReportStyles.dropdownButton}
                                textStyle={newReportStyles.dropdownText}
                                renderRow={ () =>
                                    <View>
                                        <ModalDropdown
                                            options={['option 3', 'option 4']}
                                            style={ newReportStyles.lowerDropdownStyleClass }
                                            dropdownStyle={ styles.dropStyleClass }
                                        />
                                    </View>
                                }
                            >
                                <View style={styles.buttonContent}>
                                    <Text style={styles.dropdownText}>
                                        Select option
                                    </Text>
                                    <Icon name={'expand-more'} color={'#adadad'} style={styles.icon}/>
                                </View>
                            </ModalDropdown>
                        </View>

                    );

                case 'TEXTFIELD_SHORT': // TextRow (One row text field)
                    return (
                        <View key={index}>
                            <Text style={ newReportStyles.textStyleClass }>{field.title}</Text>
                            <TextInput
                                editable={isEditable}
                                placeholder={field.default_value}
                                placeholderTextColor={'#adadad'}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInputStyleClass}
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text, false))}
                            />
                        </View>
                    );

                case 'RADIOBUTTON': // Choice (Yes/No) NOTE: Error will be removed when options come from the database.
                    const props = [{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }];
                    return (
                        <View key={index}>
                            <Text style={ newReportStyles.textStyleClass }>{field.title}</Text>
                            <View style={ newReportStyles.radioButtonContainer }>
                                <RadioForm
                                    animation={true}
                                    formHorizontal={true}
                                >
                                    {props.map((obj, i) =>
                                        <RadioButton
                                            key={i}
                                        >
                                            <RadioButtonInput
                                                disabled={!isEditable}
                                                obj={obj}
                                                index={i}
                                                isSelected={this.state.value === obj.value}
                                                onPress={(value) => { this.setState({ value: value }); }}
                                                borderWidth={1}
                                                buttonColor={'#88c9e5'}
                                                buttonSize={16}
                                                buttonOuterSize={24}
                                                buttonStyle={{}}
                                                buttonWrapStyle={{}}
                                            />
                                            <RadioButtonLabel
                                                disabled={!isEditable}
                                                obj={obj}
                                                index={i}
                                                labelHorizontal={true}
                                                onPress={(value) => { this.setState({ value: value }); }}
                                                labelStyle={{ marginRight: 20 }}
                                                labelWrapStyle={{}}
                                            />
                                        </RadioButton>
                                    )}
                                </RadioForm>
                            </View>
                        </View>
                    );

                case 'CALENDAR': // Calendar
                    return (
                        <View key={index} >
                            <Text style={ newReportStyles.textStyleClass }>{field.title}</Text>
                            <DatePicker
                                disabled={!isEditable}
                                style={ newReportStyles.dateStyleClass }
                                customStyles={{
                                    dateInput: {
                                        borderColor: '#8cc9e5',
                                        borderWidth: 1.5,
                                        borderRadius: 5,
                                        backgroundColor: 'white',
                                    },
                                    dateText: {
                                        color: '#adadad',
                                    }
                                }}
                                date={field.default_value}
                                mode="date"
                                placeholder="select date"
                                placeholderTextColor={'#adadad'}
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                /*iconComponent={<Icon name={'event'} type={'MaterialIcons'} iconStyle={ newReportStyles.dateIconStyle }/>}*/
                                onDateChange={(date) => this.props.dispatch(insertFieldAnswer(field, date, false))}
                            />
                        </View>
                    );


                case 'INSTRUCTIONS': // Instructions
                    return (
                        <View key={index} >
                            <Text style = { newReportStyles.textStyleClass }>{field.title}</Text>
                            <Text style = { newReportStyles.instructions }>
                                {field.default_value}
                            </Text>
                        </View>
                    );

                case 'TEXTFIELD_LONG': // Text (Multiple row text field)
                    return (
                        <View key={index}>
                            <Text style={ newReportStyles.textStyleClass }>{field.title}</Text>
                            <TextInput
                                editable = {isEditable}
                                style = { newReportStyles.multilinedTextInputStyleClass }
                                onChangeText = {(text) => this.props.dispatch(insertFieldAnswer(field, text, false))}
                                placeholder = {field.default_value}
                                multiline = {true}
                                placeholderTextColor={'#adadad'}
                            />
                        </View>
                    );

                case 'TIME': // Time
                    return (
                        <View key={index}>
                            <Text style={ newReportStyles.textStyleClass }>{field.title}</Text>
                            <DatePicker
                                disabled = {!isEditable}
                                style = { newReportStyles.dateStyleClass }
                                customStyles = {{
                                    dateInput: {
                                        borderColor: '#8cc9e5',
                                        borderWidth: 1.5,
                                        borderRadius: 5,
                                        backgroundColor: 'white',
                                    },
                                    dateText: {
                                        color: '#adadad',
                                    }
                                }}
                                date = {field.default_value}
                                mode="time"
                                format="HH:mm"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                minuteInterval={10}
                                iconComponent={<Icon name={'clock'} type={'entypo'} iconStyle={ newReportStyles.dateIconStyle }/>}
                                onDateChange={(time) => this.props.dispatch(insertFieldAnswer(field, time, false))}
                            />
                        </View>
                    );

                case 'NUMBERFIELD': // Digits (Text input that only accepts numeric characters)
                    return (
                        <View key={index}>
                            <Text style={ newReportStyles.textStyleClass }>{field.title}</Text>
                            <TextInput
                                editable={isEditable}
                                style={ newReportStyles.textInputStyleClass }
                                placeholder={field.default_value}
                                placeholderTextColor={'#adadad'}
                                keyboardType = 'numeric'
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text, false))}
                            />
                        </View>
                    );

                case 'LINK': // Link
                    return (
                        <View key={index} style={{ flexDirection: 'row' }}>
                            <Icon name={'link'} type={'feather'} iconStyle={ newReportStyles.linkIconStyle }/>
                            <Text
                                disabled={!isEditable}
                                style={ newReportStyles.linkStyleClass }
                                onPress={() => Linking.openURL(field.default_value)}>
                                Link to somewhere
                            </Text>
                        </View>
                    );

                case 'DROPDOWN': // User dropdown
                    return (
                        <View key={index}>
                            <Text style={ newReportStyles.textStyleClass }>{field.title}</Text>
                            <Dropdown
                                disabled={!isEditable}
                                defaultValue={'Select user'}
                                options={JSON.parse(field.default_value)}
                            />
                        </View>
                    );

                default:
                    return (
                        null
                    );

            }
        });

        //TODO: view styling
        return (
            <AppBackground style={'no-padding'}>
                <View style={ newReportStyles.ViewContainer }>
                    <View style={ newReportStyles.ReportContainer }>
                        <ScrollView keyboardShouldPersistTaps={'handled'} style={ newReportStyles.ReportScrollView }>
                            <View style={newReportStyles.titleContainer}>
                                <Icon name={'assignment'} color={'#a0a0a0'} size={45}/>
                                <Text style={newReportStyles.title}>{strings('templates.report')}</Text>
                            </View>
                            <View style={newReportStyles.fieldContainer}>
                                <View>
                                    <Text style={ newReportStyles.textStyleClass }>Otsikko</Text>
                                    <TextInput
                                        editable={isEditable}
                                        placeholder={'Otsikko'}
                                        placeholderTextColor={'#adadad'}
                                        underlineColorAndroid='transparent'
                                        style={newReportStyles.textInputStyleClass}
                                        onChangeText={(text) => this.props.dispatch(insertTitle(text))}
                                    />
                                </View>
                                {renderedFields}
                            </View>
                        </ScrollView>
                    </View>
                </View>

                <View style={ newReportStyles.buttonView}>
                    <Button title={strings('createNew.save')} key={999} type={'save'} onPress={ () => this.save()} />
                    <Button title={strings('createNew.send')} type={'send'} onPress={() => console.log('send')}  />
                </View>
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




export default connect(mapStateToProps)(NewReportScreen);

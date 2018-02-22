import React from 'react';
import { Button, View, ScrollView, TextInput, Alert, Text, ActivityIndicator, Linking, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import RadioForm from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import ModalDropdown from 'react-native-modal-dropdown';
import moment from 'moment';
import { connect } from 'react-redux';
import { Checkbox } from '../components/Checkbox';

import { AppBackground } from '../components/AppBackground';
import { createNewReport, fetchFieldsByTemplateID, saveReport, saveAnswers } from './api';
import { strings } from '../locales/i18n';
import { insertFieldAnswer, emptyFields, insertTitle } from '../redux/actions/newReport';
import { storeSavedReportsByTemplateID } from '../redux/actions/reports';

import newReportStyles from './style/newReportStyles';
import templateScreenStyles from './style/templateScreenStyles';

// "export" necessary in order to test component without Redux store
export class NewReportScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUnsaved       : true,
            isLoading       : true,
            number          : '',
            isEditable      : false,
            dataFieldsByID  : null,
        };
    }

    componentWillMount() {
        // BackHandler for detecting hardware button presses for back navigation (Android only)
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    componentWillUnmount() {
        // Removes the BackHandler EventListener when unmounting
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    //TODO currently this method does not get called (only the code in AppNavigation)
    handleBack = () => {
        if (this.state.isUnsaved) { // TODO: In the future the alert should only be displayed if the report is unsaved.
            return true; // This will prevent the regular handling of the back button
        }
        Alert.alert(
            'You have unsaved changes',
            'Are you sure you want to leave without saving?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel pressed'), style: 'cancel' },
                { text: 'No', onPress: () => console.log('No Pressed') },
                { text: 'Yes', onPress: () => {
                    console.log('Yes Pressed');
                    this.props.dispatch(emptyFields());
                    this.props.navigation.dispatch(NavigationActions.back()); }
                },
            ],
            { cancelable: false }
        );
        return true; // TODO: Currently always displays the alert, only pressing Yes allows navigating back.
    };

    componentDidMount() {
        this.getFieldsByTemplateID(this.props.templateID);
        this.setState({ isEditable: this.props.navigation.state.params.isEditable });
    }

    // set the value of yes/no field(s) to '0' (No)
    setDefaultValue = () => {
        this.state.dataFieldsByID.map((field) => {
            this.props.dispatch(insertFieldAnswer(field, field.defaultValue));
        });
    };

    getFieldsByTemplateID = (templateID) => {
        fetchFieldsByTemplateID(this.props.username, templateID, this.props.token)
            .then(responseJson => {
                this.setState({ dataFieldsByID: responseJson, isLoading: false });
            })
            .then(() => {
                if (this.state.dataFieldsByID) this.setDefaultValue(this.state.dataFieldsByID);
            })
            .catch(error => console.error(error) )
            .done();
    };

    // save report locally in asyncstorage
    save = () => {
        const { templateID, username, reports, answers } = this.props;

        const report = {
            templateID: templateID,
            userID: 1,      //TODO what to do with userID, orderNo, and id in the future...?
            orderNo: null,
            title: this.props.title || 'Draft',
            dateCreated: null,
            dateAccepted: null,
            id: 0
        };

        //TODO problems when you create several drafts from the same template
        //Check if there already is a report of the same templateID
        if (reports[templateID][0].id === 0) {
            Alert.alert('You can not create more than one draft per template!');
            return;
        }

        saveAnswers(username, templateID, report.id, Object.values(answers));  // save answers (objects) in an array
        saveReport(username, templateID, report);
        this.props.dispatch(storeSavedReportsByTemplateID(templateID, report)); // store drafts together with other reports in reports state
        //this.setState=({ isUnsaved: false });

        Alert.alert('Report saved!');

        this.props.dispatch(emptyFields());             // return newReport state to its initial state
        this.props.navigation.state.params.refresh();   // update templateScreen
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
        const { answers } = this.props;
        const renderedFields = this.state.dataFieldsByID.map((field, index) => {
            console.log('field', field)
            console.log('answers', answers)

            switch (field.typeID) {

                case 1: // Name
                    return (
                        <View key={index}>
                            <Text style={ newReportStyles.textStyleClass }>Name</Text>
                            <TextInput
                                editable={isEditable}
                                placeholder={field.defaultValue}
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text))}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInputStyleClass}
                            />
                        </View>
                    );

                case 2: // Checkbox
                    return (
                        <Checkbox
                            key={index}
                            style={ newReportStyles.checkboxStyle }
                            title={'This is a nice checkbox'}
                            editable={isEditable}
                            //The ability to dispatch the checkbox status is passed on to the component
                            //as a prop, and the component itself can call this function in its
                            //onIconPress, i.e. when the checkbox is pressed
                            onIconPressFunction={(answer) => this.props.dispatch(insertFieldAnswer(field, answer))}
                        />
                    );

                case 3: // Dropdown
                    return (
                        <View key={index} style={newReportStyles.mainDropdownStyleClass}>
                            <ModalDropdown
                                disabled={!isEditable}
                                options={['option 1', 'option 2']}
                                dropdownStyle={ newReportStyles.dropStyleClass }

                                renderRow={ () =>
                                    <View>
                                        <ModalDropdown
                                            options={['option 3', 'option 4']}
                                            style={ newReportStyles.lowerDropdownStyleClass }
                                            dropdownStyle={ newReportStyles.dropStyleClass }
                                        />
                                    </View>
                                }
                            />
                            <Icon name={'arrow-drop-down'} type={'MaterialIcons'} iconStyle={ newReportStyles.dropIconStyle }/>
                        </View>

                    );

                case 4: // TextRow (One row text field)
                    return (
                        <View key={index}>
                            <Text style={ newReportStyles.textStyleClass }>Text Field</Text>
                            <TextInput
                                editable={isEditable}
                                placeholder={field.defaultValue}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInputStyleClass}
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text))}
                            />
                        </View>
                    );

                case 5: // Choice (Yes/No)
                    return (
                        <RadioForm
                            key={index}
                            disabled={!isEditable}
                            radio_props={ [
                                { label: 'No', value: 0 },
                                { label: 'Yes', value: 1 }
                            ] }
                            initial={JSON.parse(field.defaultValue)}
                            onPress={() => this.props.dispatch(insertFieldAnswer(field, '1'))}
                            buttonColor={'#9dcbe5'}
                            labelStyle={ { paddingRight: 12, paddingLeft: 6 } }
                            formHorizontal={true}
                        />
                    );

                case 6: // Calendar
                    return (
                        <View key={index} >
                            <Text style={ newReportStyles.textStyleClass }>Date</Text>
                            <DatePicker
                                disabled={!isEditable}
                                style={ newReportStyles.dateStyleClass }
                                customStyles={{
                                    dateInput: {
                                        borderColor: '#e0e8eb',
                                        backgroundColor: '#e0e8eb',
                                        borderRadius: 5,
                                    },
                                }}
                                date={answers[field.orderNumber] ? answers[field.orderNumber].answer : field.defaultValue}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="2018-05-01"
                                maxDate="2018-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                iconComponent={<Icon name={'event'} type={'MaterialIcons'} iconStyle={ newReportStyles.dateIconStyle }/>}
                                onDateChange={(date) => this.props.dispatch(insertFieldAnswer(field, date))}
                            />
                        </View>
                    );

                case 7: // Instruction
                    return (
                        <View key={index} >
                            <Text style = { newReportStyles.textStyleClass }>Instructions</Text>
                            <Text
                                style = { newReportStyles.multilinedTextInputStyleClass }>
                                {field.defaultValue}
                            </Text>
                        </View>
                    );

                case 8: // Text (Multiple row text field)
                    return (
                        <View key={index}>
                            <Text style = { newReportStyles.textStyleClass }>Description</Text>
                            <TextInput
                                editable = {isEditable}
                                style = { newReportStyles.multilinedTextInputStyleClass }
                                onChangeText = {(text) => this.props.dispatch(insertFieldAnswer(field, text))}
                                placeholder = {field.defaultValue}
                                multiline = {true}
                            />
                        </View>
                    );

                case 9: // Time
                    return (
                        <View key={index}>
                            <Text style = { newReportStyles.textStyleClass }>Time</Text>
                            <DatePicker
                                disabled = {!isEditable}
                                style = { newReportStyles.dateStyleClass }
                                customStyles = {{
                                    dateInput: {
                                        borderColor: '#e0e8eb',
                                        backgroundColor: '#e0e8eb',
                                        borderRadius: 5,
                                    }
                                }}
                                date = {answers[field.orderNumber] ? answers[field.orderNumber].answer : field.defaultValue}
                                mode = "time"
                                format = "HH:mm"
                                confirmBtnText = "Confirm"
                                cancelBtnText = "Cancel"
                                minuteInterval = {10}
                                iconComponent = {<Icon name={'schedule'} type={'MaterialIcons'} iconStyle={ newReportStyles.dateIconStyle }/>}
                                onDateChange = {(time) => this.props.dispatch(insertFieldAnswer(field, time))}
                            />
                        </View>
                    );

                case 10: // Digits (Text input that only accepts numeric characters)
                    return (
                        <View key={index}>
                            <Text style={ newReportStyles.textStyleClass }>Numerical Field</Text>
                            <TextInput
                                editable={isEditable}
                                style={ newReportStyles.textInputStyleClass }
                                placeholder={field.defaultValue}
                                keyboardType = 'numeric'
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text))}
                            />
                        </View>
                    );

                case 11: // Link
                    return (
                        <View key={index} style={{ flexDirection: 'row' }}>
                            <Icon name={'link'} type={'feather'} iconStyle={ newReportStyles.linkIconStyle }/>
                            <Text
                                style={ newReportStyles.linkStyleClass }
                                onPress={() => Linking.openURL(field.defaultValue)}>
                                Link to somewhere
                            </Text>
                        </View>
                    );

                case 12: // User dropdown
                    return (
                        <View key={index} style={ newReportStyles.mainDropdownStyleClass } onPress={() => this.modalDropdown.show() }>
                            <ModalDropdown
                                ref={ ModalDrop => this.modalDropdown = ModalDrop }
                                dropdownStyle={ newReportStyles.dropStyleClass }
                                disabled={!isEditable}
                                options={field.defaultValue.split(',')}/>
                            <Icon name={'arrow-drop-down'} type={'MaterialIcons'} iconStyle={ newReportStyles.dropIconStyle }/>
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
                            <TextInput
                                editable={isEditable}
                                placeholder={'INSERT TITLE'}
                                onChangeText={(text) => this.props.dispatch(insertTitle(text))}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInputStyleClass}
                            />
                            {renderedFields}
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


// maps redux state to component props. Object that is returned can be accessed via 'this.props' e.g. this.props.email
const mapStateToProps = (state) => {
    const token         = state.user.token;
    const username      = state.user.username;
    const templateID    = state.newReport.templateID;
    const title         = state.newReport.title;
    const number        = state.newReport.number;
    const answers       = state.newReport.answers;
    const reports       = state.reports;
    return {
        username,
        templateID,
        title,
        number,
        token,
        reports,
        answers
    };
};

export default connect(mapStateToProps)(NewReportScreen);

import React from 'react';
import { Button, View, ScrollView, TextInput, Alert, Text, ActivityIndicator, Linking } from 'react-native';
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
            isEditable      : true,
            dataFieldsByID  : null,
        };
    }

    componentDidMount() {
        this.getFieldsByReportID();
    }

    getFieldsByReportID = () => {
        const { templateID, reportID } = this.props.navigation.state.params;
        const { reports } = this.props;

        const report = reports[templateID].find((obj) => obj.id === reportID);
        const fieldAnswers = report.answers;
        fieldAnswers.map((field) => this.props.dispatch(insertFieldAnswer(field, field.answer)));

        this.setState({ report: report });
        this.setState({ dataFieldsByID: fieldAnswers, isLoading: false });
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
        const renderedFields = (!this.state.dataFieldsByID) ? null : this.state.dataFieldsByID.map((field, index) => {

            switch (field.fieldID) {

                case 1: // Name
                    return (
                        <View key={index}>
                            <Text style={ newReportStyles.textStyleClass }>Name</Text>
                            <TextInput
                                editable={isEditable}
                                defaultValue={field.answer}
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
                            //The answer is saved as '1' or '0' but the component expects a boolean
                            isChecked={field.answer === '1'}
                            //The ability to dispatch the checkbox status is passed on to the component
                            //as a prop, and the component itself can call this function in its
                            //onPress, i.e. when the checkbox is pressed
                            onPressFunction={(answer) => this.props.dispatch(insertFieldAnswer(field, answer))}
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
                                defaultValue={field.answer}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInputStyleClass}
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text))}
                            />
                        </View>
                    );

                case 5: // Choice (Yes/No)
                    //TODO: get title from database
                    return (
                        <View key={index}>
                            <Text style={newReportStyles.textStyleClass}>Radio form</Text>
                            <RadioForm
                                key={index}
                                disabled={!isEditable}
                                radio_props={ [
                                    { label: 'No', value: 0 },
                                    { label: 'Yes', value: 1 }
                                ] }
                                initial={JSON.parse(field.answer)}
                                onPress={(value) => this.props.dispatch(insertFieldAnswer(field, value))}
                                buttonColor={'#9dcbe5'}
                                labelStyle={ { paddingRight: 12, paddingLeft: 6 } }
                                formHorizontal={true}
                            />
                        </View>
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
                                minDate="2018-01-01"
                                maxDate="2018-12-31"
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
                                {field.answer}
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
                                placeholder = {field.answer}
                                defaultValue={field.answer}
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
                                defaultValue={field.answer}
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
                                onPress={() => Linking.openURL(field.answer)}>
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
                                options={field.answer.split(',')}/>
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
    return {
        username,
        number,
        token,
        reports,
        answers
    };
};

export default connect(mapStateToProps)(ReportScreen);

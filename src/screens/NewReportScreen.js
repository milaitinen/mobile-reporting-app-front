import React from 'react';
import { View, ScrollView, TextInput, Alert, Text, ActivityIndicator, Linking } from 'react-native';
import { NavigationActions } from 'react-navigation';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import ModalDropdown from 'react-native-modal-dropdown';
import moment from 'moment';
import { connect } from 'react-redux';

import { AppBackground } from '../components/AppBackground';
import { createNewReport, fetchFieldsByID } from './api';
import newReportStyles from './style/newReportStyles';
import templateScreenStyles from './style/templateScreenStyles';
import { strings } from '../locales/i18n';
import { insertTitle } from '../redux/actions/newReport';

// "export" necessary in order to test component without Redux store
export class NewReportScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading      : true,
            number         : '',
        };
    }

    componentDidMount() {
        this.getFieldsByID(this.props.templateID);
    }

    getFieldsByID = (ID) => {
        fetchFieldsByID(ID)
            .then(responseJson => {
                this.setState({ dataFieldsByID: responseJson, isLoading: false });
            })
            .catch(error => console.error(error) )
            .done();
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

        createNewReport(this.props.userID, report).then(response => {
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
                        color={'#88daf2'}
                    />
                </AppBackground>
            );
        }

        const { isEditable } = this.props;
        const renderedFields = this.state.dataFieldsByID.map((field, index) => {
            switch (field.typeID) {
                case 1: // Name
                    return (
                        <TextInput
                            key={index}
                            editable={isEditable}
                            placeholder={field.defaultValue}
                            onSubmitEditing={(event) => this.props.dispatch(insertTitle(event.nativeEvent.text))}
                            underlineColorAndroid='transparent'
                            style={newReportStyles.TextInputStyleClass}
                        />
                    );
                case 2: // Checkbox
                    return (
                        <CheckBox
                            key={index}
                            disabled={!isEditable}
                            onClick={()=>console.log('L0L0L0L0L0L0L')}
                            isChecked={ (field.defaultValue !== '0') }
                            leftText={ 'This is a nice checkbox' }
                        />
                    );
                case 3: // Dropdown
                    return (
                        <ModalDropdown
                            key={index}
                            disabled={!isEditable}
                            options={['option 1', 'option 2']}
                            renderRow={() =>
                                <View>
                                    <ModalDropdown
                                        options={['option 3', 'option 4']}>
                                    </ModalDropdown>
                                </View>
                            }
                        />
                    );
                case 4: // TextRow (One row text field)
                    return (
                        <TextInput
                            key={index}
                            editable={isEditable}
                            placeholder={field.defaultValue}
                            underlineColorAndroid='transparent'
                            style={newReportStyles.TextInputStyleClass}
                        />
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
                            onPress={(value) => { this.setState({ value: value }); }}
                            buttonColor={'#50C900'}
                            formHorizontal={true}
                        />
                    );
                case 6: // Calendar
                    return (
                        <DatePicker
                            key={index}
                            disabled={!isEditable}
                            style={{ width: 200 }}
                            date={field.defaultValue}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2018-05-01"
                            maxDate="2018-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => {this.setState({ date: date });}}
                        />
                    );
                case 7: // Instruction
                    return (
                        <Text
                            key={index} >
                            {field.defaultValue}
                        </Text>
                    );
                case 8: // Text (Multiple row text field)
                    return (
                        <TextInput
                            key={index}
                            editable={isEditable}
                            placeholder={field.defaultValue}
                            multiline={true}
                        />
                    );
                case 9: // Time
                    return (
                        <DatePicker
                            key={index}
                            disabled={!isEditable}
                            style={{ width: 200 }}
                            date={field.defaultValue}
                            mode="time"
                            format="HH:mm"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            minuteInterval={10}
                            onDateChange={(time) => {this.setState({ time: time });}}
                        />
                    );
                case 10: // Digits (Text input that only accepts numeric characters)
                    return (
                        <TextInput
                            key={index}
                            editable={isEditable}
                            placeholder={field.defaultValue}
                            keyboardType = 'numeric'
                            onSubmitEditing= {(text)=> this.onChanged(text)}
                            value = {this.state.number}
                        />
                    );
                case 11: // Link
                    return (
                        <Text
                            key={index}
                            style={{ color: 'blue' }}
                            onPress={() => Linking.openURL(field.defaultValue)}>
                            Link to somewhere
                        </Text>
                    );
                case 12: // User dropdown
                    return (
                        <ModalDropdown
                            key={index}
                            disabled={!isEditable}
                            options={JSON.parse(field.defaultValue)}
                        />
                    );
                default:
                    return (
                        null
                    );

            }
        });

        return (
            <View style={newReportStyles.MainContainer}>
                <ScrollView keyboardShouldPersistTaps={'handled'} >
                    {renderedFields}
                </ScrollView>
            </View>
            /*
                <TextInput
                    placeholder={ strings('createNew.enterNew') }
                    onChangeText={(TextInputName) => this.setState({ TextInputName })}
                    underlineColorAndroid='transparent'
                    style={newReportStyles.TextInputStyleClass}
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
    const isEditable = state.newReport.isEditable;
    const templateID = state.newReport.templateID;
    const title = state.newReport.title;
    const number = state.newReport.number;
    return {
        userID,
        isEditable,
        templateID,
        title,
        number
    };
};

export default connect(mapStateToProps)(NewReportScreen);
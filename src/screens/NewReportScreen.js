import React from 'react';
import { View, ScrollView, TextInput, Alert, Button, Text, ActivityIndicator, Linking } from 'react-native';
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
import { insertEmail, insertPassword, insertServerUrl } from '../redux/actions/user';


class NewReportScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditable     : this.props.navigation.state.params.isEditable,
            isLoading      : true,
            TextInputName  : '',                                              // Text input is initialized as an empty string.
            templateID     : this.props.navigation.state.params.templateID,    /* TemplateID that is inherited from navigation parameters
                                                                                 as stated in TemplateScreen class. */
            number         : '',
        };
        console.log(this.state.isEditable + 'isEditable');
    }

    componentDidMount() {
        this.getFieldsByID();
    }

    getFieldsByID = () => {
        fetchFieldsByID(this.state.templateID)
            .then(responseJson => this.setState({ dataFieldsByID: responseJson, isLoading: false }))
            .then(() => console.log(this.state.dataFieldsByID))
            .catch(error => console.error(error) )
            .done();
    };

    // Inserts data to server with a post method.
    send = () => {
        const report = {
            templateID: this.state.templateID,
            title: this.state.TextInputName,
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

        // hardcoded templateID
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

    onChanged(text) {
        let newText = '';
        const numbers = '0123456789';

        for (let i=0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                alert('Please enter numbers only');
            }
        }
        this.setState({ number: newText });
    }



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

        const renderedFields = this.state.dataFieldsByID.map((field, index) => {
            switch (field.typeID) {
                case 1: // Name
                    return (
                        <TextInput
                            key={index}
                            editable={this.state.isEditable}
                            placeholder={field.defaultValue}
                            onSubmitEditing={(TextInputName) => this.setState({ TextInputName })}
                            underlineColorAndroid='transparent'
                            style={newReportStyles.TextInputStyleClass}
                        />
                    );
                case 2: // Checkbox
                    return (
                        <CheckBox
                            key={index}
                            disabled={!this.state.isEditable}
                            onClick={()=>console.log('L0L0L0L0L0L0L')}
                            isChecked={ (field.defaultValue === '0') ? false : true }
                            leftText={ 'This is a nice checkbox' }
                        />
                    );
                case 3: // Dropdown
                    return (
                        <ModalDropdown
                            key={index}
                            disabled={!this.state.isEditable}
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
                            editable={this.state.isEditable}
                            placeholder={field.defaultValue}
                            underlineColorAndroid='transparent'
                            style={newReportStyles.TextInputStyleClass}
                        />
                    );
                case 5: // Choice (Yes/No)
                    return (
                        <RadioForm
                            key={index}
                            disabled={!this.state.isEditable}
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
                            disabled={!this.state.isEditable}
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
                            editable={this.state.isEditable}
                            placeholder={field.defaultValue}
                            multiline={true}
                        />
                    );
                case 9: // Time
                    return (
                        <DatePicker
                            key={index}
                            disabled={!this.state.isEditable}
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
                            editable={this.state.isEditable}
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
                            disabled={!this.state.isEditable}
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
    return {
        userID
    };
};

export default connect(mapStateToProps)(NewReportScreen);
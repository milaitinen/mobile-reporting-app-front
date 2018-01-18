import React from 'react';
import { View, ScrollView, TextInput, Alert, Button, Text, ActivityIndicator, Linking } from 'react-native';
import { NavigationActions } from 'react-navigation';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { AppBackground } from '../components/AppBackground';
import { createNewReport, fetchFieldsByID } from './api';
import newReportStyles from './style/newReportStyles';
import templateScreenStyles from './style/templateScreenStyles';

export default class NewReportScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditable     : this.props.navigation.state.params.isEditable,
            isLoading      : true,
            TextInputName  : '',                                              // Text input is initialized as an empty string.
            templateID     : this.props.navigation.state.params.templateID,    /* TemplateID that is inherited from navigation parameters
                                                                                 as stated in TemplateScreen class. */
            number         : '',
            date           : moment().format('YYYY-MM-DD'),
            time           : '20:00'
        };
        console.log(this.state.isEditable + 'isEditable');
    }

    componentDidMount() {
        this.getFieldsByID();
    }


    getFieldsByID = () => {
        fetchFieldsByID(this.state.templateID)
            .then(responseJson =>
                this.setState({ dataFieldsByID: responseJson, isLoading: false }))
            .then(() => console.log(this.state.dataFieldsByID))
            .catch(error => console.error(error) )
            .done();
    }

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
        createNewReport(1, report).then(response => {
            if (response.status === 200) {
                this.props.navigation.state.params.refresh();
                this.props.navigation.dispatch(NavigationActions.back());
                return 'Report added';
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
                            editable={this.state.isEditable}
                            key={index}
                            placeholder={field.defaultValue}
                            onChangeText={(TextInputName) => this.setState({ TextInputName })}
                            underlineColorAndroid='transparent'
                            style={newReportStyles.TextInputStyleClass}
                        />
                    );

                case 2: // Checkbox

                    return (
                        <CheckBox
                            disabled={!this.state.isEditable}
                            key={index}
                            onClick={()=>console.log('L0L0L0L0L0L0L')}
                            isChecked={ (field.defaultValue === '0') ? false : true }
                            leftText={ 'This is a nice checkbox' }
                        />
                    );

                /*
                TODO: Dropdown here
                case 3: // Dropdown
                    ...
                */

                case 4: // TextRow (One row text field)

                    return (
                        <TextInput
                            editable={this.state.isEditable}
                            key={index}
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
                            date={this.state.date}
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
                            date={this.state.time}
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
                            onChangeText = {(text)=> this.onChanged(text)}
                            value = {this.state.number}
                        />
                    );

                case 11: // Link

                    return (
                        <Text
                            key={index}
                            style={{ color: 'blue' }}
                            onPress={() => Linking.openURL('http://google.com')}>
                            Link to Google
                        </Text>
                    );

                /*
                TODO: User dropdown here
                case 12: // User dropdown
                    ...
                */

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
                editable={this.state.isEditable}
                placeholder='Create new report'
                onChangeText={(TextInputName) => this.setState({ TextInputName })}
                underlineColorAndroid='transparent'
                style={newReportStyles.TextInputStyleClass}
            />
            <Button
                disabled={!this.state.isEditable}
                onPress={ this.send }
                title={'Create new report'}
            >
            </Button>
            */
        );
    }
}


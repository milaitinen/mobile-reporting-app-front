import React from 'react';
import { View, ScrollView, TextInput, Alert, Text, ActivityIndicator, Linking,  Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import ModalDropdown from 'react-native-modal-dropdown';
import moment from 'moment';
import { connect } from 'react-redux';
import { Checkbox } from '../components/Checkbox';

import { AppBackground } from '../components/AppBackground';
import { createNewReport, fetchFieldsByID } from './api';
import { strings } from '../locales/i18n';
import { insertTitle } from '../redux/actions/newReport';

import newReportStyles from './style/newReportStyles';
import templateScreenStyles from './style/templateScreenStyles';

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
                        color={'#9dcbe5'}
                    />
                </AppBackground>
            );
        }

        const { isEditable } = this.props;
        const renderedFields = this.state.dataFieldsByID.map((field, index) => {
            switch (field.typeID) {

                case 1: // Name
                    return (
                        <View key={index}>
                            <Text style={ newReportStyles.textStyleClass }>Name</Text>
                            <TextInput
                                key={index}
                                editable={isEditable}
                                placeholder={field.defaultValue}
                                onSubmitEditing={(event) => this.props.dispatch(insertTitle(event.nativeEvent.text))}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInputStyleClass}
                            />
                        </View>
                    );

                case 2: // Checkbox
                    return (
                        <Checkbox
                            key={index}
                            title={'This is a nice checkbox'}
                            editable={isEditable}
                        />
                    );

                case 3: // Dropdown
                    return (
                        <View key={index}>
                            <ModalDropdown
                                key={index}
                                disabled={!isEditable}
                                options={['option 1', 'option 2']}
                                style={ newReportStyles.mainDropdownStyleClass }
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
                            >
                                <Icon name={'arrow-down'} type={'feather'} iconStyle={ newReportStyles.dropIconStyle }/>
                            </ModalDropdown>
                        </View>

                    );

                case 4: // TextRow (One row text field)
                    return (
                        <View key={index}>
                            <Text style={ newReportStyles.textStyleClass }>Text Field</Text>
                            <TextInput
                                key={index}
                                editable={isEditable}
                                placeholder={field.defaultValue}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInputStyleClass}
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
                            onPress={(value) => { this.setState({ value: value }); }}
                            buttonColor={'#9dcbe5'}
                            labelStyle={ { paddingRight: 12, paddingLeft: 6 } }
                            formHorizontal={true}
                        />
                    );

                case 6: // Calendar
                    return (
                        <View key={index}>
                            <Text style={ newReportStyles.textStyleClass }>Date</Text>
                            <DatePicker
                                disabled={!isEditable}
                                style={ newReportStyles.dateStyleClass }
                                customStyles={{
                                    dateInput: {
                                        borderWidth:0,
                                    }
                                }}
                                date={field.defaultValue}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="2018-05-01"
                                maxDate="2018-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                iconComponent={<Icon name={'event'} type={'MaterialIcons'} iconStyle={ newReportStyles.dateIconStyle }/>}
                                onDateChange={(date) => {this.setState({ date: date });}}
                            />
                        </View>
                    );

                case 7: // Instruction
                    return (
                        <Text
                            style = { newReportStyles.textStyleClass }
                            key={index} >
                            Instructions{'\n'}
                            {field.defaultValue}
                        </Text>
                    );

                case 8: // Text (Multiple row text field)
                    return (
                        <View key={index}>
                            <Text style={ newReportStyles.textStyleClass }>Description</Text>
                            <TextInput
                                key={index}
                                editable={isEditable}
                                style = { newReportStyles.multilinedTextInputStyleClass }
                                placeholder={field.defaultValue}
                                multiline={true}
                            />
                        </View>
                    );

                case 9: // Time
                    return (
                        <View key={index}>
                            <Text style={ newReportStyles.textStyleClass }>Time</Text>
                            <DatePicker
                                key={index}
                                disabled={!isEditable}
                                style={ newReportStyles.dateStyleClass }
                                customStyles={{
                                    dateInput: {
                                        borderWidth:0,
                                    }
                                }}
                                date={field.defaultValue}
                                mode="time"
                                format="HH:mm"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                minuteInterval={10}
                                iconComponent={<Icon name={'schedule'} type={'MaterialIcons'} iconStyle={ newReportStyles.dateIconStyle }/>}
                                onDateChange={(time) => {this.setState({ time: time });}}
                            />
                        </View>
                    );

                case 10: // Digits (Text input that only accepts numeric characters)
                    return (
                        <View key={index}>
                            <Text style={ newReportStyles.textStyleClass }>Numerical Field</Text>
                            <TextInput
                                key={index}
                                editable={isEditable}
                                style={ newReportStyles.textInputStyleClass }
                                placeholder={field.defaultValue}
                                keyboardType = 'numeric'
                                onChangeText={(text)=> this.onChanged(text)}
                                value = {this.state.number}
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
                        <ModalDropdown
                            key={index}
                            style={ newReportStyles.mainDropdownStyleClass }
                            dropdownStyle={ newReportStyles.dropStyleClass }
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
            <AppBackground>
                <View style={ newReportStyles.ViewContainer }>
                    <ScrollView keyboardShouldPersistTaps={'handled'} style={ newReportStyles.ReportContainer } >
                        {renderedFields}
                    </ScrollView>
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
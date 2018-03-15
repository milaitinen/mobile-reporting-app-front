import React from 'react';
import { View, ScrollView, TextInput, Text, ActivityIndicator, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import { Checkbox } from '../components/Checkbox';
import { Dropdown } from '../components/Dropdown';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import ModalDropdown from 'react-native-modal-dropdown';
import { connect } from 'react-redux';
//import moment from 'moment';

import { AppBackground } from '../components/AppBackground';
import { EditButton } from '../components/EditButton';
import { strings } from '../locales/i18n';
import { insertTitle } from '../redux/actions/preview';

import newReportStyles from './style/newReportStyles';
import templateScreenStyles from './style/templateScreenStyles';
import styles from '../components/Dropdown/styles';

export class PreviewScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading   : true,
            isEditable  : false,
            number      : '',
        };
    }

    componentDidMount() {
        const { templates, templateID } = this.props;
        this.getTemplateFields(templates, templateID);
    }

    getTemplateFields = (templates, templateID) => {
        const isEditable = this.props.navigation.state.params.isEditable;
        const fields = templates[templateID] ? templates[templateID].fields : [];

        this.setState({ fields: fields, isEditable: isEditable, isLoading: false });
    };


    handleOnPress = () => {
        this.props.navigation.navigate('NewReport', {
            templateID: this.props.templateID,
            refresh: this.props.navigation.state.params.refresh,
            isEditable: true
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
            switch (field.type) {

                case 'NAME': // Name
                    return (
                        <View key={index}>
                            <Text style={newReportStyles.textStyleClass}>{field.title}</Text>
                            <TextInput
                                editable={isEditable}
                                placeholder={field.default_value}
                                placeholderTextColor={'#adadad'}
                                onSubmitEditing={(event) => this.props.dispatch(insertTitle(event.nativeEvent.text))}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInputStyleClass}
                            />
                        </View>
                    );

                case 'CHECKBOX': // Checkbox
                    return (
                        <View key={index}>
                            <Text style={newReportStyles.textStyleClass}>{field.title}</Text>
                            <Checkbox
                                key={index}
                                style={ newReportStyles.checkboxStyle }
                                title={'This is a nice checkbox'}
                                editable={isEditable}
                            />
                        </View>
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
                                                buttonColor={'#8cc9e5'}
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
                                        borderColor: '#adadad',
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
                                minDate="2018-05-01"
                                maxDate="2018-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                /*iconComponent={<Icon name={'event'} type={'MaterialIcons'} iconStyle={ newReportStyles.dateIconStyle }/>}*/
                                onDateChange={(date) => {this.setState({ date: date });}}
                            />
                        </View>
                    );

                case 'INSTRUCTIONS': // Instructions
                    return (
                        <View key={index}>
                            <Text style={ newReportStyles.textStyleClass }>{field.title}</Text>
                            <Text
                                style = {newReportStyles.instructions}>
                                {field.default_value}
                            </Text>
                        </View>
                    );

                case 'TEXTFIELD_LONG': // Text (Multiple row text field)
                    return (
                        <View key={index}>
                            <Text style={ newReportStyles.textStyleClass }>{field.title}</Text>
                            <TextInput
                                editable={isEditable}
                                style = {newReportStyles.multilinedTextInputStyleClass}
                                placeholder={field.default_value}
                                placeholderTextColor={'#adadad'}
                                multiline={true}
                            />
                        </View>
                    );

                case 'TIME': // Time
                    return (
                        <View key={index}>
                            <Text style={ newReportStyles.textStyleClass }>{field.title}</Text>
                            <DatePicker
                                disabled={!isEditable}
                                style={ newReportStyles.dateStyleClass }
                                customStyles={{
                                    dateInput: {
                                        borderColor: '#adadad',
                                        borderWidth: 1.5,
                                        borderRadius: 5,
                                        backgroundColor: 'white',
                                    },
                                    dateText: {
                                        color: '#adadad',
                                    }
                                }}
                                date={field.default_value}
                                mode="time"
                                format="HH:mm"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                minuteInterval={10}
                                iconComponent={<Icon name={'clock'} type={'entypo'} iconStyle={ newReportStyles.dateIconStyle }/>}
                                onDateChange={(time) => {this.setState({ time: time });}}
                            />
                        </View>
                    );

                case 'NUMBERFIELD': // Digits (Text input that only accepts numeric characters)
                    return (
                        <View key={index}>
                            <Text style={ newReportStyles.textStyleClass }>{field.title}</Text>
                            <TextInput
                                editable={isEditable}
                                style={newReportStyles.textInputStyleClass}
                                placeholder={field.default_value}
                                placeholderTextColor={'#adadad'}
                                keyboardType = 'numeric'
                                onChangeText={(text)=> this.onChanged(text)}
                                value = {this.state.number}
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

        return (
            <AppBackground style={'no-padding'}>
                <View style={ newReportStyles.ViewContainer }>
                    <View style={ newReportStyles.ReportContainer }>
                        <ScrollView keyboardShouldPersistTaps={'handled'} style={ newReportStyles.ReportScrollView }>
                            <View style={newReportStyles.titleContainer}>
                                <Icon name={'assignment'} color={'#a0a0a0'} size={45}/>
                                <Text style={newReportStyles.title}>{strings('templates.report')}</Text>
                                <Icon name={'find-in-page'} color={'#88c9e5'} size={45} containerStyle={newReportStyles.previewIconContainer}/>
                            </View>
                            <View style={newReportStyles.fieldContainer}>
                                {renderedFields}
                            </View>
                        </ScrollView>
                        <EditButton onPress={() => this.handleOnPress()} />
                    </View>
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
    const templateID = state.preview.templateID;
    const templates = state.templates;
    const title = state.preview.title;
    const number = state.preview.number;
    const token = state.user.token;
    const username = state.user.username;
    return {
        userID,
        templateID,
        templates,
        title,
        number,
        token,
        username
    };
};

export default connect(mapStateToProps)(PreviewScreen);

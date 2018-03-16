import React from 'react';
import { View, ScrollView, TextInput, Alert, Text, ActivityIndicator, Linking } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import moment from 'moment';
import { connect } from 'react-redux';
import { Checkbox } from '../components/Checkbox';
import { Radioform } from '../components/Radioform';
import { Dropdown } from '../components/Dropdown';
import { Button } from '../components/Button';
import { Datepicker } from '../components/Datepicker';
import { AppBackground } from '../components/AppBackground';
import { createNewReport, removeDraft, saveDraft } from './api';
import { strings } from '../locales/i18n';
import { insertFieldAnswer, emptyFields } from '../redux/actions/newReport';

import newReportStyles from './style/newReportStyles';
import templateScreenStyles from './style/templateScreenStyles';
import styles from '../components/Dropdown/styles';
import EStyleSheet from 'react-native-extended-stylesheet';


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

                case 1: // Name TODO: all titles from db
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={newReportStyles.text}>Nimikenttä</Text>
                            <TextInput
                                editable={isEditable}
                                defaultValue={field.answer}
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text))}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInput}
                            />
                        </View>
                    );

                case 2: // Checkbox
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={newReportStyles.text}>Checkbox</Text>
                            <Checkbox
                                key={index}
                                title={'This is a nice checkbox'}
                                editable={isEditable}
                                //The answer is saved as '1' or '0' but the component expects a boolean
                                isChecked={field.answer === '1'}
                                //The ability to dispatch the checkbox status is passed on to the component
                                //as a prop, and the component itself can call this function in its
                                //onPress, i.e. when the checkbox is pressed
                                onPressFunction={(answer) => this.props.dispatch(insertFieldAnswer(field, answer))}
                            />
                        </View>
                    );

                case 3: // Dropdown
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={ newReportStyles.text }>Dropdown</Text>
                            <ModalDropdown
                                disabled={!isEditable}
                                options={['option 1', 'option 2']}
                                dropdownStyle={styles.dropStyleClass}
                                style={styles.dropdownButton}
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
                        </View>

                    );

                case 4: // TextRow (One row text field)
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={newReportStyles.text}>1-rivinen teksti</Text>
                            <TextInput
                                editable={isEditable}
                                defaultValue={field.answer}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInput}
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text))}
                            />
                        </View>
                    );

                case 5: // Choice (Yes/No)
                    return (
                        <View key={index} style={newReportStyles.altFieldContainer}>
                            <Text style={newReportStyles.text}>Valintalaatikko (Kyllä/Ei)</Text>
                            <Radioform
                                options={[{ label: 'Yes', value: 0 }, { label: 'No', value: 1 }]}
                                editable={isEditable}
                                initial={JSON.parse(field.answer)}
                                onPress={(value) => this.props.dispatch(insertFieldAnswer(field, value))}
                            />
                        </View>
                    );

                case 6: // Calendar
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={newReportStyles.text}>Kalenteri</Text>
                            <Datepicker
                                editable={isEditable}
                                mode={'date'}
                                answer={answers[field.orderNumber] ? answers[field.orderNumber].answer : field.defaultValue}
                                onDateChange={(date) => this.props.dispatch(insertFieldAnswer(field, date))}
                            />
                        </View>
                    );

                case 7: // Instruction
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={newReportStyles.text}>Ohje</Text>
                            <Text style={newReportStyles.instructions}>
                                {field.defaultValue}
                            </Text>
                        </View>
                    );

                case 8: // Text (Multiple row text field)
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={ newReportStyles.text }>Laaja teksti</Text>
                            <TextInput
                                multiline
                                editable={isEditable}
                                style={ newReportStyles.multilineTextInput }
                                onChangeText = {(text) => this.props.dispatch(insertFieldAnswer(field, text))}
                                placeholder = {field.answer}
                                defaultValue={field.answer}
                                placeholderTextColor={EStyleSheet.value('$placeholder')}
                            />
                        </View>
                    );

                case 9: // Time
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={ newReportStyles.text }>Kellonaika</Text>
                            <Datepicker
                                editable={isEditable}
                                mode={'time'}
                                answer={answers[field.orderNumber] ? answers[field.orderNumber].answer : field.defaultValue}
                                onDateChange = {(time) => this.props.dispatch(insertFieldAnswer(field, time))}
                            />
                        </View>
                    );

                case 10: // Digits (Text input that only accepts numeric characters)
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={ newReportStyles.text }>Numerokenttä</Text>
                            <TextInput
                                editable={isEditable}
                                style={ newReportStyles.textInput }
                                defaultValue={field.answer}
                                keyboardType = 'numeric'
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text))}
                            />
                        </View>
                    );

                case 11: // Link
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={newReportStyles.text}>Linkkikenttä</Text>
                            <View style={newReportStyles.linkContainer}>
                                <Icon name={'link'} type={'feather'} iconStyle={ newReportStyles.linkIcon }/>
                                <Text
                                    disabled={!isEditable}
                                    style={ newReportStyles.link }
                                    onPress={() => Linking.openURL(field.answer)}>
                                    Link to somewhere
                                </Text>
                            </View>
                        </View>
                    );

                case 12: // User dropdown
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={ newReportStyles.text }>Käyttäjät</Text>
                            <Dropdown
                                ref={ ModalDrop => this.modalDropdown = ModalDrop }
                                disabled={!isEditable}
                                defaultValue={field.answer}
                                options={field.answer.split(',')}/>
                        </View>
                    );

                default:
                    return (
                        null
                    );

            }
        });

        return (
            <AppBackground>
                <View style={newReportStyles.ViewContainer}>
                    <ScrollView keyboardShouldPersistTaps={'handled'} style={newReportStyles.ReportScrollView}>
                        {renderedFields}
                        {
                            (this.props.navigation.state.params.reportID < 0) &&
                            <View>
                                <Button title={strings('createNew.save')} key={999} type={'save'} onPress={ () => this.save()} />
                                <Button title={strings('createNew.send')} type={'send'} onPress={() => console.log('send')}  />
                                <Button title={'Delete'} type={'delete'} onPress={() => this.deleteDraft()} />
                            </View>
                        }
                    </ScrollView>
                </View>

            </AppBackground>
            /*
                <TextInput
                    placeholder={ strings('createNew.enterNew') }
                    onChangeText={(TextInputName) => this.setState({ TextInputName })}
                    underlineColorAndroid='transparent'
                    style={newReportStyles.textInput}
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

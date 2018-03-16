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
import { HeaderBackButton, NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { Datepicker } from '../components/Datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import { Checkbox } from '../components/Checkbox';
import { Radioform } from '../components/Radioform';
import { Dropdown } from '../components/Dropdown';
import { Button } from '../components/Button';
import ModalDropdown from 'react-native-modal-dropdown';

import { AppBackground } from '../components/AppBackground';
import { createNewReport, fetchFieldsByTemplateID, saveDraft } from './api';
import { strings } from '../locales/i18n';
import { emptyFields, insertFieldAnswer } from '../redux/actions/newReport';
import { storeDraftByTemplateID } from '../redux/actions/reports';

import newReportStyles from './style/newReportStyles';
import templateScreenStyles from './style/templateScreenStyles';
import styles from '../components/Dropdown/styles';
import EStyleSheet from 'react-native-extended-stylesheet';


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
    const templateID    = state.newReport.templateID;
    const title         = state.newReport.title;
    const number        = state.newReport.number;
    const answers       = state.newReport.answers;
    const reports       = state.reports;
    const isUnsaved     = state.newReport.isUnsaved;
    const isConnected = state.connection.isConnected;
  
    return {
        username,
        templateID,
        title,
        number,
        token,
        reports,
        answers,
        isUnsaved,
        isConnected,
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
            dataFieldsByID  : null,
        };
    }

    _handleBack = () => handleBack(this.props.isUnsaved, this.props.dispatch);

    componentWillMount() {
        // BackHandler for detecting hardware button presses for back navigation (Android only)
        BackHandler.addEventListener('hardwareBackPress', this._handleBack);
    }

    componentDidMount() {
        this.getFieldsByTemplateID(this.props.templateID);
        this.setState({ isEditable: this.props.navigation.state.params.isEditable });
    }

    componentWillUnmount() {
        // Removes the BackHandler EventListener when unmounting
        BackHandler.removeEventListener('hardwareBackPress', this._handleBack);
    }


    // insert default values to the report's answer fields
    setDefaultValue = () => {
        this.state.dataFieldsByID.map((field) => {
            this.props.dispatch(insertFieldAnswer(field, field.defaultValue));
        });
    };

    getFieldsByTemplateID = (templateID) => {
        fetchFieldsByTemplateID(this.props.username, templateID, this.props.token)
            .then(responseJson => {
                console.log('fields', responseJson);
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
        const { templateID, username, answers } = this.props;

        const report = {
            answers: [],
            templateID: templateID,
            userID: 1,      // TODO what to do with userID, orderNo, and id in the future...?
            orderNo: null,
            title: this.props.title || 'Draft',
            dateCreated: moment().format('YYYY-MM-DD'),
            dateAccepted: null,
            id: null
        };

        report.answers = Object.values(answers);
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

            switch (field.typeID) { // typeID because fetchFieldsByTemplateID returns typeID (in ReportScreen typeID->fieldID)

                case 1: // Name
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={newReportStyles.text}>{field.title}</Text>
                            <TextInput
                                editable={isEditable}
                                placeholder={field.defaultValue}
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text))}
                                placeholderTextColor={EStyleSheet.value('$placeholder')}
                                selectionColor={EStyleSheet.value('$active')}
                                //Title is now set separately from this field
                                //onSubmitEditing={(event) => this.props.dispatch(insertTitle(event.nativeEvent.text))}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInput}
                            />
                        </View>
                    );

                case 2: // Checkbox
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={newReportStyles.text}>{field.title}</Text>
                            <Checkbox
                                key={index}
                                title={'This is a nice checkbox'}
                                editable={isEditable}
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
                            <Text style={ newReportStyles.text }>{field.title}</Text>
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
                        </View>

                    );

                case 4: // TextRow (One row text field)
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={newReportStyles.text}>{field.title}</Text>
                            <TextInput
                                editable={isEditable}
                                placeholder={field.defaultValue}
                                placeholderTextColor={EStyleSheet.value('$placeholder')}
                                underlineColorAndroid='transparent'
                                style={newReportStyles.textInput}
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text))}
                            />
                        </View>
                    );

                case 5: //Radio form
                    return (
                        <View key={index} style={newReportStyles.altFieldContainer}>
                            <Text style={newReportStyles.text}>{field.title}</Text>
                            <Radioform
                                options={[{ label: 'Yes', value: 0 }, { label: 'No', value: 1 }]}
                                editable={isEditable}
                                initial={JSON.parse(field.defaultValue)}
                                onPress={(value) => this.props.dispatch(insertFieldAnswer(field, value))}
                            />

                        </View>
                    );

                case 6: // Calendar
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={newReportStyles.text}>{field.title}</Text>
                            <Datepicker
                                editable={isEditable}
                                mode={'date'}
                                answer={answers[field.orderNumber] ? answers[field.orderNumber].answer : field.defaultValue}
                                onChange={(date) => this.props.dispatch(insertFieldAnswer(field, date))}
                            />
                        </View>
                    );


                case 7: // Instructions
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={newReportStyles.text}>{field.title}</Text>
                            <Text style={newReportStyles.instructions}>
                                {field.defaultValue}
                            </Text>
                        </View>
                    );

                case 8: // Text (Multiple row text field)
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={ newReportStyles.text }>{field.title}</Text>
                            <TextInput
                                multiline
                                editable={isEditable}
                                style={ newReportStyles.multilineTextInput }
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text))}
                                placeholder={field.defaultValue}
                                placeholderTextColor={EStyleSheet.value('$placeholder')}
                            />
                        </View>
                    );

                case 9: // Time
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={ newReportStyles.text }>{field.title}</Text>
                            <Datepicker
                                editable={isEditable}
                                mode={'time'}
                                answer={answers[field.orderNumber] ? answers[field.orderNumber].answer : field.defaultValue}
                                onChange={(time) => this.props.dispatch(insertFieldAnswer(field, time))}
                            />
                        </View>
                    );

                case 10: // Digits (Text input that only accepts numeric characters)
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={ newReportStyles.text }>{field.title}</Text>
                            <TextInput
                                editable={isEditable}
                                style={ newReportStyles.textInput }
                                placeholder={field.defaultValue}
                                placeholderTextColor={EStyleSheet.value('$placeholder')}
                                keyboardType = 'numeric'
                                onChangeText={(text) => this.props.dispatch(insertFieldAnswer(field, text))}
                            />
                        </View>
                    );

                case 11: // Link
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={newReportStyles.text}>{field.title}</Text>
                            <View style={newReportStyles.linkContainer}>
                                <Icon name={'link'} type={'feather'} iconStyle={ newReportStyles.linkIcon }/>
                                <Text
                                    disabled={!isEditable}
                                    style={ newReportStyles.link }
                                    onPress={() => Linking.openURL(field.defaultValue)}>
                                    Link to somewhere
                                </Text>
                            </View>
                        </View>
                    );

                case 12: // User dropdown
                    return (
                        <View key={index} style={newReportStyles.fieldContainer}>
                            <Text style={ newReportStyles.text }>{field.title}</Text>
                            <Dropdown
                                disabled={!isEditable}
                                defaultValue={'Select user'}
                                options={JSON.parse(field.defaultValue)}
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
            <AppBackground>
                <View style={newReportStyles.ViewContainer}>
                    <ScrollView keyboardShouldPersistTaps={'handled'} style={newReportStyles.ReportScrollView}>
                        {renderedFields}
                        <Button title={strings('createNew.save')} key={999} type={'save'} onPress={() => this.save()}/>
                        <Button title={strings('createNew.send')} type={'send'} onPress={() => console.log('send')}/>
                    </ScrollView>
                </View>

            </AppBackground>);
    }
}


export default connect(mapStateToProps)(NewReportScreen);

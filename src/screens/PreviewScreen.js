import React from 'react';
import { View, ScrollView, Text, ActivityIndicator, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import { Checkbox } from '../components/Checkbox';
import { Radioform } from '../components/Radioform';
import { Dropdown } from '../components/Dropdown';
import { Datepicker } from '../components/Datepicker';
import { Input } from '../components/TextInput';
import { connect } from 'react-redux';

import { AppBackground } from '../components/AppBackground';
import { EditButton } from '../components/EditButton';
import { strings } from '../locales/i18n';
import { insertTitle } from '../redux/actions/preview';

import newReportStyles from './style/newReportStyles';
import templateScreenStyles from './style/templateScreenStyles';

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

    componentWillUnmount() {
        // Calls handler function to set isNavigating back to false in TemplateScreen.
        this.props.navigation.state.params.navigateDebounce();
    }

    getTemplateFields = (templates, templateID) => {
        const isEditable = this.props.navigation.state.params.isEditable;
        const fields = templates[templateID] ? templates[templateID].fields : [];

        this.setState({ fields: fields, isEditable: isEditable, isLoading: false });
    };

    handleOnPress = () => {
        this.props.navigation.navigate('Report', {
            isNewReport: true,
            templateID: this.props.templateID,
            refresh: this.props.navigation.state.params.refresh,
            isEditable: true,
            navigateDebounce: this.props.navigation.state.params.navigateDebounce
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
        const renderedFields = this.state.fields.map((field, index) => {
            const renderedField = () => {
                switch (field.type) {
                    
                    case 'CHECKBOX': // Checkbox
                    {
                        const checkboxes = field.field_options.map((option, index) => {
                            return (
                                <Checkbox
                                    key={index}
                                    editable={isEditable}
                                    isPreview={true}
                                    title={option.value}
                                />
                            );
                        });
                        return (
                            <View key={index}>
                                {checkboxes}
                            </View>
                        );
                    }

                    /*
                    case 'NESTED_DROPDOWN': // Dropdown
                        return (
                            <ModalDropdown
                                disabled={!isEditable}
                                options={['option 1', 'option 2']}
                                dropdownStyle={styles.dropStyleClass}
                                defaultValue={'Select option'}
                                style={[styles.dropdownButton, styles.disabled]}
                                textStyle={[styles.dropdownText, styles.disabledText]}
                                renderRow={() =>
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
                                    <Text style={[styles.dropdownText, styles.disabledText]}>
                                        Select option
                                    </Text>
                                    <Icon name={'expand-more'} color={newReportStyles.$disabledGray}
                                        style={styles.icon}/>
                                </View>
                            </ModalDropdown>
                        );
                    */

                    case 'TEXTFIELD_SHORT': // TextRow (One row text field)
                        return (
                            <Input
                                editable={isEditable}
                                isPreview={true}
                                placeholder={field.default_value}
                                placeholderTextColor={newReportStyles.$disabledGray}
                            />
                        );

                    // Choice (Yes/No) NOTE: Error will be removed when options come from the database.
                    case 'RADIOBUTTON': {
                        const labels = field.field_options.map((option) => {
                            return (
                                { label: option.value, value: option }
                            );
                        });

                        const initialIndex = field.field_options.findIndex((option) => {
                            return (option.default_value);
                        });
                        return (
                            <Radioform
                                options={labels}
                                editable={isEditable}
                                isPreview={true}
                                initial={initialIndex}
                            />
                        );
                    }

                    case 'CALENDAR': // Calendar
                        return (
                            <Datepicker
                                editable={isEditable}
                                isPreview={true}
                                mode={'date'}
                                answer={field.default_value}
                                onChange={(date) => {
                                    this.setState({ date: date });
                                }}
                            />
                        );

                    case 'INSTRUCTIONS': // Instructions
                        return (
                            <Text style={newReportStyles.instructions}>
                                {field.default_value}
                            </Text>
                        );

                    case 'TEXTFIELD_LONG': // Text (Multiple row text field)
                        return (
                            <Input
                                multiline
                                editable={isEditable}
                                isPreview={true}
                                placeholder={field.default_value}
                                placeholderTextColor={newReportStyles.$disabledGray}
                            />
                        );

                    case 'TIME': // Time
                        return (
                            <Datepicker
                                editable={isEditable}
                                isPreview={true}
                                mode={'time'}
                                answer={field.default_value}
                                onChange={(time) => {
                                    this.setState({ time: time });
                                }}
                            />
                        );

                    case 'NUMBERFIELD': // Digits (Text input that only accepts numeric characters)
                        return (
                            <Input
                                editable={isEditable}
                                isPreview={true}
                                placeholder={field.default_value}
                                placeholderTextColor={newReportStyles.$disabledGray}
                                keyboardType='numeric'
                            />
                        );

                    case 'LINK': // Link
                        return (
                            <View key={index} style={newReportStyles.linkContainer}>
                                <Icon name={'link'} type={'feather'} iconStyle={newReportStyles.linkIcon}/>
                                <Text
                                    disabled={!isEditable}
                                    style={[newReportStyles.link, newReportStyles.disabledLink]}
                                    onPress={() => {
                                        const url = field.default_value;
                                        // This checks if any installed app can handle the
                                        // url before attempting to open it.
                                        // This is done as shown in React Native docs.
                                        Linking.canOpenURL(url).then(supported => {
                                            if (!supported) {
                                                console.log('Can\'t handle url: ' + url);
                                            } else {
                                                return Linking.openURL(url);
                                            }
                                        }).catch(err => console.error('An error occurred', err));
                                    }}>
                                    Link to somewhere
                                </Text>
                            </View>
                        );

                    case 'DROPDOWN': // User dropdown
                        return (
                            <Dropdown
                                disabled={!isEditable}
                                isPreview={true}
                                defaultValue={strings('createNew.selectUser')}
                                options={JSON.parse(field.default_value)}
                            />
                        );

                    default:
                        return (
                            null
                        );
                }
            };

            return (
                <View key={index} style={newReportStyles.fieldContainer}>
                    <View style={newReportStyles.fieldTitle}>
                        <Text style={ newReportStyles.text }>
                            {field.title}
                        </Text>
                        {
                            (field.required) &&
                            <Text style={newReportStyles.required}> *</Text>
                        }
                    </View>
                    {renderedField()}
                </View>
            );
        });

        return (
            <AppBackground>
                <View style={ newReportStyles.ViewContainer }>
                    <ScrollView keyboardShouldPersistTaps={'handled'} style={ newReportStyles.ReportScrollView }>
                        <View style={newReportStyles.fieldContainer}>
                            <View style={newReportStyles.fieldTitle}>
                                <Text style={newReportStyles.text}>Otsikko</Text>
                                <Text style={newReportStyles.required}> *</Text>
                            </View>
                            <Input
                                editable={isEditable}
                                isPreview={true}
                                placeholder={strings('createNew.title')}
                                placeholderTextColor={newReportStyles.$gray}
                                onChangeText={(text) => this.props.dispatch(insertTitle(text))}
                            />
                        </View>
                        {renderedFields}
                    </ScrollView>
                    <EditButton onPress={() => this.handleOnPress()} />
                </View>
            </AppBackground>
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

import React from 'react';
import { View, TextInput, Alert, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import moment from 'moment';

import { createNewReport } from './api';
import newReportStyles from './style/newReportStyles';

export default class NewReportScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TextInputName  : '',    // Text input is initialized as an empty string.
            templateID     : '',    /* TemplateID that is inherited from navigation parameters
                                       as stated in TemplateScreen class. */
        };
    }

    // Inserts data to server with a post method.
    send = () => {
        const report = {
            templateID: this.props.navigation.state.params.templateID,
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


    render() {
        return (
            <View style={newReportStyles.MainContainer}>
                <TextInput
                    placeholder='Enter Report Name'
                    onChangeText={(TextInputName) => this.setState({ TextInputName })}
                    underlineColorAndroid='transparent'
                    style={newReportStyles.TextInputStyleClass}
                />
                <Button
                    title='Create new report'
                    onPress={ this.send }
                >
                </Button>
            </View>
        );
    }
}


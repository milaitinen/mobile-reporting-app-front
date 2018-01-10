import React from 'react';
import { View, TextInput, Alert, Button } from 'react-native';
import { url } from './urlsetting';
import { NavigationActions } from 'react-navigation';
import newReportStyles from './style/newReportStyles';

export default class NewReportScreen extends React.Component {


    constructor(props)
    {
        super(props);
        this.state = {
            TextInputName  : '',    // Text input is initialized as an empty string.
            templateID     : '',    /* TemplateID that is inherited from navigation parameters
                                       as stated in TemplateScreen class. */
        };

    }

    // Gets the current date and returns it as a string.

    getDate = () => {

        const today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; // January is 0!
        const yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        return yyyy + '-' + mm + '-' + dd;
    };


    // Inserts data to server with a post method.

    InsertDataToServer = () => {

        const date = this.getDate();

        fetch(url + '/users/1/reports', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                templateID: this.props.navigation.state.params.templateID,
                title: this.state.TextInputName,
                dateCreated: date,
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

            })

        }).then(response => {
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

                    onChangeText={TextInputName => this.setState({ TextInputName })}

                    underlineColorAndroid='transparent'

                    style={newReportStyles.TextInputStyleClass}
                />
                <Button
                    title='Create new report'
                    onPress={ this.InsertDataToServer }
                >
                </Button>
            </View>
        );
    }
}


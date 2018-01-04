import React from 'react';
import { StyleSheet, View, TextInput, Platform, Alert, Button } from 'react-native';
import { url } from './urlsetting';
import { NavigationActions } from 'react-navigation';
export default class NewFormScreen extends React.Component {


    constructor(props)
    {
        super(props);
        this.state = {
            TextInputName  : '',                                      // Text input is initialized as an empty string.
            layoutID       : props.navigation.state.params.layoutID,  /* LayoutID that is inherited from navigation
                                                                         parameters as stated in TemplateScreen class. */

        };

    }

    // Gets the current date and return it as a string.

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
    }


    // Inserts data to server with a post method.

    InsertDataToServer = () => {

        const date = this.getDate();

        fetch(url + '/users/1/forms', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                layoutID: this.state.layoutID,
                title: this.state.TextInputName,
                dateCreated: date,
                answers: [
                    {
                        fieldID: 1,
                        answer: "Answer 1"
                    },
                    {
                        fieldID: 2,
                        answer: "Answer 2"
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

    }
    
    render() {
        return (
            <View style={styles.MainContainer}>
                <TextInput
                    placeholder='Enter Report Name'

                    onChangeText={TextInputName => this.setState({ TextInputName })}

                    underlineColorAndroid='transparent'

                    style={styles.TextInputStyleClass}
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

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        // alignItems: 'center',
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },

    TextInputStyleClass: {
        textAlign: 'center',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        borderColor: '#FF5722',
    },
});
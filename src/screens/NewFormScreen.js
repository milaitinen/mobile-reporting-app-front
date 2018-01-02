import React from 'react';
import { StyleSheet, View, TextInput, Platform, Alert, Button } from 'react-native';
import { url } from './urlsetting';
import { NavigationActions } from 'react-navigation';
export default class NewFormScreen extends React.Component {


    constructor(props)
    {
        super(props);
        this.state = {
            TextInputName: ''
        };
    }

    InsertDataToServer = () => {

        const { TextInputName } = this.state ;

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: TextInputName
            })

        }).then(response => {
            if (response.status === 200) {

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
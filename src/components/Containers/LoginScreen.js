import React from 'react'
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native'

export default class LoginScreen extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            isLoading: true,
            TextInputUser: '',
            TextInputPassword: '',
            TextInputServer: ''
        };
    }


    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text
                    style={styles.title}>
                    MR-Application
                </Text>

                <Text
                    style={styles.slogan}>
                    Insert slogan here
                </Text>

                <TextInput
                    placeholder='Email'
                    onChangeText={TextInputUser => this.setState({TextInputUser})}
                    //underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />

                <TextInput

                    secureTextEntry={true}
                    placeholder='Password'
                    onChangeText={TextInputPassword => this.setState({TextInputPassword})}
                    //underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />

                <TextInput
                    placeholder='Server url'

                    onChangeText={TextInputServer => this.setState({TextInputServer})}
                    //underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />

                <Button
                    title='Sign in'
                    onPress={() => this.props.navigation.navigate('drawerStack')}
                    color='#3cb371'
                />

                <Text
                    style={styles.textLink}
                    onPress={() => this.props.navigation.navigate('forgottenPasswordScreen')} >
                    Forgot password?
                </Text>

                <Text
                    style={styles.textLink}
                    onPress={() => this.props.navigation.navigate('signupScreen')} >
                    Sign up
                </Text>

                <Text
                    style={styles.copyright}>
                    Copyright © Arter Oy 2017
                </Text>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    TextInputStyleClass: {

        //textAlign: 'center',
        marginBottom: 7,
        height: 40,
        //borderWidth: 1,
        //borderColor: '#FF5722',

// Set border Radius.
        //borderRadius: 10 ,
    },

    contentContainer: {
        padding: 20,
        flex: 1,
        //backgroundColor: '#fff',
        justifyContent: 'center',
    },
    textLink: {
        color: 'blue',
        paddingTop: 25,
        fontSize: 16,
        textAlign: 'center'
    },
    title: {
        fontSize: 27,
        textAlign: 'center',
        paddingBottom: 35,
        //fontWeight: 'bold'
    },

    slogan: {
        fontSize: 20,
        textAlign: 'center',
        paddingBottom: 40,
        //fontWeight: 'bold'
    },

    copyright: {
        color: 'blue',
        textAlign: 'center',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
    }
})
import React from 'react'
import { StyleSheet, Text, View, Button, TextInput, ScrollView, ImageBackground, } from 'react-native'

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
            <ImageBackground
                source={require('./img/background_3.png')}
                style={styles.contentContainer}>

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
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({

    TextInputStyleClass: {

        //textAlign: 'center',
        marginBottom: 7,
        height: 40,
        fontFamily: 'Roboto-Light',
        color: 'white',
        //borderWidth: 1,
        //borderColor: '#FF5722',

// Set border Radius.
        //borderRadius: 10 ,
    },

    contentContainer: {
        padding: 20,
        flex: 1,
        width: null,
        height: null,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    textLink: {
        color: 'white',
        paddingTop: 25,
        fontFamily: 'Roboto-Light',
        fontSize: 16,
        textAlign: 'center'
    },
    title: {
        fontFamily: 'Roboto-Light',
        fontSize: 27,
        textAlign: 'center',
        paddingBottom: 35,
        color: 'white',
        //fontWeight: 'bold'
    },

    slogan: {
        fontSize: 20,
        textAlign: 'center',
        paddingBottom: 40,
        color: 'white',
        //fontWeight: 'bold'
    },

    copyright: {
        fontFamily: 'Roboto-Light',
        color: 'white',
        textAlign: 'center',

        marginTop: 200,
    }
})
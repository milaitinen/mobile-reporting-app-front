import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, ImageBackground, Image } from 'react-native';

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
                source={require('./img/background.png')}
                style={styles.contentContainer}>

                <Text
                    style={styles.title}>
                    MR-Application
                </Text>

                <Text
                    style={styles.slogan}>
                    Keep calm and keep reporting
                </Text>
                <View style={styles.SectionStyle}>
                    <Image source={require('./img/person.png')} style={styles.ImageStyle}/>
                    <TextInput
                        placeholder='Email'
                        placeholderTextColor='white'
                        onChangeText={TextInputUser => this.setState({TextInputUser})}
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyleClass}
                    />
                </View>

                <View style={styles.SectionStyle}>
                    <Image source={require('./img/lock.png')} style={styles.ImageStyle}/>
                    <TextInput
                        secureTextEntry={true}
                        placeholder='Password'
                        placeholderTextColor='white'
                        onChangeText={TextInputPassword => this.setState({TextInputPassword})}
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyleClass}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <Image source={require('./img/language.png')} style={styles.ImageStyle}/>
                    <TextInput
                        placeholder='Server url'
                        placeholderTextColor='white'
                        onChangeText={TextInputServer => this.setState({TextInputServer})}
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyleClass}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('drawerStack')}
                    style={styles.button}>
                    <Text style={styles.signin}>
                        Sign In
                    </Text>
                </TouchableOpacity>

                <Text
                    style={styles.textLink}
                    onPress={() => this.props.navigation.navigate('forgottenPasswordScreen')} >
                    Forgot password?
                </Text>

                <Text
                    style={styles.signup}
                    onPress={() => this.props.navigation.navigate('signupScreen')} >
                    Sign up
                </Text>

                <Text
                    style={styles.copyright}>
                    Copyright © Arter Oy 2017
                </Text>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    ImageStyle: {
        paddingTop: 10,
        paddingBottom: 15,
        paddingRight: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode : 'stretch',
        alignItems: 'center'
    },

    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        alignSelf: 'center',
        height: 40,
        width: 250,
        margin: 10
    },

    TextInputStyleClass: {

        // textAlign: 'center',
        width: 215,
        height: 40,
        fontFamily: 'Roboto-Light',
        fontSize: 16,
        color: 'white',
        alignSelf: 'center',
        // borderWidth: 1,
        // borderColor: '#FF5722',

        // Set border Radius.
        // borderRadius: 10 ,
    },

    button: {
        backgroundColor: '#9dcbe5',
        marginTop:30,
        paddingTop:10,
        paddingBottom:10,
        marginLeft:115,
        marginRight:115,
        marginBottom: 25,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#9dcbe5',

    },

    signin: {
        color: '#274752',
        fontFamily: 'Roboto-Light',
        fontSize: 15,
        textAlign: 'center',
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
        paddingTop: 20,
        fontFamily: 'Roboto-Light',
        fontSize: 14,
        textAlign: 'center'
    },

    signup: {
        color: '#78d3f2',
        paddingTop: 25,
        fontFamily: 'Roboto-Light',
        fontSize: 15,
        textAlign: 'center'
    },

    title: {
        fontFamily: 'Roboto-Light',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 10,
        paddingBottom: 30,
        color: 'white',
        // fontWeight: 'bold'
    },

    slogan: {
        fontSize: 30,
        width: 200,
        textAlign: 'center',
        paddingBottom: 30,
        color: 'white',
        fontFamily: 'Qwigley-Regular',
        alignSelf: 'center',
        // fontWeight: 'bold'
    },

    copyright: {
        fontFamily: 'Roboto-Light',
        color: 'white',
        textAlign: 'center',

        marginTop: 50,
    }
});
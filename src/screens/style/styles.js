import { StyleSheet } from 'react-native';

const loginStyles = StyleSheet.create({
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

    signUp: {
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

export default loginStyles;
import EStyleSheet from 'react-native-extended-stylesheet';

const loginStyles = EStyleSheet.create({

    title: {
        fontFamily: '$primaryFont',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 10,
        paddingBottom: 30,
        color: 'white',
    },

    slogan: {
        fontSize: 30,
        width: 200,
        textAlign: 'center',
        paddingBottom: 30,
        color: 'white',
        fontFamily: 'Qwigley-Regular',
        alignSelf: 'center',
    },

    forgotPassword: {
        color: 'white',
        paddingTop: 20,
        fontFamily: '$primaryFont',
        fontSize: 14,
        textAlign: 'center',
    },

    signUp: {
        color: '#78d3f2',
        paddingTop: 25,
        fontFamily: '$primaryFont',
        fontSize: 15,
        textAlign: 'center',
    },

    copyright: {
        fontFamily: '$primaryFont',
        color: 'white',
        textAlign: 'center',
        marginTop: 50,
    }
});

export default loginStyles;
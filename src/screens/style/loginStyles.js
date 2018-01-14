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
        marginBottom: 10,
        color: 'white',
        fontFamily: 'Qwigley-Regular',
        alignSelf: 'center',
    },

    copyright: {
        fontFamily: '$primaryFont',
        color: 'white',
        textAlign: 'center',
        marginTop: 60,
    }
});

export default loginStyles;
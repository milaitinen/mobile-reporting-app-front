import EStyleSheet from 'react-native-extended-stylesheet';

const loginStyles = EStyleSheet.create({

    title: {
        fontFamily: '$primaryFont',
        textAlign: 'center',
        color: 'white',

        '@media (max-width: 350)': {
            fontSize: 25,
            marginTop: 6,
            paddingBottom: 20,
        },
        '@media (min-width: 350)': {
            fontSize: 30,
            marginTop: 10,
            paddingBottom: 30,
        },
    },

    slogan: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Qwigley-Regular',
        alignSelf: 'center',
        '@media (max-width: 350)': {
            fontSize: 25,
            paddingBottom: 20,
            marginBottom: 6,
            width: 130,
        },
        '@media (min-width: 350)': {
            fontSize: 30,
            width: 200,
            paddingBottom: 30,
            marginBottom: 10,
        },
    },

    copyright: {
        fontFamily: '$primaryFont',
        color: 'white',
        textAlign: 'center',
        '@media (max-width: 350)': {
            marginTop: 40,
            fontSize: 12,
        },
        '@media (min-width: 350)': {
            marginTop: 60,
            fontSize: 16,
        },
    }
});

export default loginStyles;
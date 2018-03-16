import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    view: {
        backgroundColor: 'transparent',
        borderRadius: '$buttonBorderRadius',
        justifyContent: 'center',
        alignContent: 'center',
        marginHorizontal: 15,
        marginVertical: 10,
    },

    sendButtonContainer: {
        backgroundColor: '$primaryWhite',
        borderRadius: '$inputBorderRadius',
        borderWidth: 2,
        alignContent: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderColor: '$sendGreen',
        '@media (max-width: 350)': {
            borderRadius: '$inputBorderRadius',
            height: 30,
        },
        '@media (min-width: 350)': {
            height: 40,
        },
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    saveButtonContainer: {
        backgroundColor: '$primaryWhite',
        borderRadius: '$inputBorderRadius',
        borderWidth: 2,
        alignContent: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderColor: '$draftBlue',
        '@media (max-width: 350)': {
            borderRadius: '$inputBorderRadius',
            height: 30,
        },
        '@media (min-width: 350)': {
            height: 40,
        },
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    buttonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },

    text: {
        paddingLeft: 10,
        color: '$gray2',
        fontFamily: '$primaryFont',
        textAlign: 'center',
        '@media (max-width: 350)': {
            fontSize: 12,
        },
        '@media (min-width: 350)': {
            fontSize: 16,
        },
    },
});

export default styles;
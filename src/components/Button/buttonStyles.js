import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    view: {
        backgroundColor: 'transparent',
        borderRadius: '$buttonBorderRadius',
        justifyContent: 'center',
        alignContent: 'center',
        height: 70,
        marginHorizontal: 10,
        marginBottom: 2,
    },

    sendButtonContainer: {
        backgroundColor: '#99d9ad',
        borderRadius: '$buttonBorderRadius',
        borderWidth: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderColor: '#99d9ad',
        '@media (max-width: 350)': {
            borderRadius: '$buttonBorderRadiusSmall',
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
        backgroundColor: '$draftBlue',
        borderRadius: '$buttonBorderRadius',
        borderWidth: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderColor: '$draftBlue',
        '@media (max-width: 350)': {
            borderRadius: '$buttonBorderRadiusSmall',
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
        color: '#474c52',
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
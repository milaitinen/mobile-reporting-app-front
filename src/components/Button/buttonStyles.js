import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    view: {
        backgroundColor: '$darkBlue',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: '#87cce5',
        borderRadius: '$buttonBorderRadius',
        borderWidth: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderColor: '#87cce5',
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

    text: {
        //color: '#274752',
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
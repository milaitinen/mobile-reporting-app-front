import EStyleSheet from 'react-native-extended-stylesheet';

const navigationStyles = EStyleSheet.create({

    HeaderContainer: {
        backgroundColor: '$darkBlue',
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        elevation: 0,
        // shadowOffset: 0,
        '@media (max-width: 350)': {
            paddingRight: 7,
        },
        '@media (min-width: 350)': {
            paddingRight: 10,
        },
    },

    ScreenHeader: {
        alignSelf: 'flex-start',
        color: '#fff',
        fontWeight: 'normal',
        fontFamily: '$primaryFont',
        paddingLeft: 0,
        '@media (max-width: 350)': {
            fontSize: 25,
        },
        '@media (min-width: 350)': {
            fontSize: 30,
        },

    },

    menuIconContainer: {
        paddingRight: 0,
        paddingLeft: 20,
    },

    menuIcon: {
        color: '#fff',
        '@media (max-width: 350)': {
            fontSize: 30,
        },
        '@media (min-width: 350)': {
            fontSize: 30,
        },
    },

});

export default navigationStyles;
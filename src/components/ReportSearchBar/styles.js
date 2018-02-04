import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    searchBarContainer: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        borderTopWidth:0,
        '@media (max-width: 350)': {
            paddingRight: 25,
            paddingLeft: 25,
            paddingBottom: 3,
        },
        '@media (min-width: 350)': {
            paddingRight: 35,
            paddingLeft: 35,
            paddingBottom: 5,
        },
    },

    searchBarInput: {
        backgroundColor: '$primaryWhite',
    },

    searchIcon: {
        paddingRight: 5,
        fontSize: 20,
        '@media (max-width: 350)': {
            paddingLeft: 22,
        },
        '@media (min-width: 350)': {
            paddingLeft: 32,
        },
    },

});
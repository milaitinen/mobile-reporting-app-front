import EStyleSheet from 'react-native-extended-stylesheet';

const navigationStyles = EStyleSheet.create({

    HeaderContainer: {
        backgroundColor: '$darkBlue',
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        elevation: 0,
        //shadowOffset: 0,
        paddingRight: 10,
    },

    ScreenHeader: {
        alignSelf: 'flex-start',
        color: '#fff',
        fontWeight: 'normal',
        fontFamily: '$primaryFont',
        fontSize: 30,
        paddingLeft: 0,
    },

    menuIcon: {
        paddingLeft: 20,
        paddingRight: 0,
    },

});

export default navigationStyles;
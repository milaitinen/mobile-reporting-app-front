import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';

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
        color: '#fff',
        fontWeight: 'normal',
        fontFamily: '$primaryFont',
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        alignSelf: 'center',
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
        marginTop: Platform.OS === 'ios' ? 20 : 0 ,
        left:0,
        position: 'absolute',
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
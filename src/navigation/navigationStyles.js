import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform, Dimensions } from 'react-native';

const navigationStyles = EStyleSheet.create({

    HeaderContainer: {
        backgroundColor: '$darkBlue',
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        flexDirection: 'row',
        elevation: 0,
        '@media (max-width: 350)': {
            paddingRight: 7,
        },
        '@media (min-width: 350)': {
            paddingRight: 10,
        },
    },

    ScreenHeaderTemplates: {
        color: '#fff',
        fontWeight: 'normal',
        fontFamily: '$primaryFont',
        paddingRight: 50,
        '@media (max-width: 350)': {
            fontSize: 25,
        },
        '@media (min-width: 350)': {
            fontSize: 30,
        },

    },

    ScreenHeader: {
        color: '#fff',
        fontWeight: 'normal',
        fontFamily: '$primaryFont',
        textAlignVertical: 'center',
        textAlign: 'center',
        paddingRight: 100,
        '@media (max-width: 350)': {
            fontSize: 25,
        },
        '@media (min-width: 350)': {
            fontSize: 30,
        },

    },

    headerBackStyle: {
        color: '#fff',
        '@media (max-width: 350)': {
            fontSize: 30,
        },
        '@media (min-width: 350)': {
            fontSize: 30,
        },

    },

    menuIconContainer: {
        paddingRight: 0,
        paddingLeft: 20,
        marginTop: Platform.OS === 'ios' ? 22 : 0 ,
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
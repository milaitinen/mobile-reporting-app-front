import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';

const navigationStyles = EStyleSheet.create({

    HeaderContainer: {
        backgroundColor: '$darkBlue',
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        flexDirection: 'row',
        elevation: 0,
        height: Platform.OS === 'ios' ? 76 : 56,
        '@media (max-width: 350)': {
            paddingHorizontal: 7,
        },
        '@media (min-width: 350)': {
            paddingHorizontal: 10,
        },
    },

    titleContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    ScreenHeader: {
        color: '#fff',
        fontWeight: 'normal',
        fontFamily: '$primaryFont',
        textAlignVertical: 'center',
        textAlign: 'center',
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

    backButtonContainer: {
        paddingLeft: Platform.OS === 'ios' ? 20 : 10,
        marginTop: Platform.OS === 'ios' ? 26 : 0 ,
        top: 0,
        position: 'absolute',
    },

    menuIconContainer: {
        paddingRight: 0,
        paddingLeft: 25,
        marginVertical: 5,
        marginTop: Platform.OS === 'ios' ? 20 : 0 ,
        top: 12,
        position: 'absolute',
    },


    menuIcon: {
        color: '#fff',
        '@media (max-width: 350)': {
            fontSize: 32,
        },
        '@media (min-width: 350)': {
            fontSize: 32,
        },
    },

});

export default navigationStyles;
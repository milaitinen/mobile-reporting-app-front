import { StyleSheet } from 'react-native';

const navigationStyles = StyleSheet.create({

    HeaderContainer: {
        backgroundColor: '#455fa1',
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
        fontFamily: 'Roboto-Light',
        fontSize: 30,
        paddingLeft: 0,
    },

    menuIcon: {
        paddingLeft: 20,
        paddingRight: 0,
    },

});

export default navigationStyles;
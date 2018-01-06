import {StyleSheet} from 'react-native';

const navigationStyles = StyleSheet.create({

    formHeader: {
        backgroundColor: '#455fa1',
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        elevation: 0,
        //shadowOffset: 0,
        paddingRight: 10,
    },

    formHeaderTitle: {
        color: '#fff',
        fontWeight: 'normal',
        fontFamily: 'Roboto-Light',
        fontSize: 30,
        paddingLeft: 0,
    },

    headerLeft: {
        fontSize: 40,
        fontWeight:'normal',
        paddingLeft: 20,
        paddingRight: 0,
        color: '#fff',
        fontFamily: 'Roboto-Light',
    },

});

export default navigationStyles;
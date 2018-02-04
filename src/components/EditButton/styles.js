import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({

    containerStyle: {
        backgroundColor: '#99d9ad',
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        '@media (max-width: 350)': {
            height: 50,
            width: 50,
            borderRadius: 25,
            right: 6,
            bottom: 10,
        },
        '@media (min-width: 350)': {
            height: 70,
            width: 70,
            borderRadius: 35,
            right: 10,
            bottom: 15,
        },
    },

    iconStyle: {
        color: '#77a482',
        padding: 8,

        '@media (max-width: 350)': {
            fontSize: 30,
        },
        '@media (min-width: 350)': {
            fontSize: 40,
        }

    },



});
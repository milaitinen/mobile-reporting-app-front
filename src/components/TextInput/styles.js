import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    InputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        alignSelf: 'center',
        height: 40,
        width: 250,
        margin: 10
    },

    InputStyle: {
        width: 215,
        height: 40,
        fontFamily: 'Roboto-Light',
        fontSize: 16,
        color: 'white',
        alignSelf: 'center',
        marginLeft: 5,

    },
});

export default styles;
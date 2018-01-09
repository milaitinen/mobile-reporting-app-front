import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
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
        fontFamily: '$primaryFont',
        fontSize: 16,
        color: 'white',
        alignSelf: 'center',
        marginLeft: 5,

    },
});

export default styles;
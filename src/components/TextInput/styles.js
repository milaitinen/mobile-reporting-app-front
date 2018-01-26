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
        '@media (max-width: 350)': {
            width: 190,
            margin: 5,
        },
        '@media (min-width: 350)': {
            width: 250,
            margin: 10,
        },
    },

    InputStyle: {
        fontFamily: '$primaryFont',
        color: 'white',
        height: 40,
        alignSelf: 'center',
        '@media (max-width: 350)': {
            width: 160,
            fontSize: 12,
            marginLeft: 5,
        },
        '@media (min-width: 350)': {
            width: 215,
            fontSize: 16,
            marginLeft: 5,
        }
    },
});

export default styles;
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    view: {
        flex: 0.7,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    buttonContainer: {
        backgroundColor: '#9dcbe5',
        borderRadius: '$buttonBorderRadius',
        borderWidth: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderColor: '#9dcbe5',
        '@media (max-width: 350)': {
            marginTop: 20,
            height: 30,
        },
        '@media (min-width: 350)': {
            marginTop: 30,
            marginBottom: 60,
            height: 40,
        }
    },
    text: {
        color: '#274752',
        fontFamily: '$primaryFont',
        textAlign: 'center',
        '@media (max-width: 350)': {
            fontSize: 12,
        },
        '@media (min-width: 350)': {
            fontSize: 16,
        }
    },
});

export default styles;
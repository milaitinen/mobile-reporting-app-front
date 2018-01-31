import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({

    buttonContainer: {
        backgroundColor: '#9dcbe5',
        paddingTop:10,
        paddingBottom:10,
        borderRadius:10,
        borderWidth: 1,
        flex: 0.3,
        borderColor: '#9dcbe5',
        '@media (max-width: 350)': {
            marginTop: 20,
            paddingTop: 6,
            paddingBottom: 6,
            height: 30,
        },
        '@media (min-width: 350)': {
            marginTop: 30,
            marginBottom: 60,
            paddingTop: 10,
            paddingBottom: 10,
            height: 40,
        }
    },
    text: {
        color: '#274752',
        fontFamily: '$primaryFont',
        textAlign: 'center',
        '@media (max-width: 350)': {
            fontSize: 12,
            paddingLeft: 10,
            paddingRight: 10,
        },
        '@media (min-width: 350)': {
            fontSize: 16,
        }
    },
});

export default styles;
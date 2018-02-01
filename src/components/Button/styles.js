import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({

    buttonContainer: {
        backgroundColor: '#9dcbe5',
        paddingTop:10,
        paddingBottom:10,
        borderRadius: '$buttonBorderRadius',
        borderWidth: 1,
        borderColor: '#9dcbe5',
        '@media (max-width: 350)': {
            marginTop: 20,
            marginLeft: 90,
            marginRight: 90,
            paddingTop: 6,
            paddingBottom: 6,
        },
        '@media (min-width: 350)': {
            marginTop: 30,
            marginLeft: 115,
            marginRight: 115,
            marginBottom: 60,
            paddingTop: 10,
            paddingBottom: 10,
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
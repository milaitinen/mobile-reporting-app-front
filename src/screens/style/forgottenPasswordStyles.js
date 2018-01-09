import EStyleSheet from 'react-native-extended-stylesheet';

const forgottenPasswordStyles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '$primaryWhite',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '$darkBlue',
        width: 250,
        height: 50,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        color: '$primaryWhite',
    }
});

export default forgottenPasswordStyles;
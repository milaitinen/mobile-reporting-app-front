import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    container: {
        backgroundColor: '$primaryWhite',
        height: 40,
        borderWidth: 0,
        marginLeft: 0,
        marginVertical: 0,
        justifyContent: 'center',
    },

    selectedContainer: {
        backgroundColor: '$primaryWhite',
        height: 40,
        borderWidth: 2,
        borderColor: '$active',
        marginLeft: 0,
        marginVertical: 0,
        justifyContent: 'center',
    },

    text: {
        color: '$placeholder',
        fontFamily: '$primaryFont',
        fontWeight: 'normal',
    },

    selectedText: {
        color: '$active',
        fontFamily: '$primaryFont',
        fontWeight: 'normal',
    }

});

export default styles;
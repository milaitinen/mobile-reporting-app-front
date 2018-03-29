import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    $inactiveBlue: '$inactive',
    $disabledGray: '$disabledBorder',
    $activeBlue: '$active',

    container: {
        backgroundColor: '$primaryWhite',
        height: 40,
        borderWidth: 0,
        marginLeft: 0,
        marginVertical: 0,
        marginBottom: 10,
        justifyContent: 'center',
    },

    selectedContainer: {
        backgroundColor: '$primaryWhite',
        height: 40,
        borderWidth: 2,
        borderColor: '$active',
        marginLeft: 0,
        marginVertical: 0,
        marginBottom: 10,
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
    },

    disabled: {
        backgroundColor: '$disabled',
        borderColor: '$disabledBorder',
        height: 40,
        borderWidth: 2,
        marginLeft: 0,
        marginVertical: 0,
        marginBottom: 10,
        justifyContent: 'center',
    },

    disabledText: {
        color: '$disabledPlaceholder',
        fontFamily: '$primaryFont',
        fontWeight: 'normal',
    }

});

export default styles;
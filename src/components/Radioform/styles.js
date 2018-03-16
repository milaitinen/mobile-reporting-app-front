import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({

    radioInputContainer: {
        height: 40,
        marginBottom: 10,
        paddingHorizontal: 1,
        marginHorizontal: 0,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: '$inputBorderRadius',
        backgroundColor: '$primaryWhite',
    },

    selectedInputContainer: {
        height: 40,
        marginBottom: 10,
        paddingHorizontal: 1,
        marginHorizontal: 0,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: '$inputBorderRadius',
        backgroundColor: '$primaryWhite',
        borderWidth: 2,
        borderColor: '$active'
    },

    radioLabel: {
        fontFamily: '$primaryFont',
        color: '$placeholder',
        textAlignVertical: 'center',
        textAlign: 'left',
        paddingBottom: 3,
        marginRight: 10
    },

    buttonWrap: {
        height: 38,
        paddingLeft: 9,
        justifyContent: 'center'
    },

    labelWrap: {
        height: 38,
        flex: 1,
    },

    selectedLabel: {
        fontFamily: '$primaryFont',
        color: '$active',
        textAlignVertical: 'center',
        textAlign: 'left',
        paddingBottom: 3,
        marginRight: 10,
    },

    disabled: {
        backgroundColor: '$disabled',
        borderColor: '$disabledBorder',
        borderWidth: 2,
    },

    disabledText: {
        color: '$disabledPlaceholder',
        fontFamily: '$primaryFont',
    }

});

export default styles;
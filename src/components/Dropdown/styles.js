import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({

    dropdownContainer: {
        margin: 5,
        flexDirection: 'row',
    },

    lowerDropdownStyleClass: {
        flex: 1,
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 8,
        paddingLeft: 8,
    },

    dropdownButton: {
        width: 180,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '$dropdownRadius',
        borderWidth: '$containerBorderWidth',
        borderColor: '$inactive',
        backgroundColor: '$primaryWhite',
    },

    buttonContent: {
        width: 180,
        flexDirection: 'row',
        paddingHorizontal: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    dropdownText: {
        marginVertical: 10,
        marginHorizontal: 6,
        fontSize: 16,
        fontFamily: '$primaryFont',
        color: '$placeholder',
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    dropdownRow: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
    },

    dropdownSeparator: {
        height: 1,
        backgroundColor: '$inactive',
    },

    dropdownRowText: {
        marginHorizontal: 4,
        fontSize: 16,
        fontFamily: '$primaryFont',
        color: '$placeholder',
        textAlignVertical: 'center',
    },

    dropStyleClass: {
        width: 180,
        height: 300,
        borderWidth: '$containerBorderWidth',
        borderColor: '$inactive',
        borderRadius: '$dropdownRadius',
    },

    icon: {
        alignSelf: 'flex-end',
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
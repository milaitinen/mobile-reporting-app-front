import EStyleSheet from 'react-native-extended-stylesheet';

const newReportStyles = EStyleSheet.create({

    $disabledGray: '$disabledPlaceholder',
    $gray: '$placeholder',

    ViewContainer: {
        flex: 1,
        height: 100,
        paddingVertical: 10,
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '$primaryWhite',

    },

    ReportContainer: {
        flex: 1,
        height: 40,
        backgroundColor: '$primaryWhite',
        marginHorizontal: 3,
        marginTop: 10,
        paddingVertical: 20,
        paddingHorizontal: 7,
        borderTopLeftRadius: '$containerBorderRadius',
        borderTopRightRadius: '$containerBorderRadius',

    },

    fieldContainer: {
        backgroundColor: '$fieldBg',
        borderRadius: '$containerBorderRadius',
        padding: 15,
        paddingBottom: 10,
        marginVertical: 10,
    },

    ReportScrollView: {
        backgroundColor: 'transparent',
        paddingHorizontal: 7,
        marginBottom: 5,
    },

    fieldTitle: {
        flexDirection: 'row',
    },

    text: {
        color: '$primaryWhite',
        fontFamily: '$primaryFont',
        fontSize: 16,
        marginBottom: 10,
    },

    required: {
        color: '$required',
        fontFamily: '$primaryFont',
        fontSize: 16,
        marginBottom: 10,
    },

    lowerDropdownStyleClass: {
        flex: 1,
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 8,
        paddingLeft: 8,
    },

    dropStyleClass: {
        width: 180,
        height: 300,
        borderColor: '$draftBlue',
        borderWidth: '$containerBorderWidth',
        borderRadius: 3,
    },

    dropIconStyle: {
        color: '#000000',
        fontSize: 20,
        flex: 1,
        left: 25,
        //paddingleft: 10,
    },

    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    linkIcon: {
        color: '$inactive',
        justifyContent: 'flex-end',
        fontSize: 18,
        paddingRight: 10,
        paddingLeft: 4,
    },

    disabledIcon: {
        color: '$disabledPlaceholder',
    },

    link: {
        fontFamily: '$primaryFont',
        color: '$active',
        fontSize: 14,
    },

    disabledLink: {
        color: '$disabledPlaceholder',
    },

    multilineTextInput: {
        textAlignVertical: 'top',
        paddingHorizontal: 12,
        marginBottom: 10,
        minHeight: 80,
        borderRadius: '$inputBorderRadius',
        backgroundColor: '$primaryWhite',
        fontFamily: '$primaryFont',
        color: '$placeholder',
    },

    instructions: {
        textAlignVertical: 'center',
        color: '$primaryWhite',
        fontFamily: '$primaryFont',
        marginBottom: 10,
    },

    textInput: {
        paddingHorizontal: 12,
        marginBottom: 10,
        height: 40,
        borderRadius: '$inputBorderRadius',
        backgroundColor: '$primaryWhite',
        fontFamily: '$primaryFont',
        color: '$placeholder',
    },

    disabled: {
        backgroundColor: '$disabled',
        borderColor: '$disabledBorder',
        borderWidth: 2,
    }
});

export default  newReportStyles;
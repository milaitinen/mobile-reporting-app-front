import EStyleSheet from 'react-native-extended-stylesheet';

const newReportStyles = EStyleSheet.create({

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
        paddingBottom: 20,
        marginVertical: 10,
    },

    altFieldContainer: {
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

    text: {
        color: '$primaryWhite',
        fontFamily: '$primaryFont',
        fontSize: 16,
        marginBottom: 10,
    },

    mainDropdownStyleClass: {
        //flex: 1,
        flexDirection: 'row',
        backgroundColor: '$primaryWhite',
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: '$dropdownRadius',
        borderWidth: '$containerBorderWidth',
        borderColor: '$gray1',
        marginTop: 6,
        marginBottom: 6,
        width: 160,
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
        height: 80,
        borderRadius: '$inputBorderRadius',
        backgroundColor: '$primaryWhite',
        fontFamily: '$primaryFont',
        color: '$placeholder',
    },

    instructions: {
        textAlignVertical: 'center',
        color: '$primaryWhite',
        fontFamily: '$primaryFont',
    },

    textInput: {
        paddingHorizontal: 12,
        height: 40,
        borderRadius: '$inputBorderRadius',
        backgroundColor: '$primaryWhite',
        fontFamily: '$primaryFont',
        color: '$placeholder',
    },

    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingTop: 0,
        marginBottom: 5,
    },

    title: {
        flex: 1,
        marginHorizontal: 15,
        color: '$gray2',
        fontSize: 24,
    },

    previewIconContainer: {
        borderRadius: 50,
        borderWidth: 2,
        padding: 7,
        borderColor: '$draftBlue',

    },

    buttonView: {
        paddingHorizontal: 10,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },

    disabled: {
        backgroundColor: '$disabled',
        borderColor: '$disabledBorder',
        borderWidth: 2,
    }
});

export default  newReportStyles;
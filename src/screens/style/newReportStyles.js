import EStyleSheet from 'react-native-extended-stylesheet';

const newReportStyles = EStyleSheet.create({

    ViewContainer: {
        flex: 1,
        height: 100,
        paddingTop: 5,
        paddingRight: 0,
        paddingLeft: 0,
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

    ReportScrollView: {
        backgroundColor: 'transparent',
        paddingHorizontal: 7,
    },

    dateStyleClass: {
        width: 160,
        marginBottom: 6,
    },

    text: {
        color: '$primaryWhite',
        fontFamily: '$primaryFont',
        fontSize: 16,
        marginBottom: 10,
    },

    linkStyleClass: {
        color: '$draftBlue',
        marginBottom: 6,
        marginTop: 5,
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

    dropdownContainer: {
        margin: 5,
    },

    dropdownButton: {
        width: 180,
        borderWidth: '$containerBorderWidth',
        backgroundColor: '$primaryWhite',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '$dropdownRadius',
        borderColor: '$draftBlue',
    },

    dropdownText: {
        marginVertical: 10,
        marginHorizontal: 6,
        fontSize: 16,
        color: '$gray1',
        textAlign: 'center',
        textAlignVertical: 'center',
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

    linkIconStyle: {
        color: '$gray1',
        justifyContent: 'flex-end',
        fontSize: 18,
        paddingRight: 10,
        paddingLeft: 4,
    },

    dateIconStyle: {
        color: '$gray1',
        paddingLeft: 5,
        paddingRight: 10,
        justifyContent: 'flex-end',
        fontSize: 27,
    },

    multilinedTextInputStyleClass: {
        paddingLeft: 10,
        marginBottom: 6,
        height: 80,
        borderWidth: '$containerBorderWidth',
        borderRadius: '$containerBorderRadius',
        borderColor: '$gray1',
        backgroundColor: '$primaryWhite',
        color: '$gray2',
    },

    instructions: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlignVertical: 'center',
        marginBottom: 6,
        borderWidth: '$containerBorderWidth',
        borderRadius: '$containerBorderRadius',
        borderColor: '$gray1',
        backgroundColor: '$primaryWhite',
        color: '$gray1',
    },

    textInputStyleClass: {
        paddingHorizontal: 12,
        height: 40,
        borderRadius: '$inputBorderRadius',
        backgroundColor: '$primaryWhite',
        fontFamily: '$primaryFont',
        color: '$gray2',
    },

    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#747474',
        color: '#747474',
        marginBottom: 5,
        '@media (max-width: 350)': {
            fontSize: 12,
            marginHorizontal: 5,
        },
        '@media (min-width: 350)': {
            fontSize: 16,
            marginHorizontal: 5,
        }
    },

    radioButtonContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 5,
        paddingHorizontal: 10,
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0f5ff',
        elevation: 15,
        shadowOffset: {
            width: 0,
            height: 15,
        },
    },

    disabled: {
        backgroundColor: '#eee'
    }
});

export default  newReportStyles;
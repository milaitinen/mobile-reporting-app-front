import EStyleSheet from 'react-native-extended-stylesheet';

const newReportStyles = EStyleSheet.create({

    ViewContainer: {
        flex: 1,
        height: 100,
        marginHorizontal: 15,
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
        paddingHorizontal: 10,
        borderTopLeftRadius: '$containerBorderRadius',
        borderTopRightRadius: '$containerBorderRadius',

    },

    ReportScrollView: {
        backgroundColor: 'transparent',
        paddingLeft: 10,
        paddingRight: 10,
    },

    dateStyleClass: {
        width: 160,
        marginBottom: 6,
    },

    textStyleClass: {
        marginLeft: 5,
        color: '#adadad',
        fontSize: 16,
        marginTop: 20,
        marginBottom: 8,
        flexDirection: 'row',
    },

    linkStyleClass: {
        color: '#0016a4',
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
        borderWidth: 1,
        borderColor: '#C4C4C4',
        marginTop: 6,
        marginBottom: 6,
        width: 160,
    },

    dropdownContainer: {
        margin: 5,
    },

    lowerDropdownStyleClass: {
        flex: 1,
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 8,
        paddingLeft: 8,
    },

    dropStyleClass: {
        width: 150,
        height: 300,
        borderColor: 'cornflowerblue',
        borderWidth: 2,
        borderRadius: 3,
    },

    dropIconStyle: {
        color: '#000000',
        fontSize: 20,
        flex: 1,
        left: 25,
        //paddingleft: 10,
    },

    checkboxStyle: {
        marginTop: 6,
        marginBottom: 6,
        borderRadius: '$containerBorderRadius',
    },

    linkIconStyle: {
        color: '#C4C4C4',
        justifyContent: 'flex-end',
        fontSize: 18,
        paddingRight: 10,
        paddingLeft: 4,
    },

    dateIconStyle: {
        color: '#87cce5',
        paddingLeft: 5,
        paddingRight: 10,
        justifyContent: 'flex-end',
        fontSize: 27,
    },

    multilinedTextInputStyleClass: {
        paddingLeft: 10,
        marginBottom: 6,
        height: 80,
        borderWidth: 1,
        borderRadius: '$containerBorderRadius',
        borderColor: '#C4C4C4',
        backgroundColor: '$primaryWhite',
    },

    instructions: {
        paddingLeft: 10,
        marginBottom: 6,
        borderWidth: 1,
        borderRadius: '$containerBorderRadius',
        borderColor: '#C4C4C4',
        backgroundColor: '$primaryWhite',
        color: '#C4C4C4',
    },

    textInputStyleClass: {
        paddingHorizontal: 12,
        marginBottom: 20,
        marginHorizontal: 5,
        height: 40,
        borderWidth: 1,
        borderRadius: '$containerBorderRadius',
        borderColor: '#C4C4C4',
        backgroundColor: '$primaryWhite',
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

    title: {
        marginLeft: 5,
        marginBottom: 10,
        color: '#656a76',
        fontSize: 20,
        flexDirection: 'row',
    },

    buttonView: {
        paddingHorizontal: 10,
        height: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e8faf8',
        elevation: 15,
        shadowOffset: {
            width: 0,
            height: 15,
        },
    }
});

export default  newReportStyles;
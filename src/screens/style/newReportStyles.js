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
        backgroundColor: '#fff',
        marginVertical: 10,
        marginRight: 3,
        marginLeft: 3,
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 20,
        paddingBottom: 13,
        paddingLeft: 13,
        paddingRight: 13,
        borderRadius: '$containerBorderRadius',

    },

    dateStyleClass: {
        width: 160,
        marginBottom: 6,
        marginTop: 6,
    },

    textStyleClass: {
        fontSize: 16,
        marginTop: 8,
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
        backgroundColor: '#e0e8eb',
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: '$dropdownRadius',
        borderWidth: 8,
        borderColor: '#e0e8eb',
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
        flex: 1,
        width: 160,
        height: 160,
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
        color: '#000000',
        justifyContent: 'flex-end',
        fontSize: 18,
        paddingRight: 10,
        paddingLeft: 4,
    },

    dateIconStyle: {
        color: '#000000',
        paddingLeft: 5,
        paddingRight: 10,
        justifyContent: 'flex-end',
        fontSize: 27,
    },

    multilinedTextInputStyleClass: {
        textAlign: 'center',
        paddingTop: 6,
        marginBottom: 6,
        marginTop: 6,
        height: 80,
        borderWidth: 2,
        borderRadius: '$containerBorderRadius',
        borderColor: '#ffffff',
        backgroundColor: '#e0e8eb',
    },

    textInputStyleClass: {
        textAlign: 'center',
        marginBottom: 6,
        marginTop: 6,
        height: 40,
        borderWidth: 2,
        borderRadius: '$containerBorderRadius',
        borderColor: '#ffffff',
        backgroundColor: '#e0e8eb',
    },

    buttonView: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '$darkBlue',
        borderRadius: '$containerBorderRadius',
        backgroundColor: '$darkBlue',
    }
});

export default  newReportStyles;
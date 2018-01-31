import EStyleSheet from 'react-native-extended-stylesheet';

const newReportStyles = EStyleSheet.create({

    ViewContainer: {
        flex: 1,
        paddingTop: 5,
        paddingRight: 0,
        paddingLeft: 0,
        borderTopWidth: 1,
        borderTopColor: '$primaryWhite',

    },

    ReportContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        marginVertical: 10,
        marginRight: 3,
        marginLeft: 3,
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 20,
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius:10,

    },

    dateStyleClass: {
        width: 180,
        //backgroundColor: '#e0e8eb',
        marginBottom: 6,
        marginTop: 6,
    },

    linkStyleClass: {
        color: '#0016a4',
        marginBottom: 6,
        marginTop: 5,
    },

    mainDropdownStyleClass: {
        flex: 1,
        backgroundColor: '#9dcbe5',
        paddingLeft: 10,
        paddingTop:5,
        paddingBottom:5,
        borderRadius:10,
        borderWidth: 8,
        borderColor: '#9dcbe5',
        marginRight: 210,
        marginTop: 6,
        marginBottom: 6,
        width: 160,
    },

    lowerDropdownStyleClass: {
        paddingTop: 6,
        paddingBottom: 6,
        paddingRight: 5,
        paddingLeft: 5,
        width: 120,
    },

    dropStyleClass: {
        flex: 1,
        marginRight: 2,
        marginLeft: 2,
        marginTop: 2,
        marginBottom: 2,
        width: 120,
        height: 120,
    },

    timeIconStyle: {
        color: '#000000',
        paddingLeft: 5,
        paddingRight: 10,
        justifyContent: 'flex-end',
        fontSize: 27,
    },

    multilinedTextInputStyleClass: {
        textAlign: 'center',
        marginBottom: 6,
        marginTop: 6,
        height: 80,
        borderWidth: 2,
        borderRadius:10,
        borderColor: '#ffffff',
        backgroundColor: '#e0e8eb',
    },

    textInputStyleClass: {
        textAlign: 'center',
        marginBottom: 6,
        marginTop: 6,
        height: 40,
        borderWidth: 2,
        borderRadius:10,
        borderColor: '#ffffff',
        backgroundColor: '#e0e8eb',
    },
});

export default  newReportStyles;
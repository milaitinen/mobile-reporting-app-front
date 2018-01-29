import { Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const newReportStyles = EStyleSheet.create({

    MainContainer: {
        // justifyContent: 'center',
        marginRight: 3,
        marginLeft: 3,
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },

    ReportContainer: {

        flex: 1,
        backgroundColor: '#FFF',
        marginRight: 3,
        marginLeft: 3,
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 3,
        paddingLeft: 5,
        paddingRight: 5,

    },

    ViewContainer: {
        flex: 1,
        paddingTop: 5,
        paddingRight: 0,
        paddingLeft: 0,
        borderTopWidth: 1,
        borderTopColor: '$primaryWhite',
    },

    dateStyleClass: {
        width: 180,
        backgroundColor: '#FFF',
        marginBottom: 6,
        marginTop: 5,
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
        marginTop: 5,
    },

    lowerDropdownStyleClass: {
        paddingTop: 6,
        paddingBottom: 6,
        paddingRight: 5,
        paddingLeft: 5,
        width: 140,
    },

    dropStyleClass: {
        flex: 1,
        marginRight: 2,
        marginLeft: 2,
        marginTop: 2,
        marginBottom: 2,
        width: 180,
        height: 120,
    },

    textInputStyleClass: {
        textAlign: 'center',
        marginBottom: 6,
        marginTop: 6,
        height: 40,
        borderWidth: 2,
        borderColor: '#000000',
        backgroundColor: '#FFF',
    },
});

export default  newReportStyles;
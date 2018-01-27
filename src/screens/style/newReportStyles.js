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

    ViewContainer: {
        flex: 1,
        paddingTop: 5,
        paddingRight: 0,
        paddingLeft: 0,
        borderTopWidth: 1,
        borderTopColor: '$primaryWhite',
    },

    DateContainer: {
        width: 200,
        backgroundColor: '#FFF',
        marginBottom: 6,
        marginTop: 6
    },

    LinkContainer: {
        color: 'blue',
        marginBottom: 6,
        marginTop: 6
    },

    DropContainer: {
        flex: 1,
        backgroundColor: '#9dcbe5',
        paddingTop:5,
        paddingBottom:5,
        borderRadius:10,
        borderWidth: 5,
        borderColor: '#9dcbe5',
        marginRight: 230,
        marginTop: 4
    },

    DropStyleClass: {
        flex: 1,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        height: 120,
    },

    TextInputStyleClass: {
        textAlign: 'center',
        marginBottom: 6,
        marginTop: 6,
        height: 40,
        borderWidth: 2,
        borderColor: '#0000bd',
        backgroundColor: '#FFF',
    },
});

export default  newReportStyles;
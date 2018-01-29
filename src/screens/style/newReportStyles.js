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
        color: '#FFF',
        marginBottom: 6,
        marginTop: 6
    },

    MainDropdownStyleClass: {
        flex: 1,
        backgroundColor: '#9dcbe5',
        paddingLeft: 10,
        paddingTop:5,
        paddingBottom:5,
        borderRadius:10,
        borderWidth: 8,
        borderColor: '#9dcbe5',
        marginRight: 210,
        marginTop: 6
    },

    LowerDropdownStyleClass: {
        paddingTop: 6,
        paddingBottom: 6,
        paddingRight: 5,
        paddingLeft: 5,
        width: 140
    },

    DropStyleClass: {
        flex: 1,
        marginRight: 2,
        marginLeft: 2,
        marginTop: 2,
        marginBottom: 2,
        width: 180,
        height: 120
    },

    TextInputStyleClass: {
        textAlign: 'center',
        marginBottom: 6,
        marginTop: 6,
        height: 40,
        borderWidth: 2,
        borderColor: '#0000bd',
        backgroundColor: '#FFF'
    },
});

export default  newReportStyles;
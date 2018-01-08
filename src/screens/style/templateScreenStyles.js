import { Platform, StyleSheet } from 'react-native';

const templateScreenStyles = StyleSheet.create({

    gradient: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 0,
        flex: 1,
        width: null,
        height: null,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    },

    viewContainer: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 0,
        paddingLeft: 0,
        borderTopWidth: 1,
        borderTopColor: '#fff',

    },

    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'transparent',
        paddingLeft: 0,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },

    container: {
        flex: 1,
        backgroundColor: '#455fa1'
    },

    searchBarContainer: {
        paddingBottom: (Platform.OS === 'ios') ? 20 : 5,
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        borderTopWidth:0,
        paddingRight: 35,
        paddingLeft: 35,
    },

    searchIcon: {
        paddingLeft: 32,
        paddingRight: 5,
        fontSize: 20,
    },

    searchBarInput: {
        backgroundColor: '#fff',
    }
});

export default templateScreenStyles;





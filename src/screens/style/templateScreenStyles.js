import { Platform, StyleSheet } from 'react-native';

const templateScreenStyles = StyleSheet.create({

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
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
        backgroundColor: '#3d4f7c'
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
        paddingLeft: 35,
    },

    searchBarInput: {
        backgroundColor: '#fff'
    }
});

export default templateScreenStyles;





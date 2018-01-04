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
        // margin: 10,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    ListItemStyle: {
        height: 50
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
    },

    searchBarInput: {
        backgroundColor: 'transparent'
    }
});

export default templateScreenStyles;





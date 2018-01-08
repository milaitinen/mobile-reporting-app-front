import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    title: {
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    searchBarContainer: {
        paddingBottom: (Platform.OS === 'ios') ? 20 : 5,
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        borderTopWidth:0,
        marginLeft: 10,
        marginRight: 20,
        width: 160,
    },
    section: {
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    MainContainer: {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    container: {
        backgroundColor: '#fff',
        margin:10,
        overflow:'hidden'
    },
    ListItemStyle: {
        height: 50
    },
});

export default styles;
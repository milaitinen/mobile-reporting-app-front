import { StyleSheet } from 'react-native';

const panelStyles = StyleSheet.create({
    ListItemStyle: {
        height: 50,
        borderRadius: 10,
        backgroundColor: '#fff',
    },

    container: {
        backgroundColor: '#e6e6e6',
        margin:10,
        overflow:'hidden',
        borderRadius: 10,
        height: 80
    },

    titleContainer: {
        flexDirection: 'row'
    },

    rightIconStyle: {
        marginRight: 10,
        fontSize: 25,
    },

    title: {
        flex: 1,
        padding: 10,
        color:'#2a2f43',
        fontWeight:'bold'
    },

    buttonText: {
        fontWeight:'bold',
        fontSize: 25,
        paddingRight: 15,
    },

    body: {
        padding: 10,
        paddingTop: 0
    }
});

export default panelStyles;
import { StyleSheet } from 'react-native';

const panelStyles = StyleSheet.create({
    ListItemTitleStyle: {
        height:60,
        borderRadius: 10,
        backgroundColor: '#fff',
    },

    ListItemStyle: {
        height: 50,
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
        marginRight: 5,
        fontSize: 40,
        backgroundColor: '#39ac56',
        paddingLeft: 2,
        paddingRight: 2,
        borderRadius: 8,
        //borderColor: '#000',
        //borderWidth: 1
    },

    leftIconStyle: {
        marginLeft: 5,
        fontSize: 40
    },

    badgeContainerStyleA: {
        backgroundColor: '#00b33c',
    },

    badgeContainerStyleP: {
        backgroundColor: '#ffb84d',
    },

    badgeTextStyle: {
        color: '#666666',
        padding: 1
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
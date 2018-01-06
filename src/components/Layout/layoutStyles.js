import { StyleSheet } from 'react-native';

const layoutStyles = StyleSheet.create({
    ListItemTitleStyle: {
        height: 70,
        //borderRadius: 10,
        backgroundColor: '#fff',
        paddingTop: 0,
        paddingRight: 0,
        paddingVertical: 20,
    },

    ListItemStyle: {
        height: 70,
        borderBottomColor: '#b4b4b470',
    },

    container: {
        backgroundColor: '#e0e8eb',
        margin: 10,
        overflow:'hidden',
        borderRadius: 10,
        height: 60,
    },

    titleContainer: {
        flexDirection: 'row',
        //paddingTop: 10,
    },

    titleStyle: {
        paddingTop: 10,
    },

    rightIconStyle: {
        marginRight: 3,
        marginTop: 2,
        marginBottom: 1,
        fontSize: 45,
        color: '#77a482',
        backgroundColor: '#99d9ad',
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 10,
        //borderColor: '#000',
        //borderWidth: 1
    },

    leftIconStyle: {
        marginLeft: 5,
        fontSize: 40,
        color: '#b4b4b4'
    },

    badgeContainerStyleA: {
        backgroundColor: '#77a482',
        elevation: 5,
    },

    badgeContainerStyleP: {
        backgroundColor: '#f3fe99',
        elevation: 5,
    },

    badgeTextStyle: {
        color: '#666666',
        padding: 1
    },

    body: {
        padding: 10,
        paddingTop: 0
    },

    more: {
        color: '#5088b8',
        textDecorationLine: 'underline',
        padding: 10,
        textAlign: 'center',
    },
});

export default layoutStyles;
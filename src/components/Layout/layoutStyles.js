import { StyleSheet } from 'react-native';

const layoutStyles = StyleSheet.create({
    ListItemTitleStyle: {
        height: 60,
        borderRadius: 5,
        backgroundColor: '#fff',
        paddingTop: 0,
        paddingRight: 0,
        paddingLeft: 1,
        paddingVertical: 0,
        paddingBottom: 0,
    },

    ListItemStyle: {
        height: 60,
        borderBottomColor: '#b4b4b470',

    },

    container: {
        backgroundColor: '#e0e8eb',
        margin: 10,
        overflow:'hidden',
        borderRadius: 5,
        height: 60,
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 3,
        }
    },

    titleContainer: {
        flexDirection: 'row',
        paddingRight: 2,
        paddingLeft: 0,

        //paddingTop: 10,
    },

    titleStyle: {
        paddingTop: 5,
        fontFamily: 'Roboto-Light',
        fontSize: 18,
    },

    listTitleStyle :{
        fontFamily: 'Roboto-Light',
        fontSize: 16,
        marginRight: 0,
    },

    rightIconStyle: {
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        fontSize: 50,
        color: '#77a482',
        backgroundColor: '#99d9ad',
        paddingLeft: 8,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 6,
        borderRadius: 5,
        //borderColor: '#000',
        //borderWidth: 1
    },

    leftIconStyle: {
        marginLeft: 0,
        fontSize: 50,
        color: '#b4b4b4',
        paddingRight: 0,
    },

    badgeContainerStyleA: {
        backgroundColor: '#77a482',
        elevation: 5,
        borderRadius: 5,
    },

    badgeContainerStyleP: {
        backgroundColor: '#f3fe99',
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        borderRadius: 5,
        //paddingRight: 3,
        //paddingLeft: 3,
    },

    badgeTextStyle: {
        color: '#666666',
        padding: 1
    },

    body: {
        padding: 10,
        paddingTop: 0,
    },

    more: {
        color: '#5088b8',
        textDecorationLine: 'underline',
        padding: 10,
        textAlign: 'center',
    },
});

export default layoutStyles;
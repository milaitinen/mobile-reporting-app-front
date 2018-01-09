import { StyleSheet } from 'react-native';

const layoutStyles = StyleSheet.create({

    badgeTextStyle: {
        color: '#666666',
        padding: 1
    },

    badgeContainerStyleA: {
        backgroundColor: '#77a482',
        elevation: 5,
        borderRadius: 5,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    badgeContainerStyleP: {
        backgroundColor: '#f3fe99',
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        borderRadius: 5,
    },

    animatedContainer: {
        backgroundColor: '#e0e8eb',
        margin: 10,
        marginLeft:0,
        marginRight: 0,
        overflow:'hidden',
        borderRadius: 5,
        height: 60,
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 3,
        }
    },

    templateContainer: {
        height: 60,
        borderRadius: 5,
        backgroundColor: '#fff',
        paddingTop: 0,
        paddingRight: 0,
        paddingLeft: 1,
        paddingVertical: 0,
        paddingBottom: 0,
    },

    addReport: {
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
    },

    folderIcon: {
        marginLeft: 0,
        fontSize: 50,
        color: '#b4b4b4',
        paddingRight: 0,
    },

    reportListContainer: {
        padding: 10,
        paddingTop: 0,
    },

    reportContainer: {
        height: 60,
        borderBottomColor: '#b4b4b470',

    },

    titleContainer: {
        flexDirection: 'row',
        paddingRight: 2,
        paddingLeft: 0,
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

    more: {
        color: '#6da7e7',
        textDecorationLine: 'underline',
        padding: 10,
        textAlign: 'center',
    },
});

export default layoutStyles;
import EStyleSheet from 'react-native-extended-stylesheet';
import normalize from 'react-native-elements/src/helpers/normalizeText';

const layoutStyles = EStyleSheet.create({

    BadgeViewContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    badgeTextStyle: {
        color: '#666666',
        padding: 0,
    },

    badgeIconStyle: {
        color: '#666666',
        paddingLeft: 5,
        justifyContent: 'flex-end',
        fontSize: 20,
    },

    badgeContainerStyle: {
        elevation: 3,
        // width: 100,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    dateAccepted: {
        paddingTop: 2,
        color: '#86939e',
        fontSize: normalize(12),    // Normalizes the size of fonts across devices.
        fontWeight: 'bold',
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
        backgroundColor: '$primaryWhite',
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

    more: {
        color: '#6da7e7',
        textDecorationLine: 'underline',
        padding: 10,
        textAlign: 'center',
    },
});

export default layoutStyles;
import EStyleSheet from 'react-native-extended-stylesheet';
import normalize from "react-native-elements/src/helpers/normalizeText";

export default EStyleSheet.create({

    animatedContainer: {
        backgroundColor: '#e0e8eb',
        marginLeft:0,
        marginRight: 0,
        overflow:'hidden',
        borderRadius: '$containerBorderRadius',
        height: 65,
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        '@media (max-width: 350)': {
            height: 55,
            margin: 8,
        },
        '@media (min-width: 350)': {
            height: 65,
            margin: 10,
        }
    },

    templateContainer: {
        borderRadius: 5,
        flexDirection: 'column',
        backgroundColor: '$primaryWhite',
        paddingTop: 0,
        paddingRight: 0,
        paddingLeft: 0,
        paddingVertical: 0,
        paddingBottom: 0,
        '@media (max-width: 350)': {
            height: 55,
        },
        '@media (min-width: 350)': {
            height: 65,
        }
    },

    subtitleContainer: {
        flexDirection: 'column',
    },

    subtitle: {
        color: '#86939e',
        fontSize: normalize(12),    // Normalizes the size of fonts across devices.
        fontWeight: 'bold',
    },

    folderIcon: {
        marginLeft: 0,
        color: '#b4b4b4',
        paddingRight: 0,
        '@media (max-width: 350)': {
            fontSize: 40,
        },
        '@media (min-width: 350)': {
            fontSize: 50,
        }
    },

    reportListContainer: {
        paddingTop: 0,
        '@media (max-width: 350)': {
            padding: 7,
        },
        '@media (min-width: 350)': {
            padding: 10,
        }
    },

    reportContainer: {
        borderBottomColor: '#b4b4b470',

        '@media (max-width: 350)': {
            height: 60,
        },
        '@media (min-width: 350)': {
            height: 60,
        }

    },

    reportTitle: {
        '@media (max-width: 350)': {
            fontSize: 12
        } ,
    },

    more: {
        color: '#6da7e7',
        textDecorationLine: 'underline',
        padding: 10,
        textAlign: 'center',

        '@media (max-width: 350)': {
            padding: 7,
            fontSize: 12,
        },
        '@media (min-width: 350)': {
            padding: 10,
        },
    },

    noMoreReports: {
        color: '#a9a9a9',
        padding: 10,
        textAlign: 'center',

        '@media (max-width: 350)': {
            padding: 7,
            fontSize: 12,
        },
        '@media (min-width: 350)': {
            padding: 10,
        },
    },
});
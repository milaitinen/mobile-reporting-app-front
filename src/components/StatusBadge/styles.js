import EStyleSheet from 'react-native-extended-stylesheet';
import normalize from "react-native-elements/src/helpers/normalizeText";

const styles = EStyleSheet.create({


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
        //width: 100,
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




});

export default styles;
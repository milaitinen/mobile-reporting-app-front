import EStyleSheet from 'react-native-extended-stylesheet';

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
        width: 100,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },



});

export default styles;
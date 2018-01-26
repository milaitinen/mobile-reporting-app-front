import EStyleSheet from 'react-native-extended-stylesheet';

const templateScreenStyles = EStyleSheet.create({
    $statusBar: '$darkBlue',

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    },

    viewContainer: {
        flex: 1,
        paddingTop: 5,
        paddingRight: 0,
        paddingLeft: 0,
        borderTopWidth: 1,
        borderTopColor: '$primaryWhite',

    },

    scrollView: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'transparent',
        paddingLeft: 0,
    },

});

export default templateScreenStyles;





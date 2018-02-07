import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    $blue1: '$darkBlue',
    $blue2: '$darkerBlue',
    $blue3: '$darkestBlue',

    gradientBg: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 0,
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },

    gradientNoPadding: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
});
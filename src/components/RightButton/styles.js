import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({

    backgroundStyle: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderRadius: '$containerBorderRadius',
        justifyContent: 'flex-end',
        flex: 0,
    },

    iconStyle: {
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        // borderRadius: 5,
        '@media (max-width: 350)': {
            fontSize: 40,
            paddingRight: 2,
            paddingLeft: 2,
            paddingTop: 4,
            paddingBottom: 5,
        },
        '@media (min-width: 350)': {
            fontSize: 50,
            paddingRight: 5,
            paddingLeft: 8,
            paddingTop: 5,
            paddingBottom: 6,
        },
    },


});

export default styles;
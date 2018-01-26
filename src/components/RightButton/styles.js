import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({

    backgroundStyle: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderRadius: 5,
        justifyContent: 'flex-end',
        flex: 0,
    },

    separator:{
        borderRightWidth: 0,
        borderColor: '#fff',
    },

    iconStyle: {
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        fontSize: 50,
        paddingLeft: 8,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 6,
       // borderRadius: 5,
    },


});

export default styles;
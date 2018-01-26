import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({

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
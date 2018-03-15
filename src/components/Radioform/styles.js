import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({

    radioInputContainer: {
        height: 40,
        paddingTop: 5,
        paddingHorizontal: 10,
        marginBottom: 2,
        marginHorizontal: 0,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: '$inputBorderRadius',
        backgroundColor: '$primaryWhite',
    },

    radioLabel: {
        fontFamily: '$primaryFont',
        color: '$placeholder',
        textAlignVertical: 'center',
        textAlign: 'left',
        paddingBottom: 3,
        marginRight: 10
    },

});

export default styles;
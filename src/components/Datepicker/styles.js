import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    $gray1: '$placeholder',
    $gray2: '$disabledPlaceholder',
    $disabledBg: '$disabled',
    $inputRadius: '$inputBorderRadius',
    $gray3: '$disabledBorder',
    $robotoLight: '$primaryFont',

    container: {
        width: 160,
        marginBottom: 10,
    },

    dateIcon: {
        color: '$inactive',
        paddingLeft: 5,
        paddingRight: 10,
        justifyContent: 'flex-end',
    },

    dateText: {
        color: '$placeholder',
        fontFamily: '$primaryFont',
    },

    disabledIcon: {
        color: '$disabledPlaceholder',
        paddingLeft: 5,
        paddingRight: 10,
        justifyContent: 'flex-end',
    }
});

export default styles;
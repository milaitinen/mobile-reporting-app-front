import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    dateStyleClass: {
        width: 160,
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
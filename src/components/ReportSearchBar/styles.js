import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';

export default EStyleSheet.create({
    searchBarContainer: {
        paddingBottom: 5,
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        borderTopWidth:0,
        paddingRight: 35,
        paddingLeft: 35,
    },

    searchBarInput: {
        backgroundColor: '$primaryWhite',
    },

    searchIcon: {
        paddingLeft: 32,
        paddingRight: 5,
        fontSize: 20,
    },

});
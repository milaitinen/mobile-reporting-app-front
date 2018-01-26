import { Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const newReportStyles = EStyleSheet.create({
    MainContainer: {
        // justifyContent: 'center',
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },

    TextInputStyleClass: {
        textAlign: 'center',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        borderColor: '#FF5722',
    },
});

export default  newReportStyles;
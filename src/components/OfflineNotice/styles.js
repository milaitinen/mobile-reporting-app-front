import EStyleSheet from 'react-native-extended-stylesheet';
import {
    StatusBar,
    Platform,
    Dimensions,
} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export default EStyleSheet.create({

    offlineContainer: {
        height: STATUSBAR_HEIGHT,
        width: Dimensions.get('window').width,
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        flexDirection: 'row',
        top: 0,
        position: 'absolute',
        alignSelf: 'stretch',
    },

});
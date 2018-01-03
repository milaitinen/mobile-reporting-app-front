import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    ImageStyle: {
        paddingTop: 10,
        paddingBottom: 15,
        paddingRight: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode : 'stretch',
        alignItems: 'center'
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        alignSelf: 'center',
        height: 40,
        width: 250,
        margin: 10
    },
    TextInputStyleClass: {

    // textAlign: 'center',
        width: 215,
        height: 40,
        fontFamily: 'Roboto-Light',
        fontSize: 16,
        color: 'white',
        alignSelf: 'center',
        marginLeft: 5,
    // borderWidth: 1,
    // borderColor: '#FF5722',

    // Set border Radius.
    // borderRadius: 10 ,
    },
});

export default styles;
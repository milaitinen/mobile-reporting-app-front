import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

export default class ReportsScreen extends React.Component {

    handleButtonPress = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Reports Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#4F6D7A',
        width: 250,
        height: 50,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        color: 'black',
    }
});
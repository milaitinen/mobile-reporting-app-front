import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Alert,
    Platform,
    TextInput,
    Button,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import {url} from './urlsetting';

class ReviewScreen extends Component {
    static displayName = 'ReviewScreen';

    constructor(props)
    {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {
        
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                }, function() {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={[styles.container]}>

                    <ActivityIndicator
                        animating={this.state.animating}
                        style={[styles.centering, {height: 80}]}
                        size='large'
                    />

                </View>
            );
        }

        return (
            <View style={{flex: 1}}>
                <ScrollView contentContainerStyle={styles.MainContainer}>

                    <FlatList
                        data={ this.state.dataSource }
                        renderItem={({item}) =>
                            <Text style={styles.FlatListItemStyle}>
                                > {item.name}
                            </Text>}
                            keyExtractor={(item, index) => index}
                    />
                </ScrollView>
                <View>
                    <TouchableOpacity
                        //onPress={this.InsertDataToServer}
                        onPress={() => this.props.navigation.navigate('NewForm')}
                        style={styles.newReportButton} >
                        <Text style={styles.plus}>
                            +
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const circle = {
    borderWidth: 0,
    borderRadius: 40,
    width: 80,
    height: 80
};


const styles = StyleSheet.create({

    plus: {
        fontSize: 40,
        color: 'white',
        marginBottom: 3,
    },

    newReportButton: {
        ...circle,
        backgroundColor: '#349d4a',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,

    },

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },

    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        //margin: 10,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    FlatListItemStyle: {
        padding: 10,
        fontSize: 15,
        height: 44
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    linkButton: {
        textAlign: 'center',
        color: '#CCCCCC',
        marginBottom: 10,
        padding: 5
    }
});

export default ReviewScreen;

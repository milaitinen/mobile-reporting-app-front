import React, { Component } from 'react';
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

import renderIf from './renderIf';
import { url } from './urlsetting';

class TemplateScreen extends Component {
    static displayName = 'TemplateScreen';

    constructor(props)
    {
        super(props);
        this.state = {
            isLoading: true,
            refreshing: false,
            switch: true,
        };
    }

    componentDidMount() {

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    refreshing: false,
                    dataSource: responseJson
                }, function() {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleRefresh = () => {
        this.setState(
            {
                refreshing: true,
            },
            () => {
                this.componentDidMount();
            }
        );

    }



    render() {

        if (this.state.isLoading) {
            return (
                <View style={[styles.container]}>

                    <ActivityIndicator
                        animating={this.state.animating}
                        style={[styles.activityIndicator, { height: 80 }]}
                        size='large'
                    />

                </View>
            );
        }

        return (
            <View style={{ flex: 1 }}>

                <ScrollView contentContainerStyle={styles.MainContainer}>

                    {renderIf(this.state.switch,
                        <FlatList
                            data={ this.state.dataSource }
                            renderItem={({ item }) =>
                                <Text style={styles.FlatListItemStyle}>
                                    > {item.name}
                                </Text>}
                            keyExtractor={(item, index) => index}
                            refreshing={this.state.refreshing}
                            //onRefresh={this.handleRefresh}
                        />
                    )}
                    {renderIf(!this.state.switch,
                        <Text style={styles.exampleText}>
                            Implement Cardview here
                        </Text>
                    )}

                    <TouchableOpacity
                        style={styles.switchButton}
                        onPress={() => this.setState({ switch: !this.state.switch }) } >
                        <Text style={styles.switchText}>
                            Switch between listview and cardview
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('NewForm', { refresh: this.handleRefresh }) }
                        style={styles.newReportButton} >
                        <Text style={styles.plus}>
                            +
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
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

    switchText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
    },

    switchButton: {
        position: 'absolute',
        bottom:0,
        right:0,
        backgroundColor: '#349d4a',

    },

    exampleText: {
        fontSize: 40,
        textAlignVertical: 'center',
        textAlign: 'center',
    },

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
        // margin: 10,
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
    }
});

export default TemplateScreen;
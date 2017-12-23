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
import { ListItem } from 'react-native-elements';

import Panel from './Panel';
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

        fetch(url + '/layouts')
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

        fetch(url + '/forms')
            .then((response2) => response2.json())
            .then((responseJson2) => {
                this.setState({
                    isLoading: false,
                    refreshing: false,
                    dataSource2: responseJson2
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

    onRowPress = () => {
        this.props.navigation.navigate('NewForm', { refresh: this.handleRefresh });
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


                    <FlatList
                        data={ this.state.dataSource }
                        renderItem={({ item }) =>

                            <Panel
                                title={item.title}
                                onRowPress={this.onRowPress} >
                                <FlatList
                                    data={ this.state.dataSource2 }
                                    renderItem={({ item }) =>
                                        <Text
                                            style={styles.FlatListItemStyle}
                                            //onPress={() => this.props.navigation.navigate('Reports')}
                                        >
                                            {item.title}
                                        </Text>

                                    }
                                    keyExtractor={item => item.orderNo}
                                />
                            </Panel>

                        }
                        keyExtractor={item => item.id}
                        refreshing={this.state.refreshing}

                    />


                </ScrollView>
            </View>
        );
    }
}



const styles = StyleSheet.create({


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
        fontSize: 18,
        height: 60
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default TemplateScreen;
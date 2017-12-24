import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Platform,
    ActivityIndicator,
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

        this.getLayoutsAndForms();

    }

    getLayouts() {

        fetch(url + '/layouts')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    refreshing: false,
                    dataLayouts: responseJson
                }, function() {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });

    }

    getForms() {

        fetch(url + '/forms')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    refreshing: false,
                    dataForms: responseJson
                }, function() {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });

    }

    getLayoutsAndForms() {
        return Promise.all([this.getLayouts(), this.getForms()]);
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
                        data={ this.state.dataLayouts }
                        renderItem={({ item, index }) =>
                            <Panel
                                title={item.title}
                                onRowPress={this.onRowPress} >
                                <FlatList
                                    data={ this.state.dataForms }
                                    renderItem={({ item }) =>
                                        (item.layoutID === index + 1) ?

                                            <ListItem
                                                style={styles.FlatListItemStyle}
                                                //onPress={() => this.props.navigation.navigate('Reports')}
                                                title={item.title}
                                                subtitle={item.dateCreated}
                                            />
                                            :null

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
        //fontSize: 18,
        height: 60
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default TemplateScreen;
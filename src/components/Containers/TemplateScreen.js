import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Platform,
    ActivityIndicator,
    ScrollView,
    Text
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
            arr: [],
            isLoading: true,
            refreshing: false,
        };
    }

    componentDidMount() {

        this.getLayoutsAndForms();

    }


    getLayoutsAndForms = () => {

        fetch(url + '/layouts')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    //isLoading: false,
                    //refreshing: false,
                    dataLayouts: responseJson
                });
            })
            .then(()=> {

                for (let i = 1; i <= 5; i++) {      // i <= this.state.dataLayouts.length
                    fetch(url + '/forms?layoutid=' + i)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({
                                arr: this.state.arr.concat([responseJson]),
                                isLoading: false,
                                refreshing: false,
                            });
                        });

                }
            }).catch((error) => {
                console.error(error);
            }).done();

    }


    handleRefresh = () => {
        this.setState(
            {
                refreshing: true,
            },
            () => {
                //this.componentDidMount();
                this.getLayoutsAndForms();
            }
        );

    }

    createNew = () => {
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
                                createNew={this.createNew}
                                nofForms={this.state.arr[0].length} >
                                <FlatList
                                    data={ this.state.arr[index] }
                                    renderItem={({ item }) =>
                                        <ListItem
                                            containerStyle={ styles.ListItemStyle }
                                            title={item.title}
                                            subtitle={item.dateCreated}
                                            hideChevron={true}
                                        />
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
    ListItemStyle: {
        height: 50
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default TemplateScreen;
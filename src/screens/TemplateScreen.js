import React, { Component } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import templateScreenStyles from './style/templateScreenStyles';
import LinearGradient from 'react-native-linear-gradient';

import { Panel } from '../components/Panel';
import { url } from './urlsetting';
import loginStyles from './style/styles';


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


    getFormsByLayouts = () => {
        const formsByLayout = [];
        for (let i = 1; i <= this.state.dataLayouts.length; i++) {      // i <= this.state.dataLayouts.length
            fetch(url + '/forms?layoutid=' + i)
                .then((response) => response.json())
                .then((responseJson) => {
                    formsByLayout.push(responseJson);

                });

        }
        return formsByLayout;
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
                const promises = [];
                for (let i = 1; i <= this.state.dataLayouts.length; i++) {
                    const orgReposUrl = url + '/forms?layoutid=' + i;
                    promises.push(fetch(orgReposUrl).then(response => response.json()));

                }

                Promise.all(promises)
                    .then(data => {
                        this.setState({
                            arr: data,
                            isLoading: false,
                            refreshing: false,
                        });
                    })
                    .catch(err => console.error(err));


            })
            .catch((error) => {
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
                <View style={[templateScreenStyles.container]}>

                    <ActivityIndicator
                        animating={this.state.animating}
                        style={[templateScreenStyles.activityIndicator, { height: 80 }]}
                        size='large'
                    />

                </View>
            );
        }

        return (
            <LinearGradient
                colors={['#3d4f7c', '#31456f', '#1b3055']}
                style={loginStyles.contentContainer}
            >
                <View style={{ flex: 1 }}>

                    <SearchBar
                        lightTheme
                        containerStyle = {templateScreenStyles.searchBarContainer}
                        backgroundColor = { 'transparent'}
                        placeholder='Search for reports' />

                    <ScrollView contentContainerStyle={templateScreenStyles.MainContainer}>

                        <FlatList
                            data={ this.state.dataLayouts }
                            renderItem={({ item, index }) =>
                                <Panel
                                    title={item.title}
                                    createNew={this.createNew}
                                    nofForms={this.state.arr[index].length} >
                                    <FlatList
                                        data={ this.state.arr[index] }
                                        renderItem={({ item }) =>
                                            <ListItem
                                                key={item.title}
                                                containerStyle={ templateScreenStyles.ListItemStyle }
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
            </LinearGradient>
        );
    }
}

export default TemplateScreen;

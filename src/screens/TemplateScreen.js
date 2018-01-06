import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Platform,
    ActivityIndicator,
    ScrollView,
    AsyncStorage,
    NetInfo
} from 'react-native';
import { ListItem } from 'react-native-elements';

import { Layout } from '../components/Layout';
import { url } from './urlsetting';


class TemplateScreen extends Component {
    static displayName = 'TemplateScreen';
    constructor(props)
    {
        super(props);
        this.state = {
            dataLayouts     : [],
            formsByLayouts  : [],    // Array in which the forms will be appended to by their specific LayoutID.
            isLoading       : true,  // Checks whether the app is loading or not.
            refreshing      : false, // Checks whether the app and its data is refreshing or not.
        };
    }

    /*
     componentDidMount() is invoked immediately after the component is mounted. Initialization that requires
     DOM nodes happens here. The function calls getLayouts which loads data from a remote url,
     and instantiates the network request.
    */
    componentDidMount() {
        this.getLayoutsAndForms();
    }

    // Necessary because of a bug on iOS https://github.com/facebook/react-native/issues/8615#issuecomment-287977178
    isNetworkConnected = () => {
        if (Platform.OS === 'ios') {
            return new Promise(resolve => {
                const handleFirstConnectivityChangeIOS = isConnected => {
                    NetInfo.isConnected.removeEventListener('connectionChange', handleFirstConnectivityChangeIOS);
                    resolve(isConnected);
                };
                NetInfo.isConnected.addEventListener('connectionChange', handleFirstConnectivityChangeIOS);
            });
        }
        return NetInfo.isConnected.fetch();
    };

    getLocalData = (url) => {
        return AsyncStorage.getItem(url)
            .then(data => {
                if (data !== null) {
                    return JSON.parse(data);
                } else {
                    return [];
                }
            });
    };

    saveData = (url, data) => {
        AsyncStorage.setItem(url, JSON.stringify(data));
    };

    getRemoteData = (url) => {
        return (
            fetch(url)
                .then(response => {
                    return response.json();
                })
        );
    };

    /*
     Fetches the data from the server in two parts.
     1) Fetches the layouts from the server
     2) Fetches the forms under their specific layout by making a separate fetch request using
        Promise.all. After the all the promises have been fetched, the function updates the state
        of formsByLayouts, and sets isLoading and refreshing to false.
    */
    getLayoutsAndForms = () => {
        this.getData(url + '/layouts')
            .then(responseJson => this.setState({ dataLayouts: responseJson }))
            .then(() => {
                const formsByLayoutID = [];
                for (let i = 1; i <= this.state.dataLayouts.length; i++) {
                    const orgReposUrl = url + '/forms?layoutid=' + i;
                    formsByLayoutID.push(this.getData(orgReposUrl));
                }
                Promise.all(formsByLayoutID)
                    .then(data => { this.setState({ formsByLayouts: data, isLoading: false, refreshing: false, }); })
                    .catch(err => console.error(err));
            })
            .catch(error => console.error(error) )
            .done();
    };

    getData = (dataUrl) => {
        return this.isNetworkConnected()
            .then((isConnected) => {
                if (!isConnected) { return this.getLocalData(dataUrl);  }
                return this.getRemoteData(dataUrl);
            })
            .then((data) => {
                this.saveData(dataUrl, data);
                return data;
            });
    };

    // Handler function for refreshing the data and refetching.
    handleRefresh = () => {
        this.setState(
            { refreshing: true, },
            () => { this.getLayoutsAndForms(); }
        );
    };

    /*
     Function that passes navigation props and navigates to NewFormScreen.
     This makes it possible for the Layout component to navigate.
     Also passes the refresh function and the specific layoutID so that the
     app knows to which layout the new report has to be added.
    */
    createNew = (layoutID) => {
        this.props.navigation.navigate('NewForm', { refresh: this.handleRefresh, layoutID: layoutID });
    };

    viewAllReports = () => {
        this.props.navigation.navigate('ReportsPage');
    };

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
                        /* Lists the layouts in a FlatList component. Each FlatList item is rendered using a
                           custom Layout component. The Layout component has a FlatList component as its child
                           component, which lists the specific forms under the right layout. The component and its
                           props are explained in its class more specifically.
                         */
                        data={ this.state.dataLayouts } // The data in which the layouts are stored.
                        renderItem={({ item, index }) => // Renders each layout separately.
                            <Layout
                                title={item.title} // Title of the layout
                                createNew={this.createNew} // Passes the createNew function to the Layout component.
                                viewAllReports={this.viewAllReports}
                                nofForms={this.state.formsByLayouts[index].length} /* Passes the number of reports to
                                                                                      Layout component. */
                                layoutID={item.id} // Passes the id of the Layout.
                            >
                                <FlatList
                                    data={ this.state.formsByLayouts[index] } /* Renders the forms from the state array
                                                                                 with the help of an index from the earlier
                                                                                 renderItem function. */
                                    renderItem={({ item }) =>
                                        <ListItem
                                            key={item.title}
                                            containerStyle={ styles.ListItemStyle }
                                            title={item.title}
                                            subtitle={item.dateCreated}
                                            hideChevron={true}
                                        />
                                    }
                                    keyExtractor={item => item.orderNo}
                                />
                            </Layout>
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

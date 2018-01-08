import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Platform,
    ActivityIndicator,
    ScrollView,
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
            formsByLayouts  : [],    // Array in which the forms will be appended to by their specific LayoutID.
            isLoading       : true,  // Checks whether the app is loading or not.
            refreshing      : false, // Checks whether the app and its data is refreshing or not.
        };
    }

    /*
     componentDidMount() is invoked immediately after the component is mounted. Initialization that requires
     DOM nodes happens here. The function calls getLayoutsAndForms which loads data from a remote url,
     and instantiates the network request.
    */

    componentDidMount() {

        this.getLayoutsAndForms();

    }

    /*
     Fetches the data from the server in two parts.
     1) Fetches the layouts from the server
     2) Fetches the forms under their specific layout by making a separate fetch request using
        Promise.all. After the all the promises have been fetched, the function updates the state
        of formsByLayouts, and sets isLoading and refreshing to false.
    */
    getLayoutsAndForms = () => {

        fetch(url + '/layouts')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
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
                            formsByLayouts: data,
                            isLoading: false,
                            refreshing: false,
                        });
                    })
                    .catch(err => console.error(err));


            })
            .catch((error) => {
                console.error(error);
            }).done();

    };

    // Handler function for refreshing the data and refetching.

    handleRefresh = () => {
        this.setState(
            {
                refreshing: true,
            },
            () => {
                this.getLayoutsAndForms();
            }
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


    /*
     Function for viewing all the reports of a certain template. Navigates to ReportsScreen.
     Also passes the title, number of forms, the reports and the layoutID and createNew function
     as navigation props.
     */
    viewAllReports = (title, layoutID, forms) => {
        this.props.navigation.navigate('ReportsPage', {
            new: this.createNew,
            title: title,
            nofForms: forms,
            reports: this.state.formsByLayouts[layoutID - 1],
            layoutID: layoutID
        });
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
                                viewAllReports={this.viewAllReports} // Passes the viewAllReports function to the Layout component.
                                nofForms={this.state.formsByLayouts[index].length} /* Passes the number of reports to
                                                                                      Layout component. */
                                layoutID={item.id} // Passes the id of the Layout.
                            >
                                <FlatList
                                    data={ this.state.formsByLayouts[index].slice(0, 5) } /* Renders the forms from the state array
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

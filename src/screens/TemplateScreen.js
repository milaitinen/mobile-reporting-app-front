import React, { Component } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    ScrollView,
    StatusBar
} from 'react-native';
import { SearchBar, Badge } from 'react-native-elements';
import templateScreenStyles from './style/templateScreenStyles';
import LinearGradient from 'react-native-linear-gradient';

import { Layout } from '../components/Layout';
import { url } from './urlsetting';
import { fetchData } from './api';
import layoutStyles from '../components/Layout/layoutStyles';



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

    /*
     Fetches the data from the server in two parts.
     1) Fetches the layouts from the server
     2) Fetches the forms under their specific layout by making a separate fetch request using
        Promise.all. After the all the promises have been fetched, the function updates the state
        of formsByLayouts, and sets isLoading and refreshing to false.
    */
    getLayoutsAndForms = () => {

        fetchData(url + '/layouts')
            .then(responseJson => this.setState({ dataLayouts: responseJson }))
            .then(() => {
                const formsByLayoutID = [];
                for (let i = 1; i <= this.state.dataLayouts.length; i++) {
                    const orgReposUrl = url + '/forms?layoutid=' + i;
                    formsByLayoutID.push(fetchData(orgReposUrl));
                }
                Promise.all(formsByLayoutID)
                    .then(data => { this.setState({ formsByLayouts: data, isLoading: false, refreshing: false, }); })
                    .catch(err => console.error(err));
            })

            .catch(error => console.error(error) )
            .done();
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



    render() {
        if (this.state.isLoading) {
            return (
                <View style={[templateScreenStyles.container]}>
                    <ActivityIndicator
                        animating={this.state.animating}
                        style={[templateScreenStyles.activityIndicator, { height: 80 }]}
                        size='large'
                        color={'#88daf2'}
                    />
                </View>
            );
        }

        return (
            <LinearGradient
                colors={['#455fa1', '#364a7d', '#2e3f6b']}
                style={templateScreenStyles.gradient}
            >

                <View style={templateScreenStyles.viewContainer}>
                    <StatusBar
                        backgroundColor="#455fa1"
                        barStyle="light-content"
                    />

                    {/*At the moment this doesn't do anything.*/}
                    <SearchBar />

                    <ScrollView contentContainerStyle={templateScreenStyles.MainContainer}>

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
                                    nofForms={this.state.formsByLayouts[index].length} /* Passes the number of reports to
                                                                                      Layout component. */
                                    layoutID={item.id} // Passes the id of the Layout.
                                    data={this.state.formsByLayouts[index]}
                                />
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

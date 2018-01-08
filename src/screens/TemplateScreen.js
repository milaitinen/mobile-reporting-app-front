import React, { Component } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    ScrollView,
    StatusBar,
} from 'react-native';
import { ListItem, SearchBar, Badge } from 'react-native-elements';
import templateScreenStyles from './style/templateScreenStyles';
import LinearGradient from 'react-native-linear-gradient';

import { Layout } from '../components/Layout';
import { url } from './urlsetting';
import loginStyles from './style/styles';
import layoutStyles from '../components/Layout/layoutStyles';


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

    }

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

    }
    /*
     Function that passes navigation props and navigates to NewFormScreen.
     This makes it possible for the Layout component to navigate.
     Also passes the refresh function and the specific layoutID so that the
     app knows to which layout the new report has to be added.
    */

    createNew = (layoutID) => {
        this.props.navigation.navigate('NewForm', { refresh: this.handleRefresh, layoutID: layoutID });
    }

    viewAllReports = () => {
        this.props.navigation.navigate('ReportsPage');
    }


    badge = (dateAccepted) => {
        if (dateAccepted != null){
            return <Badge textStyle = {layoutStyles.badgeTextStyle}
                containerStyle = {layoutStyles.badgeContainerStyleP}
                value={' Pending  '}
            />;
        }
        return <Badge textStyle = {layoutStyles.badgeTextStyle}
            containerStyle = {layoutStyles.badgeContainerStyleA}
            value={'Approved'}
        />;
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
                colors={['#455fa1', '#364a7d', '#2e3f6b']}
                style={loginStyles.contentContainer}
            >

                <View style={{ flex: 1, paddingTop: 0 }}>
                    <StatusBar
                        backgroundColor="#455fa1"
                        barStyle="light-content"
                    />


                    <SearchBar       //At the moment this doesn't do anything.
                        lightTheme
                        containerStyle = {templateScreenStyles.searchBarContainer}
                        inputStyle = { templateScreenStyles.searchBarInput }
                        icon = {{ style: templateScreenStyles.searchIcon }}
                        placeholder='Search for reports' />

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
                                                containerStyle={ layoutStyles.ListItemStyle }
                                                title={item.title}
                                                subtitle={item.dateCreated}
                                                titleStyle = { layoutStyles.listTitleStyle }
                                                subtitleStyle = {layoutStyles.listTitleStyle }
                                                hideChevron={true}
                                                badge = {{ element: this.badge(item.dateAccepted) }}
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
            </LinearGradient>
        );
    }
}

export default TemplateScreen;

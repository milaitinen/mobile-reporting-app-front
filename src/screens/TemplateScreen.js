import React, { Component } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    ScrollView,
    StatusBar
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import templateScreenStyles from './style/templateScreenStyles';
import LinearGradient from 'react-native-linear-gradient';

import { Layout } from '../components/Layout';
import { url } from './urlsetting';
import { fetchData } from './api';



class TemplateScreen extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            dataTemplates     : [],
            reportsByTemplates  : [],    // Array in which the reports will be appended to by their specific TemplateID.
            isLoading       : true,  // Checks whether the app is loading or not.
            refreshing      : false, // Checks whether the app and its data is refreshing or not.
        };
    }

    /*
     componentDidMount() is invoked immediately after the component is mounted. Initialization that requires
     DOM nodes happens here. The function calls getTemplates which loads data from a remote url,
     and instantiates the network request.
    */
    componentDidMount() {
        this.getTemplatesAndReports();
    }

    /*
     Fetches the data from the server in two parts.
     1) Fetches the templates from the server
     2) Fetches the reports under their specific template by making a separate fetch request using
        Promise.all. After the all the promises have been fetched, the function updates the state
        of reportsByTemplates, and sets isLoading and refreshing to false.
    */
    getTemplatesAndReports = () => {

        fetchData(url + '/layouts')  // ***NOTE*** Change this to /reports when the API call has been changed.
            .then(responseJson => this.setState({ dataTemplates: responseJson }))
            .then(() => {
                const reportsByTemplateID = [];
                for (let i = 1; i <= this.state.dataTemplates.length; i++) {
                    const orgReposUrl = url + '/forms?layoutid=' + i;       // ***NOTE*** Change this to '/reports?templateid='
                    reportsByTemplateID.push(fetchData(orgReposUrl));
                }
                Promise.all(reportsByTemplateID)
                    .then(data => { this.setState({ reportsByTemplates: data, isLoading: false, refreshing: false, }); })
                    .catch(err => console.error(err));
            })

            .catch(error => console.error(error) )
            .done();
    };

    // Handler function for refreshing the data and refetching.
    handleRefresh = () => {
        this.setState(
            { refreshing: true, },
            () => { this.getTemplatesAndReports(); }
        );
    };

    /*
     Function that passes navigation props and navigates to NewReportScreen.
     This makes it possible for the Layout component to navigate.
     Also passes the refresh function and the specific TemplateID so that the
     app knows to which template the new report has to be added.
    */
    createNew = (templateID) => {
        this.props.navigation.navigate('NewReport', { refresh: this.handleRefresh, templateID: templateID });
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
                    <SearchBar
                        lightTheme
                        containerStyle = {templateScreenStyles.searchBarContainer}
                        inputStyle = { templateScreenStyles.searchBarInput }
                        icon = {{ style: templateScreenStyles.searchIcon }}
                        placeholder='Search for reports' />

                    <ScrollView contentContainerStyle={templateScreenStyles.MainContainer}>

                        <FlatList
                            /* Lists the templates in a FlatList component. Each FlatList item is rendered using a
                               custom Layout component. The Layout component has a FlatList component as its child
                               component, which lists the specific reports under the right template. The component and its
                               props are explained in its class more specifically.
                             */
                            data={ this.state.dataTemplates } // The data in which the templates are stored.
                            renderItem={({ item, index }) => // Renders each template separately.
                                <Layout
                                    title={item.title} // Title of the template
                                    createNew={this.createNew} // Passes the createNew function to the Layout component.
                                    nofReports={item.formCount} // ***NOTE *** Change to reportCount
                                    // /* Passes the number of reports to Layout component. */
                                    templateID={item.id} // Passes the id of the template.
                                    data={this.state.reportsByTemplates[index]}
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

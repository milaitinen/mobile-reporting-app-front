import React, { Component } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    ScrollView,
    StatusBar
} from 'react-native';
import { connect } from 'react-redux';

import templateScreenStyles from './style/templateScreenStyles';
import { Layout } from '../components/Layout';
import { AppBackground } from '../components/AppBackground';
import { ReportSearchBar } from '../components/ReportSearchBar';
import { fetchReportsByTemplateID, fetchTemplatesByUsername, /*fetchReportsByUsername*/ } from './api';
import { storeTemplates } from '../redux/actions/templates';
import { storeReportsByTemplateID } from '../redux/actions/reportsByTemplateID';
import { createReport } from '../redux/actions/newReport';
// import { storeReports } from '../redux/actions/reports';

// "export" necessary in order to test component without Redux store
export class TemplateScreen extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isLoading   : true,     // Checks whether the app is loading or not.
            refreshing  : false,    // Checks whether the app and its data is refreshing or not.
        };
    }

    /*
     componentDidMount() is invoked immediately after the component is mounted. Initialization that requires
     DOM nodes happens here. The function calls getTemplates which loads data from a remote url,
     and instantiates the network request.
    */
    componentDidMount() {
        // TEMPORARY: not sure if this is the best solution
        if (this.isEmpty(this.props.templates)) {
            this.getTemplatesAndReports();
        } else {
            this.setState({ refreshing: false, isLoading: false });
        }
    }

    isEmpty = (obj) => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    };

    /*
     Fetches the data from the server in two parts.
     1) Fetches the templates from the server
     2) Fetches the reports under their specific template by making a separate fetch request using
        Promise.all. After all the promises have been fetched, the function updates the state
        of reportsByTemplates, and sets isLoading and refreshing to false.
    */
    getTemplatesAndReports = () => {
        fetchTemplatesByUsername(this.props.username, this.props.token)
            .then(responseJson => this.props.dispatch(storeTemplates(responseJson)))
            .then(() => {
                const reportsByTemplateID = Object.keys(this.props.templates).map((templateID) => fetchReportsByTemplateID(this.props.username, templateID, this.props.token));
                Promise.all(reportsByTemplateID)
                    .then(data => {
                        this.props.dispatch(storeReportsByTemplateID(data));
                        this.setState({ refreshing: false, isLoading: false });
                    })
                    .catch(err => console.error(err));
            })
            .catch(error => console.error(error))
            .done();

        /*
        fetchReportsByUsername(this.props.username, this.props.token)
            .then(responseJson => this.props.dispatch(storeReports(responseJson)))
            .catch(error => console.error(error))
            .done();
        */
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
    createNew = (templateID, isEditable) => {
        this.props.dispatch(createReport(templateID, isEditable));
        this.props.navigation.navigate('NewReport', { refresh: this.handleRefresh });
    };

    render() {
        if (this.state.isLoading) {
            return (
                <AppBackground>
                    <ActivityIndicator
                        animating={this.state.animating}
                        style={[templateScreenStyles.activityIndicator, { height: 80 }]}
                        size='large'
                        color={'#88daf2'}
                    />
                </AppBackground>
            );
        }

        return (
            <AppBackground>
                <View style={templateScreenStyles.viewContainer}>
                    <StatusBar
                        backgroundColor={templateScreenStyles.statusBar}
                        barStyle='light-content'
                    />
                    {/* At the moment this doesn't do anything.*/}
                    <ReportSearchBar/>
                    <ScrollView contentContainerStyle={templateScreenStyles.scrollView}>
                        <FlatList
                            data={ Object.values(this.props.templates) }
                            renderItem={({ item }) =>
                                <Layout
                                    title={item.title}
                                    createNew={this.createNew}
                                    nofReports={item.reportCount}
                                    templateID={item.id}
                                    data={this.props.reportsByTempID[item.id]}
                                />
                            }
                            keyExtractor={item => item.id}
                            refreshing={this.state.refreshing}
                        />
                    </ScrollView>
                </View>
            </AppBackground>
        );
    }
}

// maps redux state to component props. Object that is returned can be accessed via 'this.props' e.g. this.props.email
const mapStateToProps = (state) => {
    const username = state.user.username;
    const templates = state.templates;
    const reportsByTempID = state.reportsByTempID;
    const token = state.user.token;
    return {
        username,
        templates,
        reportsByTempID,
        token
    };
};

export default connect(mapStateToProps)(TemplateScreen);

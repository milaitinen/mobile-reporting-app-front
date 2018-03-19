import React, { Component } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    ScrollView,
    NetInfo,
    StatusBar,
    Platform,
} from 'react-native';
import { connect } from 'react-redux';

import templateScreenStyles from './style/templateScreenStyles';
import { Layout } from '../components/Layout';
import { AppBackground } from '../components/AppBackground';
import { ReportSearchBar } from '../components/ReportSearchBar';
import { fetchReportsByTemplateID, fetchTemplatesByUsername, fetchDraftsByTemplateID, isNetworkConnected } from './api';
import { storeTemplates } from '../redux/actions/templates';
import { storeReportsByTemplateID, storeDraftByTemplateID, insertTemplateID } from '../redux/actions/reports';
import { preview } from '../redux/actions/preview';
import userReducer from '../redux/reducers/user';

import { setInitialConnection, toggleConnection } from '../redux/actions/connection';

// "export" necessary in order to test component without Redux store
export class TemplateScreen extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            isLoading       : true,     // Checks whether the app is loading or not.
            refreshing      : false,    // Checks whether the app and its data is refreshing or not.
            scrollEnabled   : true,     // Checks whether the template screen is scrollable or not.
            renderFooter    : false,     // If true, empty space is rendered after the last template. This is set to true while a template is opened.
        };
    }

    /*
    handleBackPress = () => {
        if (this.backPressed && this.backPressed > 0) {
            this.props.navigator.popToRoot({ animated: false });
            return false;
        }

        this.backPressed = 1;
        this.props.navigator.showSnackbar({
            text: 'Press one more time to exit',
            duration: 'long',
        });
        return true;
    }
    */

    /*
     componentDidMount() is invoked immediately after the component is mounted. Initialization that requires
     DOM nodes happens here. The function calls getTemplates which loads data from a remote url,
     and instantiates the network request.
    */
    componentDidMount() {

        if (Platform.OS === 'android') NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
        // TEMPORARY: not sure if this is the best solution. Current version fixes a bug (related to logging in)
        if (this.props.username !== userReducer.username) {
            this.getTemplatesAndReports();
        } else {
            this.setState({ refreshing: false, isLoading: false });
        }

    }

    componentWillUnmount() {
        if (Platform.OS === 'android') NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }

    handleConnectionChange = isConnected => {
        this.props.dispatch(toggleConnection({ connectionStatus: isConnected }));
    };

    /*
    Fetches the data from the server in two parts.
    1) Fetches the templates from the server
    2) Fetches the reports under their specific template by making a separate fetch request using
        Promise.all. After all the promises have been fetched, the function updates the state
        of reportsByTemplates, and sets isLoading and refreshing to false.
    */
    getTemplatesAndReports = () => {
        const { username, token } = this.props;
        fetchTemplatesByUsername(username, token)
            .then(responseJson => {
                if (responseJson.length < 1) {  // handle situations where there are no templates
                    this.setState({ refreshing: false, isLoading: false });
                } else {
                    this.props.dispatch(storeTemplates(responseJson));
                }
            })
            .then(() => {
                const templates = this.props.templates;

                Object.keys(templates).forEach(id => this.props.dispatch(insertTemplateID(id)));
                const reportsByTemplateID = Object.keys(templates).map((id) => fetchReportsByTemplateID(username, id, token));

                Promise.all(reportsByTemplateID)
                    .then(data => this.props.dispatch(storeReportsByTemplateID(data)))
                    .then(() => this.getDrafts())
                    .catch(err => console.error(err));
            })
            .catch(error => console.error(error))
            .done();
    };

    getDrafts = () => {
        const { templates, username } = this.props;

        Object.keys(templates).forEach((templateID) => {
            fetchDraftsByTemplateID(username, templateID)
                .then((drafts) => {
                    if (drafts.length !== 0) {
                        drafts.forEach(draft => this.props.dispatch(storeDraftByTemplateID(templateID, draft)));
                    }
                })
                .then(() => this.setState({ refreshing: false, isLoading: false }))
                .catch(err => console.error(err));
        });
    };

    // Handler function for refreshing the data and refetching.
    handleRefresh = () => {
        this.setState({ refreshing: true, }, () => { this.getTemplatesAndReports(); });
        this.setState({ isLoading: true });
    };

    // Determines whether this screen is scrollable or not.
    setScrollEnabled = (bool) => {
        this.setState({ scrollEnabled : bool });
    };

    /*
     Determines whether empty space is rendered after the last template.
     Without this function it wouldn't be possible to autoscroll to the last templates.
     */
    setRenderFooter = (bool) => {
        this.setState({ renderFooter: bool });
    };

    /*
     Function that passes navigation props and navigates to NewReportScreen.
     This makes it possible for the Layout component to navigate.
     Also passes the refresh function and the specific TemplateID so that the
     app knows to which template the new report has to be added.
    */
    createNew = (templateID, isEditable) => {
        if (isEditable) {
            // this.setState({ isLoading: true });
            this.props.navigation.navigate('NewReport', {
                templateID: templateID,
                refresh: this.handleRefresh,
                isEditable: isEditable });
        }
        else {
            this.props.dispatch(preview(templateID));
            // this.setState({ isLoading: true });
            this.props.navigation.navigate('Preview', { refresh: this.handleRefresh,  isEditable: isEditable });
        }
        //this.setState({ isLoading: true }); TODO fix backhandler issue in NewReport, Preview, and ReportScreen and uncomment this
    };

    viewReport = (templateID, reportID, title) => {
        //this.setState({ isLoading: true }); TODO same problem as above
        this.props.navigation.navigate('Report',
            { refresh: this.handleRefresh, templateID: templateID, reportID: reportID, title: title });
    };

    render() {
        if (this.state.isLoading) {
            return (
                <AppBackground>
                    <StatusBar backgroundColor={ this.props.isConnected ? '#3d4f7c' : '#b52424' } barStyle="light-content" />
                    <ActivityIndicator
                        animating={this.state.animating}
                        style={[templateScreenStyles.activityIndicator, { height: 80 }]}
                        size='large'
                        color={'#88daf2'}
                    />
                </AppBackground>
            );
        }

        const { reports, templates } = this.props;

        return (
            <AppBackground>
                <View style={templateScreenStyles.viewContainer}>
                    <StatusBar
                        backgroundColor={this.props.isConnected ? '#3d4f7c' : '#b52424'}
                        barStyle='light-content'
                    />
                    {/* At the moment this doesn't do anything.*/}
                    <ReportSearchBar/>
                    <ScrollView contentContainerStyle={templateScreenStyles.scrollView}>
                        <FlatList
                            ref={(c) => this._flatList = c}
                            scrollEnabled={this.state.scrollEnabled}
                            data={ Object.values(templates) }
                            renderItem={({ item, index }) =>
                                <Layout
                                    title={item.title}
                                    moveToTop={(viewPosition = 0) => this._flatList.scrollToIndex({ animated: true, index: index, viewPosition: viewPosition })}
                                    setTemplateScreenScrollEnabled={this.setScrollEnabled}
                                    setTemplateScreenRenderFooter={this.setRenderFooter}
                                    createNew={this.createNew}
                                    viewReport={this.viewReport}
                                    nofReports={(reports[item.template_id]) ? (reports[item.template_id]).length : 0}
                                    templateID={item.template_id}
                                    data={reports[item.template_id]}
                                    /*
                                    nofReports={(reports[item.id]) ? reports[item.id].filter(item => item.id >= 0).length : 0}
                                    nofDrafts={(reports[item.id]) ? reports[item.id].filter(item => item.id < 0).length : 0}
                                    */ // TODO: selvittäkää tää pls
                                />
                            }
                            ListFooterComponent={
                                (this.state.renderFooter) && <View style={{ height: 500 }}/>
                            }
                            keyExtractor={item => item.template_id}
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
    const reports = state.reports;
    const token = state.user.token;
    const isConnected = state.connection.isConnected;

    return {
        username,
        templates,
        reports,
        token,
        isConnected,
    };
};

export default connect(mapStateToProps)(TemplateScreen);

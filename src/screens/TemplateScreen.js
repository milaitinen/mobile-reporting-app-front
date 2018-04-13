import React, { Component } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    ScrollView,
    NetInfo,
    StatusBar,
    Alert,
} from 'react-native';
import { connect } from 'react-redux';

import templateScreenStyles from './style/templateScreenStyles';
import { Layout } from '../components/Layout';
import { AppBackground } from '../components/AppBackground';
import { ReportSearchBar } from '../components/ReportSearchBar';
import {
    fetchReportsByTemplateID,
    fetchTemplatesByUsername,
    fetchDraftsByTemplateID,
    fetchQueuedByTemplateID,
    sendPendingReportsByTemplateID
} from '../api';
import { asyncForEach } from '../functions/helpers';
import { storeTemplates } from '../redux/actions/templates';
import { storeReportsByTemplateID, storeDraftByTemplateID, storeQueuedReportByTemplateID, insertTemplateID } from '../redux/actions/reports';
import { preview } from '../redux/actions/preview';
import userReducer from '../redux/reducers/user';

import { toggleConnection } from '../redux/actions/connection';
import { strings } from '../locales/i18n';

// "export" necessary in order to test component without Redux store
export class TemplateScreen extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            isLoading       : true,     // Checks whether the app is loading or not.
            refreshing      : false,    // Checks whether the app and its data is refreshing or not.
            scrollEnabled   : true,     // Checks whether the template screen is scrollable or not.
            renderFooter    : false,    // If true, empty space is rendered after the last template. This is set to true while a template is opened.
            isNavigating    : false,    // Checks whether the user is navigating to another screen in the stack.
        };
    }

    /*
     componentDidMount() is invoked immediately after the component is mounted. Initialization that requires
     DOM nodes happens here. The function calls getTemplates which loads data from a remote url,
     and instantiates the network request.
    */
    componentDidMount() {

        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
        // TEMPORARY: not sure if this is the best solution. Current version fixes a bug (related to logging in)
        if (this.props.username !== userReducer.username) {
            this.getTemplatesAndReports();
        } else {
            this.setState({ refreshing: false, isLoading: false, });
        }

    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }

    handleConnectionChange = isConnected => {
        this.props.dispatch(toggleConnection({ connectionStatus: isConnected }));

        if (isConnected) { this.sendPendingReports(); }
    };


    sendPendingReports = () => {
        const { username, token } = this.props;
        const templates = this.props.templates;

        let sentSomething = false;

        //Helper function to perform all these async functions in correct order :)
        const send = async () => {
            await asyncForEach(Object.keys(templates), async id => {
                const status = await sendPendingReportsByTemplateID(username, id, token);
                if (status === true) { sentSomething = true; }
            });

            if (sentSomething) {
                this.setState({ refreshing: true }, () => { this.handleRefresh(); });
                Alert.alert(strings('login.queuedSent'));
            }
        };
        if (this.props.isConnected) { send(); }
    };

    /**
    * Fetches the data from the server in two parts.
    * 1) Fetches the templates from the server
    * 2) Fetches the reports under their specific template by making a separate fetch request using
    *    Promise.all. After all the promises have been fetched, the function updates the state
    *    of reportsByTemplates, and sets isLoading and refreshing to false.
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
                    .then(() => this.getQueued())
                    .catch(err => console.error(err));
            })
            .catch(error => console.error(error))
            .done();
    };

    getDrafts = () => {
        const { templates, username } = this.props;

        Object.keys(templates).forEach((templateID) => {
            // TODO parseInt has been added recently. Take it away if there's trouble.
            const id = parseInt(templateID);

            fetchDraftsByTemplateID(username, id)
                .then((drafts) => {
                    if (drafts.length !== 0) {
                        drafts.forEach(draft => this.props.dispatch(storeDraftByTemplateID(id, draft)));
                    }
                })
                .catch(err => console.error(err));
        });
    };

    getQueued = () => {
        const { templates, username } = this.props;

        Object.keys(templates).forEach(templateID => {
            fetchQueuedByTemplateID(username, templateID)
                .then(reports => {
                    if (reports.length !== 0) {
                        reports.forEach(report => this.props.dispatch(storeQueuedReportByTemplateID(templateID, report)));
                    }
                })
                .then(() => this.setState({ refreshing: false, isLoading: false }))
                .catch(err => console.error(err));
        });
    };

    // Handler function for refreshing the data and refetching.
    handleRefresh = () => {
        this.setState({ refreshing: true, }, () => { this.getTemplatesAndReports(); });
        this.setState({ isLoading: true, });
    };

    // Handler function to set isNavigating to false if user returns back to this screen.
    handleNavigatingDebounce = () => {
        this.setState({ isNavigating: false });
    }

    // Determines whether this screen is scrollable or not.
    setScrollEnabled = (bool) => {
        this.setState({ scrollEnabled : bool });
    };

    /**
     * Determines whether empty space is rendered after the last template.
     * Without this function it wouldn't be possible to autoscroll to the last templates.
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
        /*
         * Condition checks whether user is already navigating.
         * Used to prevent multiple navigations simultaneously to different routes
         * if the user presses different buttons too quickly.
        */
        if (!this.state.isNavigating) {
            this.setState({ isNavigating: true });
            if (isEditable) {
                this.props.navigation.navigate('Report', {
                    isNewReport: true,
                    templateID: templateID,
                    reportID: null,
                    refresh: this.handleRefresh,
                    isEditable: isEditable,
                    navigateDebounce: this.handleNavigatingDebounce
                });
            }
            else {
                this.props.dispatch(preview(templateID));
                this.props.navigation.navigate('Preview', {
                    refresh: this.handleRefresh,
                    isEditable: isEditable,
                    navigateDebounce: this.handleNavigatingDebounce
                });
            }
        }
    };

    viewReport = (templateID, reportID, title) => {
        /*
         * Condition checks whether user is already navigating.
         * Used to prevent multiple navigations simultaneously to different routes
         * if the user presses different buttons too quickly.
        */
        if (!this.state.isNavigating) {
            this.setState({ isNavigating: true });
            this.props.navigation.navigate('Report', {
                isNewReport: false,
                templateID: templateID,
                reportID: reportID,
                refresh: this.handleRefresh,
                title: title,
                navigateDebounce: this.handleNavigatingDebounce
            });
        }
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
                                    key = {item.index}
                                    moveToTop={(viewPosition = 0) => this._flatList.scrollToIndex({ animated: true, index: index, viewPosition: viewPosition })}
                                    setTemplateScreenScrollEnabled={this.setScrollEnabled}
                                    setTemplateScreenRenderFooter={this.setRenderFooter}
                                    createNew={this.createNew}
                                    viewReport={this.viewReport}
                                    //nofReports={(reports[item.template_id]) ? (reports[item.template_id]).length : 0}
                                    templateID={item.template_id}
                                    data={reports[item.template_id]}
                                    nofReports={(reports[item.template_id]) ? reports[item.template_id].filter(item => item.report_id >= 0).length : 0}
                                    nofQueued={(reports[item.template_id]) ? reports[item.template_id].filter(item => item.report_id == null).length : 0}
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

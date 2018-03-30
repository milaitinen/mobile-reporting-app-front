import { connect } from 'react-redux';
import React from 'react';
import { handleBack } from '../../functions/handleBack';
import { HeaderBackButton } from 'react-navigation';


/**
 *  A wrapper for the back button, that can be connected to Redux.
 *  This button is used in report editing screens so that it can show
 *  a confirmation message based on redux data (isUnsaved) and dispatch redux actions accordingly.
 */
class ReportEditingBackButton extends React.Component {
    render() {
        return (
            <HeaderBackButton tintColor='#fff' onPress={() => handleBack(this.props.dispatch, this.props.isUnsaved)} />
        );
    }
}


// maps redux state to component props. Object that is returned can be accessed via 'this.props' e.g. this.props.email
const mapStateToProps = (state) => {
    // TODO: these are probably not needed: remove if so
    /*
    const token         = state.user.token;
    const templates     = state.templates;
    const reports       = state.reports;
    const title         = state.newReport.title;
    const number        = state.newReport.number;
    const isConnected = state.connection.isConnected;
    */
    const isUnsaved     = state.reportEditing.isUnsaved;


    return {
        /*
        templates,
        title,
        number,
        token,
        reports,
        isConnected,
        */
        isUnsaved,
    };
};

export default connect(mapStateToProps)(ReportEditingBackButton);

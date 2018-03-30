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
    const isUnsaved     = state.reportEditing.isUnsaved;

    return {
        isUnsaved,
    };
};

export default connect(mapStateToProps)(ReportEditingBackButton);

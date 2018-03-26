import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { saveDraft } from '../screens/api';
import { emptyFields } from '../redux/actions/newReport';

/**
 * Handles the back-navigation logic when editing a report.
 *
 * This should be used inside a Redux-connected component, so that the
 * component can get the parameters from Redux and pass them on to this function.
 * Then this function can e.g. dispatch Redux actions.
 *
 * Note that the return values are only needed for the Android hardware back button,
 * and are not necessary with the on-screen back button.
 *
 * This function is used:
 *   1. in an Android BackHandler and is called from there directly
 *   2. in onPress inside ReportEditingBackButton, that is used in navigation
 * @param dispatch Dispatch function from redux
 * @param newReport The report that will be saved
 * @param username
 * @returns {boolean}
 */
export const handleBack = (dispatch, newReport, username) => {
    // TODO: default value for isUnsaved is used,
    // because checking if report is saved is not implemented yet.
    // When the functionality will be implemented, the default value should become redundant.
    const isUnsaved = newReport.isUnsaved == null ? true : newReport.isUnsaved;
    const { template_id } = newReport;
    console.assert(template_id != null, 'template id was null');

    if (isUnsaved) {
        Alert.alert(
            'You have unsaved changes',
            'Are you sure you want to leave without saving?',
            [
                { text: 'Cancel', onPress: () => {
                    console.log('Cancel pressed');
                },
                style: 'cancel' },

                { text: 'Save', onPress: () => {
                    console.log('Save Pressed');
                    // store report to async storage
                    console.log('storing newReport:');
                    console.log(newReport);
                    saveDraft(username, template_id, newReport); // give a negative id

                    // this seems to be redundant
                    //dispatch(storeDraftByTemplateID(template_id, newReport)); // store drafts together with other reports in reports state)

                    Alert.alert('Report saved!');
                    // these are currently handled in componentWillUnmount in the screens that handle report editing
                    //this.setState({ isLoading: true });
                    //this.setState({ isUnsaved: false });
                    //return to template screen and have it refreshed
                    //dispatch(emptyFields()); // FIXME: this makes the app crash. Is this necessary?
                    //this.props.navigation.state.params.refresh(); // TODO: is this necessary?
                }
                },

                { text: 'Don\'t save', onPress: () => {
                    console.log('Yes Pressed');
                    dispatch(NavigationActions.back());
                }
                },
            ],
            { cancelable: false }
        );
        return true;
    }
    dispatch(NavigationActions.back());
    // A true return value will prevent the regular handling of the Android back button,
    // whereas false would allow the previous backhandlers to take action after this.
    return true;
};

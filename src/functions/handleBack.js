import { Alert } from 'react-native';
import { emptyFields } from '../redux/actions/newReport';
import { NavigationActions } from 'react-navigation';

/**
 * Handles the back-navigation logic when editing a report.
 *
 * This should be used inside a Redux-connected component, so that the
 * component can get the parameters from Redux and pass them on to this function.
 * Then this function can i.e. dispatch Redux actions.
 *
 * Note that the return values are only needed for the Android hardware back button,
 * and are not necessary with the on-screen back button.
 *
 * This function is used:
 *   1. in an Android BackHandler and is called from there directly
 *   2. in onPress inside ReportEditingBackButton, that is used in navigation
 * @param isUnsaved
 * @param dispatch
 * @returns {boolean}
 */
export const handleBack = (isUnsaved = true, dispatch) => {
    // TODO: default value for isUnsaved is used,
    // because checking if report is saved is not implemented yet.
    // When the functionality will be implemented, the default value should become redundant.
    if (isUnsaved) {
        Alert.alert(
            'You have unsaved changes',
            'Are you sure you want to leave without saving?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel pressed'), style: 'cancel' },
                { text: 'Save', onPress: () => console.log('Save Pressed') }, // TODO: add goBack() here
                // TODO: call the save-method from NewReportScreen or ReportScreen
                { text: 'Don\'t save', onPress: () => {
                    console.log('Yes Pressed');
                    //dispatch(emptyFields()); // FIXME: this makes the app crash. Is this necessary?
                    //dispatch(setUnsaved(false)); // TODO: implement isUnsaved checking
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
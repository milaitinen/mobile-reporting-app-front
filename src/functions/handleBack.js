import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { setSavingRequested } from '../redux/actions/reportEditing';

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
 * @param isUnsaved
 * @returns {boolean}
 */
export const handleBack = (dispatch, isUnsaved) => {
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
                    // Saving dispatches a 'flag' through redux that tells
                    // the current screen that it needs to save the report before
                    // unmounting.
                    // TODO: currently isSavingRequested and isUnsaved are saved in the report. Should they be
                    // moved to a separate reducer?
                    dispatch(setSavingRequested(true));
                    // TODO: test for possible race conditions
                    dispatch(NavigationActions.back());
                }
                },

                { text: 'Don\'t save', onPress: () => {
                    dispatch(setSavingRequested(false));
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

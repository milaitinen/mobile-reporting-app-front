import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { setSavingRequested } from '../redux/actions/reportEditing';
import { strings } from '../locales/i18n';

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
            strings('createNew.unsavedChanges'),
            strings('leaveWithoutSaving'),
            [
                { text: strings('createNew.cancel'), onPress: () => {
                    console.log('Cancel pressed');
                },
                style: 'cancel' },

                { text: strings('createNew.save'), onPress: () => {
                    // Saving dispatches a 'flag' through redux that tells
                    // the current screen that it needs to save the report before
                    // unmounting.
                    dispatch(setSavingRequested(true));
                    // This assumes that the screen will have received the new
                    // isSavingRequested prop before the next line.
                    dispatch(NavigationActions.back());
                }
                },

                { text: strings('createNew.dontSave'), onPress: () => {
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

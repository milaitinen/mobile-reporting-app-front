export const SET_UNSAVED = 'SET_UNSAVED';
export const SET_SAVING_REQUESTED = 'SET_SAVING_REQUESTED';


export const setUnsaved = ( isUnsaved ) => ({
    type: SET_UNSAVED,
    isUnsaved: isUnsaved,
});

export const setSavingRequested = ( isSavingRequested ) => ({
    type: SET_SAVING_REQUESTED,
    isSavingRequested: isSavingRequested,
});

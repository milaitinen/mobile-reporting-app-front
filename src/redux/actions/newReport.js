// easier to refactor later and debug
export const INSERT_TITLE   = 'INSERT_TITLE';
export const INSERT_FIELD_ANSWER = 'INSERT_FIELD_ANSWER';
export const EMPTY_FIELDS = 'EMPTY_FIELDS';
export const SET_UNSAVED = 'SET_UNSAVED';
export const INSERT_DATE = 'INSERT_DATE';
export const CREATE_DRAFT = 'CREATE_DRAFT';
export const OPEN_REPORT = 'OPEN_REPORT';
export const SET_SAVING_REQUESTED = 'SET_SAVING_REQUESTED';

export const createDraft = (draft) => ({
    type: CREATE_DRAFT,
    draft: draft
});

export const insertTitle = (title) => ({
    type: INSERT_TITLE,
    title: title
});

export const openReport = (report) => ({
    type: OPEN_REPORT,
    report: report
});

export const insertDate = (date) => ({
    type: INSERT_DATE,
    date: date
});

export const insertFieldAnswer = ( field, value, isOption ) => ({
    type: INSERT_FIELD_ANSWER,
    field: field,
    value: value,
    isOption: isOption
});

export const emptyFields = () => ({
    type: EMPTY_FIELDS
});

export const setUnsaved = ( isUnsaved ) => ({
    type: SET_UNSAVED,
    isUnsaved: isUnsaved,
});

export const setSavingRequested = ( isSavingRequested ) => ({
    type: SET_SAVING_REQUESTED,
    isSavingRequested: isSavingRequested,
});

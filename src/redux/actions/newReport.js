// easier to refactor later and debug
export const CREATE_REPORT  = 'CREATE_REPORT';
export const INSERT_TITLE   = 'INSERT_TITLE';
export const INSERT_FIELD_ANSWER = 'INSERT_FIELD_ANSWER';
export const EMPTY_FIELDS = 'EMPTY_FIELDS';
export const SET_UNSAVED = 'SET_UNSAVED';
export const CREATE_DRAFT = 'CREATE_DRAFT';

// return an object
export const createReport = ( templateID, date ) => ({
    type: CREATE_REPORT,
    templateID: templateID,
    dateCreated: date
});

export const createDraft = (draft) => ({
    type: CREATE_DRAFT,
    draft: draft
});

export const insertTitle = (title) => ({
    type: INSERT_TITLE,
    title: title
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
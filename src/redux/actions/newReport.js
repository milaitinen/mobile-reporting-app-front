// easier to refactor later and debug
export const CREATE_REPORT  = 'CREATE_REPORT';
export const INSERT_TITLE   = 'INSERT_TITLE';
export const INSERT_FIELD_ANSWER = 'INSERT_FIELD_ANSWER';
export const EMPTY_FIELDS = 'EMPTY_FIELDS';

// return an object
export const createReport = ( templateID, date ) => ({
    type: CREATE_REPORT,
    templateID: templateID,
    dateCreated: date
});

export const insertTitle = (title) => ({
    type: INSERT_TITLE,
    title: title
});

export const insertFieldAnswer = ( field, answer ) => ({
    type: INSERT_FIELD_ANSWER,
    field: field,
    answer: answer
});

export const emptyFields = () => ({
    type: EMPTY_FIELDS
});
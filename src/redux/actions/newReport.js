// easier to refactor later and debug
export const CREATE_REPORT  = 'CREATE_REPORT';
export const INSERT_TITLE   = 'INSERT_TITLE';

// return an object
export const createReport = ( templateID, isEditable) => ({
    type: CREATE_REPORT,
    templateID: templateID,
    isEditable: isEditable,
});

export const insertTitle = (title) => ({
    type: INSERT_TITLE,
    title: title
});

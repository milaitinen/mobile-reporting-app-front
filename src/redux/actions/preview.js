// easier to refactor later and debug
export const PREVIEW = 'PREVIEW';
export const INSERT_TITLE = 'INSERT_TITLE';

// return an object
export const preview = ( templateID ) => ({
    type: PREVIEW,
    templateID: templateID
});

export const insertTitle = (title) => ({
    type: INSERT_TITLE,
    title: title
});

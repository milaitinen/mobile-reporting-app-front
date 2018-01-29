// easier to refactor later and debug
export const INSERT_EMAIL = 'INSERT_EMAIL';
export const INSERT_PASSWORD = 'INSERT_PASSWORD';
export const INSERT_SERVERURL = 'INSERT_SERVERURL';
export const STORE_TEMPLATES = 'STORE_TEMPLATES';
export const STORE_REPORTS = 'STORE_REPORTS';
export const TOGGLE_AUTHENTICATED = 'TOGGLE_AUTHENTICATED';

// return an object
export const insertEmail = (address) => ({
    type: INSERT_EMAIL,
    email: address
});

export const insertPassword = (password) => ({
    type: INSERT_PASSWORD,
    password: password
});

export const insertServerUrl = (url) => ({
    type: INSERT_SERVERURL,
    serverUrl: url
});

export const toggleAuthenticated = () => ({
    type: TOGGLE_AUTHENTICATED,
});

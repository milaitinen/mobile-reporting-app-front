// easier to refactor later and debug
export const INSERT_EMAIL = 'INSERT_EMAIL';
export const INSERT_PASSWORD = 'INSERT_PASSWORD';
export const INSERT_SERVERURL = 'INSERT_SERVERURL';
export const STORE_TEMPLATES = 'STORE_TEMPLATES';
export const STORE_REPORTS = 'STORE_REPORTS';
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const INSERT_TOKEN = 'INSERT_TOKEN';

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

export const setAuthenticated = (state) => ({
    type: SET_AUTHENTICATED,
    state: state
});

export const insertToken = (token) => ({
    type: INSERT_TOKEN,
    token: token
});

// easier to refactor later and debug
export const INSERT_USERNAME = 'INSERT_USERNAME';
export const INSERT_PASSWORD = 'INSERT_PASSWORD';
export const INSERT_SERVERURL = 'INSERT_SERVERURL';
export const STORE_TEMPLATES = 'STORE_TEMPLATES';
export const STORE_REPORTS = 'STORE_REPORTS';

// return an object
export const insertUsername = (address) => ({
    type: INSERT_USERNAME,
    username: address
});

export const insertPassword = (password) => ({
    type: INSERT_PASSWORD,
    password: password
});

export const insertServerUrl = (url) => ({
    type: INSERT_SERVERURL,
    serverUrl: url
});
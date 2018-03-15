// easier to refactor later and debug
export const INSERT_USERNAME    = 'INSERT_USERNAME';
export const INSERT_TOKEN       = 'INSERT_TOKEN';
export const INSERT_PASSWORD    = 'INSERT_PASSWORD';

// return an object
export const insertUsername = (address) => ({
    type: INSERT_USERNAME,
    username: address
});

export const insertPassword = (password) => ({
    type: INSERT_PASSWORD,
    password: password
});

export const insertToken = (token) => ({
    type: INSERT_TOKEN,
    token: token
});

// easier to refactor later and debug
export const INSERT_EMAIL = 'INSERT_EMAIL';

// return an object
export const insertEmail = (address) => ({
    type: INSERT_EMAIL,
    email: address
});
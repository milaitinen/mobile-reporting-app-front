/* eslint-disable no-undef */
import { INSERT_EMAIL, INSERT_PASSWORD, INSERT_SERVERURL, ADD_TEMPLATES } from '../actions/user';

const initialState = {
    email: null,
    password: null,
    serverUrl: null,
    userID: 1,
    authenticated: true,
    templates: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INSERT_EMAIL:
            return {
                ...state,
                email: action.email || null
            };
        case INSERT_PASSWORD:
            return {
                ...state,
                password: action.password || null
            };
        case INSERT_SERVERURL:
            return {
                ...state,
                serverUrl: action.serverUrl || null
            };
        case ADD_TEMPLATES:
            return {
                ...state,
                templates: action.templates || []
            };
        default:
            return state;
    }
};

console.log('initialState', initialState);
export default reducer;
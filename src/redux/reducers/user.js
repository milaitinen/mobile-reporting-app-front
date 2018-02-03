/* eslint-disable no-undef */
import { INSERT_USERNAME, INSERT_PASSWORD, INSERT_SERVERURL, INSERT_TOKEN } from '../actions/user';

const initialState = {
    username: null,
    password: null,
    serverUrl: null,
    token: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case INSERT_USERNAME:
            return {
                ...state,
                username: action.username || null
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
        case INSERT_TOKEN:
            return {
                ...state,
                token: action.token
            };
        default:
            return state;
    }
};

console.log('initialState', initialState);
export default userReducer;

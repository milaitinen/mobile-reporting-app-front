/* eslint-disable no-undef */
import { INSERT_EMAIL, INSERT_PASSWORD, INSERT_SERVERURL } from '../actions/user';

const initialState = {
    username: null,
    password: null,
    serverUrl: null,
    userID: 1,
    authenticated: true,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case INSERT_EMAIL:
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
        default:
            return state;
    }
};

console.log('initialState', initialState);
export default userReducer;
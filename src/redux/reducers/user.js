/* eslint-disable no-undef */
import { INSERT_EMAIL, INSERT_PASSWORD, INSERT_SERVERURL, SET_AUTHENTICATED, INSERT_TOKEN } from '../actions/user';


const initialState = {
    username: null,
    password: null,
    serverUrl: null,
    userID: 1,
    authenticated: false,
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
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: action.state,
            };
        case INSERT_TOKEN:
            console.log('action.token', action.token);
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

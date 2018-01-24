/* eslint-disable no-undef */
import { INSERT_EMAIL, INSERT_PASSWORD, INSERT_SERVERURL, STORE_TEMPLATES, IS_LOADING, STORE_REPORTS } from '../actions/user';

const initialState = {
    email: null,
    password: null,
    serverUrl: null,
    userID: 1,
    isLoading: true,
    authenticated: true,
};

const userReducer = (state = initialState, action) => {
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
        case STORE_TEMPLATES:
            return {
                ...state,
                templates: action.templates || null
            };
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case STORE_REPORTS:
            return {
                ...state,
                reports: action.reports || null
            };
        default:
            return state;
    }
};

console.log('initialState', initialState);
export default userReducer;
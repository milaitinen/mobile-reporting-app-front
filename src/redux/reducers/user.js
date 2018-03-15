/* eslint-disable no-undef */
import { INSERT_USERNAME, INSERT_PASSWORD, INSERT_TOKEN } from '../actions/user';

const initialState = {
    username: '',
    password: null,
    token: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case INSERT_USERNAME:
            return {
                ...state,
                username: action.username
            };
        case INSERT_PASSWORD:
            return {
                ...state,
                password: action.password
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

export default userReducer;

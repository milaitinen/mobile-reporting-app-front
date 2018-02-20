/* eslint-disable no-undef */
import { INSERT_USERNAME, INSERT_TOKEN } from '../actions/user';

const initialState = {
    username: 'Maisa',      //null, Maisa inserted for development
    token: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case INSERT_USERNAME:
            return {
                ...state,
                username: action.username || null
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

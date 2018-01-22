/* eslint-disable no-undef */
import { INSERT_EMAIL } from '../actions/user';

const initialState = {
    email: ' ',
    id: 0,
    authenticated: false,
    templates: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INSERT_EMAIL:
            return {
                ...state,
                email: action.email || ''
            };
        default:
            return state;
    }
};

console.log('initialState', initialState);
export default reducer;
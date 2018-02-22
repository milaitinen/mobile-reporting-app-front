import { TOGGLE_CONNECTION } from '../actions/connection';

const initialState = {
    isConnected: false,
};

const connectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_CONNECTION:
            return {
                ...state,
                isConnected: !action.isConnected,
            };
        default:
            return state;
    }
};
console.log('initialStateConnection', initialState);
export default connectionReducer;
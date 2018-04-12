import {
    SET_UNSAVED,
    SET_SAVING_REQUESTED,
} from '../actions/reportEditing';

const initialState = {
    isUnsaved: false,
    isSavingRequested: false,
};

const reportEditingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_UNSAVED: {
            return {
                ...state,
                isUnsaved: action.isUnsaved,
            };
        }
        case SET_SAVING_REQUESTED: {
            return {
                ...state,
                isSavingRequested: action.isSavingRequested
            };
        }
        default: {
            return state;
        }
    }
};

export default reportEditingReducer;
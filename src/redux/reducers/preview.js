/* eslint-disable no-undef */
import { INSERT_TITLE, PREVIEW } from '../actions/preview';

const initialState = {
    templateID: null ,
    isEditable: false,
    title: '',
    number: null,
};

const previewReducer = (state = initialState, action) => {
    switch (action.type) {
        case PREVIEW:
            return {
                ...state,
                templateID: action.templateID || null,
                isEditable: action.isEditable || null
            };
        case INSERT_TITLE:
            return {
                ...state,
                title: action.title || ''
            };
        default:
            return state;
    }
};

export default previewReducer;
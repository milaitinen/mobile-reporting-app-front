/* eslint-disable no-undef */
import { INSERT_TITLE, CREATE_REPORT } from '../actions/newReport';

const initialState = {
    templateID: null ,
    isEditable: false,
    title: '',
    number: null,
};

const newReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_REPORT:
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

console.log('initialState', initialState);
export default newReportReducer;
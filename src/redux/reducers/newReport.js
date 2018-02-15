/* eslint-disable no-undef */
import { INSERT_TITLE, CREATE_REPORT, INSERT_FIELD_ANSWER } from '../actions/newReport';

const initialState = {
    templateID: null ,
    isEditable: false,
    title: '',
    number: null,
    answers: {},
};

const newReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_REPORT:
            return {
                ...state,
                templateID: action.templateID,
                isEditable: action.isEditable
            };
        case INSERT_TITLE:
            return {
                ...state,
                title: action.title || ''
            };
        case INSERT_FIELD_ANSWER:
            return {
                ...state,
                answers: {
                    ...state.answers,
                    [action.field.id]: { 
                        answer: action.answer,
                        orderNumber: action.field.orderNumber,
                        typeID: action.field.typeID
                    }
                }
            };
        default:
            return state;
    }
};

export default newReportReducer;
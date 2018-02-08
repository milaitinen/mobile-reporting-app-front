/* eslint-disable no-undef */
import { INSERT_TITLE, CREATE_REPORT, INSERT_FIELD_ANSWER } from '../actions/newReport';

const initialState = {
    templateID: null ,
    isEditable: false,
    title: '',
    number: null,
    answers: [{
        templateID: 123,
        fieldID: 456,
        answer: 'initial answer',
    }, {
        templateID: 1234,
        fieldID: 4567,
        answer: 'second initial answer',
    }],
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
                answers: [{ ...action.fieldAnswer }, ...state.answers]
            };
        default:
            return state;
    }
};

export default newReportReducer;
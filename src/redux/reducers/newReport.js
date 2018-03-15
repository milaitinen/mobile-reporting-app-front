/* eslint-disable no-undef */
import { INSERT_TITLE, CREATE_REPORT, INSERT_FIELD_ANSWER, EMPTY_FIELDS, SET_UNSAVED, CREATE_DRAFT } from '../actions/newReport';

const initialState = {};

const newReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_REPORT:
            return {
                ...state,
                templateID: action.templateID,
                dateCreated: action.dateCreated
            };
        case INSERT_TITLE:
            return {
                ...state,
                title: action.title
            };
        case CREATE_DRAFT:
            return action.draft;
        case INSERT_FIELD_ANSWER:
            return {
                ...state,
                /*answers: {
                    ...state.answers,
                    [action.field.orderNumber]: {
                        answer: action.answer,
                        orderNumber: action.field.orderNumber,
                        // fetchFieldsAsTemplateID() returns typeID, whereas fetchFieldsByReportID() returns fieldID
                        fieldID: action.field.fieldID || action.field.typeID
                    }
                }*/
            };
        case EMPTY_FIELDS:
            return initialState;
        case SET_UNSAVED:
            return {
                ...state,
                isUnsaved: action.isUnsaved,
            };
        default:
            return state;
    }
};

export default newReportReducer;
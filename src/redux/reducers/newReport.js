/* eslint-disable no-undef */
import { INSERT_TITLE, CREATE_REPORT, INSERT_FIELD_ANSWER, EMPTY_FIELDS } from '../actions/newReport';

const initialState = {
    templateID: null ,
    title: 'Draft',
    answers: [],
    dateCreated: null,
    dateAccepted: null,
    id: null,
    orderNo: null,
    userID: null
};

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
        case INSERT_FIELD_ANSWER:
            return {
                ...state,
                answers: {
                    ...state.answers,
                    [action.field.orderNumber]: {
                        answer: action.answer,
                        orderNumber: action.field.orderNumber,
                        // fetchFieldsAsTemplateID() returns typeID, whereas fetchFieldsByReportID() returns fieldID
                        fieldID: action.field.fieldID || action.field.typeID
                    }
                }
            };
        case EMPTY_FIELDS:
            return initialState;
        default:
            return state;
    }
};

export default newReportReducer;
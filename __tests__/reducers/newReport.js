import * as types from '../../src/redux/actions/newReport';
import newReportReducer from '../../src/redux/reducers/newReport';


const testField = {
    defaultValue: 'nimi tähän',
    id: 1,
    orderNumber: 16,
    required: 1,
    templateID: 1,
    title: 'Nimikenttä',
    typeID: 5
};

const initialState = {
    templateID: null ,
    title: 'Draft',
    answers: [],
    dateCreated: null,
    dateAccepted: null,
    id: null,
    orderNo: null,
    userID: null,
    isUnsaved: true,
};

const testReport = {
    templateID: null ,
    title: 'Walmart Supplier Audit',
    answers: [],
    dateCreated: null,
    dateAccepted: null,
    id: null,
    orderNo: null,
    userID: null,
    isUnsaved: true,
};

describe('newReportReducer reducer', () => {
    it('should return the initial state', () => {
        expect(newReportReducer(undefined, {})).toEqual( {} );
    });

    it('should handle CREATE_REPORT', () => {
        expect(
            newReportReducer(initialState, {
                type: types.CREATE_REPORT,
                templateID: 4,
                dateCreated: '2018-02-24',
            })
        ).toEqual(
            {
                templateID: 4 ,
                title: 'Draft',
                answers: [],
                dateCreated: '2018-02-24',
                dateAccepted: null,
                id: null,
                orderNo: null,
                userID: null,
                isUnsaved: true,
            }
        );
    });

    it('should handle INSERT_TITLE', () => {
        expect(
            newReportReducer(undefined, {
                type: types.INSERT_TITLE,
                title: 'Walmart Supplier Audit'
            })
        ).toEqual(testReport);
    });

    it('should handle INSERT_FIELD_ANSWER', () => {
        expect(
            newReportReducer(testReport, {
                type: types.INSERT_FIELD_ANSWER,
                field: testField,
                answer: 1
            })
        ).toEqual(
            {
                templateID: null ,
                title: 'Walmart Supplier Audit',
                answers: {
                    [16]: {
                        answer: 1,
                        orderNumber: 16,
                        fieldID: 5
                    }
                },
                dateCreated: null,
                dateAccepted: null,
                id: null,
                orderNo: null,
                userID: null,
                isUnsaved: true,
            }
        );
    });

    it('should handle EMPTY_FIELDS', () => {
        expect(
            newReportReducer(testReport, {
                type: types.EMPTY_FIELDS,
            })
        ).toEqual(initialState);
    });

    it('should handle SET_UNSAVED', () => {
        expect(
            newReportReducer(initialState, {
                type: types.SET_UNSAVED,
                isUnsaved: false
            })
        ).toEqual({
            templateID: null ,
            title: 'Draft',
            answers: [],
            dateCreated: null,
            dateAccepted: null,
            id: null,
            orderNo: null,
            userID: null,
            isUnsaved: false,
        });
    });
});
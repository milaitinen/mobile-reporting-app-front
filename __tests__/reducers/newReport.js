import * as types from '../../src/redux/actions/newReport';
import newReportReducer from '../../src/redux/reducers/newReport';

describe('newReportReducer reducer', () => {
    it('should return the initial state', () => {
        expect(newReportReducer(undefined, {})).toEqual(
            {
                templateID: null ,
                title: 'Draft',
                answers: [],
                dateCreated: null,
                dateAccepted: null,
                id: null,
                orderNo: null,
                userID: null,
                isUnsaved: true,
            }
        );
    });

    it('should handle CREATE_REPORT', () => {
        expect(
            newReportReducer(undefined, {
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
        ).toEqual(
            {
                templateID: null ,
                title: 'Walmart Supplier Audit',
                answers: [],
                dateCreated: null,
                dateAccepted: null,
                id: null,
                orderNo: null,
                userID: null,
                isUnsaved: true,
            }
        );
    });

});
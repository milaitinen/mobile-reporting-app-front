import * as types from '../../src/redux/actions/newReport';
import newReportReducer from '../../src/redux/reducers/newReport';

describe('newReportReducer reducer', () => {
    it('should return the initial state', () => {
        expect(newReportReducer(undefined, {})).toEqual(
            {
                templateID: null ,
                isEditable: false,
                title: '',
                number: null,
            }
        );
    });

    it('should handle CREATE_REPORT', () => {
        expect(
            newReportReducer(undefined, {
                type: types.CREATE_REPORT,
                templateID: 4,
                isEditable: true,
            })
        ).toEqual(
            {
                templateID: 4,
                isEditable: true,
                title: '',
                number: null,
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
                templateID: null,
                isEditable: false,
                title: 'Walmart Supplier Audit',
                number: null,
            }
        );
    });

});
import * as types from '../../src/redux/actions/reports';
import reportsReducer from '../../src/redux/reducers/reports';

const exampleState = {
    2 : [{
        templateID: 2,
        userID: 1,
        orderNo: 15,
        title: 'Example',
        dateCreated: '2018-04-01',
        dateAccepted: null,
        answers: []
    }],
    3 : [{
        templateID: 3,
        userID: 1,
        orderNo: 12,
        title: 'Example2',
        dateCreated: '2018-05-16',
        dateAccepted: null,
        answers: []
    }]
};

describe('reports reducer', () => {
    it('should return the initial state', () => {
        expect(reportsReducer(undefined, {})).toEqual({});
    });

    it('should handle STORE_REPORTS_BY_TEMPLATE_ID', () => {
        expect(
            reportsReducer({},
                {
                    type: types.STORE_REPORTS_BY_TEMPLATE_ID,
                    reports: [
                        [{
                            templateID: 2,
                            userID: 1,
                            orderNo: 15,
                            title: 'Example',
                            dateCreated: '2018-04-01',
                            dateAccepted: null,
                            answers: []
                        }],
                        [{
                            templateID: 3,
                            userID: 1,
                            orderNo: 12,
                            title: 'Example2',
                            dateCreated: '2018-05-16',
                            dateAccepted: null,
                            answers: []
                        }]
                    ]
                }
            )
        ).toEqual(exampleState);
    });

    it('should handle STORE_REPORTS_BY_TEMPLATE_ID', () => {
        expect(reportsReducer(undefined, { type: types.STORE_REPORTS_BY_TEMPLATE_ID, reports: [] })).toEqual({});
    });

    it('should handle EMPTY_REPORTS', () => {
        expect(reportsReducer(exampleState, { type: types.EMPTY_REPORTS })).toEqual({});
    });

    it('should return current state when non-relevant action is called', () => {
        expect(reportsReducer(exampleState, { type: 'TEST_ACTION' })).toEqual(exampleState);
    });

});
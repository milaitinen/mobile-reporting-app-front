import * as types from '../../src/redux/actions/reports';
import reportsReducer from '../../src/redux/reducers/reports';

const stateA = {
    34 : [{
        templateID: 34,
        userID: 1,
        orderNo: 9002,
        title: 'Example',
        dateCreated: '2018-04-01',
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
                            templateID: 34,
                            userID: 1,
                            orderNo: 9002,
                            title: 'Example',
                            dateCreated: '2018-04-01',
                            dateAccepted: null,
                            answers: []
                        }]
                    ]
                }
            )
        ).toEqual(stateA);
    });

    it('should handle EMPTY_REPORTS', () => {
        expect(reportsReducer(stateA,
            {
                type: types.EMPTY_REPORTS
            }
        )).toEqual({});
    });

});
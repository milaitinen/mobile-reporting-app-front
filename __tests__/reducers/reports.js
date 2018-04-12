import * as types from '../../src/redux/actions/reports';
import reportsReducer from '../../src/redux/reducers/reports';

const exampleState = {
    2 : [{
        template_id: 2,
        user_id: 1,
        report_id: 15,
        title: 'Example',
        date_created: '2018-04-01',
        date_accepted: null,
        string_answers: [],
        option_answers: []
    }],
    3 : [{
        template_id: 3,
        user_id: 1,
        report_id: 12,
        title: 'Example2',
        date_created: '2018-05-16',
        date_accepted: null,
        string_answers: [],
        option_answers: []
    }]
};

const exampleDraft = {
    template_id: 2,
    user_id: 1,
    report_id: null,
    title: 'Draft',
    date_created: '2018-04-01',
    date_accepted: null,
    string_answers: [],
    option_answers: []
};

const insertIDState = {
    2 : [{
        template_id: 2,
        user_id: 1,
        report_id: null,
        title: 'Draft',
        date_created: '2018-04-01',
        date_accepted: null,
        string_answers: [],
        option_answers: []
    }, {
        template_id: 2,
        user_id: 1,
        report_id: 15,
        title: 'Example',
        date_created: '2018-04-01',
        date_accepted: null,
        string_answers: [],
        option_answers: []
    }],
    3 : [{
        template_id: 3,
        user_id: 1,
        report_id: 12,
        title: 'Example2',
        date_created: '2018-05-16',
        date_accepted: null,
        string_answers: [],
        option_answers: []
    }],
    4 : []
};

const draftsAndReports = {
    2 : [{
        template_id: 2,
        user_id: 1,
        report_id: null,
        title: 'Draft',
        date_created: '2018-04-01',
        date_accepted: null,
        string_answers: [],
        option_answers: []
    }, {
        template_id: 2,
        user_id: 1,
        report_id: 15,
        title: 'Example',
        date_created: '2018-04-01',
        date_accepted: null,
        string_answers: [],
        option_answers: []
    }],
    3 : [{
        template_id: 3,
        user_id: 1,
        report_id: 12,
        title: 'Example2',
        date_created: '2018-05-16',
        date_accepted: null,
        string_answers: [],
        option_answers: []
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
                            template_id: 2,
                            user_id: 1,
                            report_id: 15,
                            title: 'Example',
                            date_created: '2018-04-01',
                            date_accepted: null,
                            string_answers: [],
                            option_answers: []
                        }],
                        [{
                            template_id: 3,
                            user_id: 1,
                            report_id: 12,
                            title: 'Example2',
                            date_created: '2018-05-16',
                            date_accepted: null,
                            string_answers: [],
                            option_answers: []
                        }]
                    ]
                }
            )
        ).toEqual(exampleState);
    });

    it('should handle STORE_REPORTS_BY_TEMPLATE_ID with no reports', () => {
        expect(reportsReducer(undefined, { type: types.STORE_REPORTS_BY_TEMPLATE_ID, reports: [] })).toEqual({});
    });

    it('should handle STORE_DRAFT_BY_TEMPLATE_ID', () => {
        expect(reportsReducer(exampleState, {
            type: types.STORE_DRAFT_BY_TEMPLATE_ID, templateID: 2, draft: exampleDraft
        })).toEqual(draftsAndReports);
    });

    it('should handle EMPTY_REPORTS', () => {
        expect(reportsReducer(exampleState, { type: types.EMPTY_REPORTS })).toEqual({});
    });

    it('should handle INSERT_TEMPLATE_ID', () => {
        expect(
            reportsReducer(exampleState, {
                type: types.INSERT_TEMPLATE_ID, templateID: 4
            })
        ).toEqual(insertIDState);
    });

    it('should return current state when irrelevant action is called', () => {
        expect(reportsReducer(exampleState, { type: 'TEST_ACTION' })).toEqual(exampleState);
    });

});
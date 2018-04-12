import * as types from '../../src/redux/actions/templates';
import templatesReducer from '../../src/redux/reducers/templates';

describe('templatesReducer reducer', () => {
    it('should return the initial state', () => {
        expect(templatesReducer(undefined, {})).toEqual({});
    });

    it('should handle STORE_TEMPLATES', () => {
        expect(
            templatesReducer({},
                {
                    type: types.STORE_TEMPLATES,
                    templates: [
                        { title: 'Eka', reportCount: 40, amountOfReports: 40, template_id: 1 },
                        { title: 'Information security management', reportCount: 1020, amountOfReports: 1020, template_id: 4 }
                    ]
                }
            )
        ).toEqual(
            {
                1 : { title: 'Eka', reportCount: 40, amountOfReports: 40, template_id: 1 },
                4 : { title: 'Information security management', reportCount: 1020, amountOfReports: 1020, template_id: 4 }
            }
        );
    });

    it('should handle STORE_TEMPLATES when templates:(empty)', () => {
        expect(templatesReducer(undefined, { type: types.STORE_TEMPLATES, templates: [] })).toEqual({});
    });

    it('should handle EMPTY_TEMPLATES', () => {
        expect(templatesReducer({ 0: { title: 'Eka', reportCount: 1, amountOfReports: 1, id: 5 } },
            {
                type: types.EMPTY_TEMPLATES
            }
        )).toEqual({});
    });

});
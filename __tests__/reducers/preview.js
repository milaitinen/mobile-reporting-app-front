import * as types from '../../src/redux/actions/preview';
import previewReducer from '../../src/redux/reducers/preview';

describe('preview reducer', () => {
    it('should handle PREVIEW', () => {
        expect(
            previewReducer(undefined, {
                type: types.PREVIEW,
                templateID: 4,
                isEditable: false,
            })
        ).toEqual(
            {
                templateID: 4,
                isEditable: false,
                title: '',
                number: null,
            }
        );
    });

    it('should handle INSERT_TITLE', () => {
        expect(
            previewReducer(undefined, {
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
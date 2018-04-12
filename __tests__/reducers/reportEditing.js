import * as types from '../../src/redux/actions/reportEditing';
import reportEditingReducer from '../../src/redux/reducers/reportEditing';

const initialState = {
    isUnsaved: false,
    isSavingRequested: false,
};

describe('reportEditing reducer', () => {

    it('should return the initial state', () => {
        expect(
            reportEditingReducer(undefined, {})
        ). toEqual({
            isUnsaved: false,
            isSavingRequested: false,
        });
    });

    it('should handle SET_UNSAVED', () => {
        expect(
            reportEditingReducer(initialState, {
                type: types.SET_UNSAVED,
                isUnsaved: true
            })
        ).toEqual({
            isUnsaved: true,
            isSavingRequested: false,
        });
    });

    it('should handle SET_SAVING_REQUESTED', () => {
        expect(
            reportEditingReducer(undefined, {
                type: types.SET_SAVING_REQUESTED,
                isSavingRequested: true
            })
        ).toEqual({
            isUnsaved: false,
            isSavingRequested: true,
        });
    });
});
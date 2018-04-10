import { setUnsaved , setSavingRequested } from '../../src/redux/actions/reportEditing';

describe('Test reportEditing actions', () => {
    it('setUnsaved', () => {
        const insert = setUnsaved(false);
        expect(insert).toEqual({ type:'SET_UNSAVED', isUnsaved: false });
    });

    it('setSavingRequested', () => {
        const insert = setSavingRequested(true);
        expect(insert).toEqual({ type: 'SET_SAVING_REQUESTED', isSavingRequested: true });
    });
});
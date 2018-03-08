import { createReport, insertTitle, insertFieldAnswer, emptyFields, setUnsaved } from '../../src/redux/actions/newReport';

describe('Test newReport actions',()=>{
    it('createReport', () => {
        const insert = createReport(16, '2017-12-12');
        expect(insert).toEqual({ type:'CREATE_REPORT', templateID: 16, dateCreated: '2017-12-12' });
    });
    it('insertTitle', () => {
        const insert = insertTitle('Fishermen\'s weekly audit');
        expect(insert).toEqual({ type:'INSERT_TITLE', title: 'Fishermen\'s weekly audit' });
    });
    it('insertFieldAnswer', () => {
        const insert = insertFieldAnswer({}, 'test');
        expect(insert).toEqual({ type:'INSERT_FIELD_ANSWER', field: {}, answer: 'test' });
    });
    it('emptyFields', () => {
        const insert = emptyFields();
        expect(insert).toEqual({ type:'EMPTY_FIELDS' });
    });
    it('setUnsaved', () => {
        const insert = setUnsaved(false);
        expect(insert).toEqual({ type:'SET_UNSAVED', isUnsaved: false});
    });
});
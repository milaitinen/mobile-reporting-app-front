import { createDraft, insertTitle, openReport, insertDate, insertFieldAnswer, emptyFields, setUnsaved } from '../../src/redux/actions/newReport';

describe('Test newReport actions',()=>{

    it('createDraft', () => {
        const insert = createDraft({ template_id: 1,  title: 'Template 1', fields: {} });
        expect(insert).toEqual({ type: 'CREATE_DRAFT', draft: { template_id: 1,  title: 'Template 1', fields: {} } });
    });
    it('insertTitle', () => {
        const insert = insertTitle('Fishermen\'s weekly audit');
        expect(insert).toEqual({ type:'INSERT_TITLE', title: 'Fishermen\'s weekly audit' });
    });
    it('openReport', () => {
        const insert = openReport({ report_id: 77, user_id: 1, template_id: 1, title: 'testi' });
        expect(insert).toEqual({ type: 'OPEN_REPORT', report: { report_id: 77, user_id: 1, template_id: 1, title: 'testi' } });
    });
    it('insertDate', () => {
        const insert = insertDate('2018-03-21');
        expect(insert).toEqual({ type: 'INSERT_DATE', date: '2018-03-21' });
    });
    it('insertFieldAnswer', () => {
        const insert = insertFieldAnswer({}, 'test', false);
        expect(insert).toEqual({ type:'INSERT_FIELD_ANSWER', field: {}, value: 'test', isOption: false });
    });
    it('emptyFields', () => {
        const insert = emptyFields();
        expect(insert).toEqual({ type:'EMPTY_FIELDS' });
    });
    /*
    it('setUnsaved', () => {
        const insert = setUnsaved(false);
        expect(insert).toEqual({ type:'SET_UNSAVED', isUnsaved: false });
    });*/
});
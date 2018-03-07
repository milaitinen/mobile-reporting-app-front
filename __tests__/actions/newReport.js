import { createReport, insertTitle } from '../../src/redux/actions/newReport';

describe('Test newReport actions',()=>{
    it('createReport', () => {
        const insert = createReport(16, '2017-12-12');
        expect(insert).toEqual({ type:'CREATE_REPORT', templateID: 16, dateCreated: '2017-12-12' });
    });
    it('insertTitle', () => {
        const insert = insertTitle('Fishermen\'s weekly audit');
        expect(insert).toEqual({ type:'INSERT_TITLE', title: 'Fishermen\'s weekly audit' });
    });
});
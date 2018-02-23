import { preview, insertTitle } from '../../src/redux/actions/preview';

describe('Test preview actions',()=>{
    it('preview', () => {
        const insert = preview(25, false);
        expect(insert).toEqual({ type:"PREVIEW", templateID: 25, isEditable: false })
    });
    it('insertTitle', () => {
        const insert = insertTitle('Microbial food safety');
        expect(insert).toEqual({ type:"INSERT_TITLE", title: 'Microbial food safety' })
    });
});
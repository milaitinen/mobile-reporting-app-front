import { storeTemplates, emptyTemplates } from '../../src/redux/actions/templates';

describe('Test templates actions',()=>{
    it('store templates when called storeTemplates', () => {
        const insert = storeTemplates([]);
        expect(insert).toEqual({ type:'STORE_TEMPLATES', templates: [] });
    });
    it('empty templates when called emptyTemplates', () => {
        const insert = emptyTemplates();
        expect(insert).toEqual({ type:'EMPTY_TEMPLATES' });
    });
});
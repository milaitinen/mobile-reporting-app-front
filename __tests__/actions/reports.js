import { storeReportsByTemplateID, emptyReports, storeDraftByTemplateID } from '../../src/redux/actions/reports';

describe('Test reportsByTemplateID actions',() => {
    it('stores reports when called storeReportsByTemplateID', () => {
        const insert = storeReportsByTemplateID([]);
        expect(insert).toEqual({ type:'STORE_REPORTS_BY_TEMPLATE_ID', reports: [] });
    });
    it('empty reports when called emptyReports', () => {
        const insert = emptyReports();
        expect(insert).toEqual({ type:'EMPTY_REPORTS' });
    });
    it('stores drafts when called storeDraftByTemplateID', () => {
        const insert = storeDraftByTemplateID(22, []);
        expect(insert).toEqual({ type:'STORE_DRAFT_BY_TEMPLATE_ID', templateID: 22, draft: [] });
    });
});
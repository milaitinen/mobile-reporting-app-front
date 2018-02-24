import { storeReportsByTemplateID, emptyReports } from '../../src/redux/actions/reportsByTemplateID';

describe('Test reportsByTemplateID actions',()=>{
    it('storeReportsByTemplateID', () => {
        const insert = storeReportsByTemplateID([]);
        expect(insert).toEqual({ type:"STORE_REPORTS_BY_TEMPLATE_ID", reportsByTempID: [] })
    });
    it('emptyReports', () => {
        const insert = emptyReports();
        expect(insert).toEqual({ type:"EMPTY_REPORTS" })
    });
});
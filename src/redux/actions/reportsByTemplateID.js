// easier to refactor later and debug
export const STORE_REPORTS_BY_TEMPLATE_ID = 'STORE_REPORTS_BY_TEMPLATE_ID';
export const EMPTY_REPORTS = 'EMPTY_REPORTS';

export const storeReportsByTemplateID = (reports) => ({
    type: STORE_REPORTS_BY_TEMPLATE_ID,
    reportsByTempID: reports
});

export const emptyReports = () => ({
    type: EMPTY_REPORTS
});

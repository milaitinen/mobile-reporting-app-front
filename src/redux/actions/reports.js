// easier to refactor later and debug
export const STORE_REPORTS_BY_TEMPLATE_ID = 'STORE_REPORTS_BY_TEMPLATE_ID';
export const EMPTY_REPORTS = 'EMPTY_REPORTS';
export const STORE_DRAFTS_BY_TEMPLATE_ID = 'STORE_DRAFTS_BY_TEMPLATE_ID';

export const storeReportsByTemplateID = (reports) => ({
    type: STORE_REPORTS_BY_TEMPLATE_ID,
    reports: reports
});

export const storeDraftsByTemplateID = (templateID, report) => ({
    type: STORE_DRAFTS_BY_TEMPLATE_ID,
    templateID: templateID,
    report: report
});

export const emptyReports = () => ({
    type: EMPTY_REPORTS
});

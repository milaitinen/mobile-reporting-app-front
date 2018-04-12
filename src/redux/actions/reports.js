// easier to refactor later and debug
export const STORE_REPORTS_BY_TEMPLATE_ID = 'STORE_REPORTS_BY_TEMPLATE_ID';
export const EMPTY_REPORTS = 'EMPTY_REPORTS';
export const STORE_DRAFT_BY_TEMPLATE_ID = 'STORE_DRAFT_BY_TEMPLATE_ID';
export const INSERT_TEMPLATE_ID = 'INSERT_TEMPLATE_ID';
export const STORE_QUEUED_REPORT_BY_TEMPLATE_ID = 'STORE_QUEUED_REPORT_BY_TEMPLATE_ID';
export const storeReportsByTemplateID = (reports) => ({
    type: STORE_REPORTS_BY_TEMPLATE_ID,
    reports: reports
});

export const storeDraftByTemplateID = (templateID, draft) => ({
    type: STORE_DRAFT_BY_TEMPLATE_ID,
    templateID: templateID,
    draft: draft
});

export const storeQueuedReportByTemplateID = (templateID, report ) => ({
    type: STORE_QUEUED_REPORT_BY_TEMPLATE_ID,
    templateID: templateID,
    report: report
});

export const insertTemplateID = (templateID) => ({
    type: INSERT_TEMPLATE_ID,
    templateID: templateID
});

export const emptyReports = () => ({
    type: EMPTY_REPORTS
});


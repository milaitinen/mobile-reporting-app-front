// easier to refactor later and debug
export const STORE_REPORTS_BY_TEMPLATE_ID = 'STORE_REPORTS_BY_TEMPLATE_ID';
export const EMPTY_REPORTS = 'EMPTY_REPORTS';
export const STORE_DRAFT_BY_TEMPLATE_ID = 'STORE_DRAFT_BY_TEMPLATE_ID';

export const storeReportsByTemplateID = (reports) => ({
    type: STORE_REPORTS_BY_TEMPLATE_ID,
    reports: reports
});

export const storeDraftByTemplateID = (templateID, draft) => ({
    type: STORE_DRAFT_BY_TEMPLATE_ID,
    templateID: templateID,
    draft: draft
});

export const emptyReports = () => ({
    type: EMPTY_REPORTS
});

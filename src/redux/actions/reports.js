// easier to refactor later and debug
export const STORE_REPORTS = 'STORE_REPORTS';

export const storeReports = (reports) => ({
    type: STORE_REPORTS,
    reports: reports
});

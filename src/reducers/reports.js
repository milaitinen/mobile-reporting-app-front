import { STORE_REPORTS } from '../actions/reports';

const initialState = {
    reports: {}
};

const reportsReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_REPORTS: {
            const newReports = action.reports.map((report) => {
                const reportObj = {};
                reportObj[report.id] = report;
                return reportObj;
            }).reduce((allReports, currentReport) => Object.assign(allReports, currentReport));

            return Object.assign(state.reports, newReports);
        }
        default:
            return state;
    }
};

export default reportsReducer;
import { STORE_REPORTS } from '../actions/reports';

const initialState = {
    reports: {}
};

const match = (state, action) => {
    return (
        action.reports.map((report) => {
            const reportObj = {};
            reportObj[report.id] = report;
            return reportObj;
        }).reduce((allReports, currentReport) => Object.assign(allReports, currentReport))
    );
};

const reportsReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_REPORTS: {
            const newReports = match(state, action);
            // Object.assign merges the given parameters together and returns an object
            return Object.assign(state.reports || {}, newReports);
        }
        default:
            return state;
    }
};

export default reportsReducer;


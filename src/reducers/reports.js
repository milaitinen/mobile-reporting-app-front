import { STORE_REPORTS } from '../actions/reports';

const initialState = {
    reports: {}
};

// return Array(Array(reports)) as object that has templateID as its keys and matching reports as its values (in Array)
const matchArrayWithTemplateID = (state, action) => {
    return (
        action.reports.map((report) => {
            const reportsByID = {};
            if (report.length > 0) {
                const tempID = report[0].templateID;
                reportsByID[tempID]=report;
            }
            return reportsByID;
        }).reduce((allReports, currentReport) => Object.assign(allReports, currentReport))
    );
};

const reportsReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_REPORTS: {
            const newReports = matchArrayWithTemplateID(state, action);
            // Object.assign merges the given parameters together and return an object
            return Object.assign(state.reports, newReports);
        }
        default:
            return state;
    }
};

export default reportsReducer;


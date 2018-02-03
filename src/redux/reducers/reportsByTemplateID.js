import { STORE_REPORTS_BY_TEMPLATE_ID } from '../actions/reportsByTemplateID';

const initialState = {};

// return Array(Array(reports)) as object that has templateID as its keys and matching reports as its values (in Array)
const matchArrayWithTemplateID = (state, action) => {
    if (action.reportsByTempID.length < 1) return {};
    return (
        action.reportsByTempID.map((report) => {
            const reportsByID = {};
            // check if the array is empty
            if (report.length > 0) {
                const tempID = report[0].templateID;
                reportsByID[tempID]=report;
            }
            return reportsByID;
        }).reduce((allReports, currentReport) => Object.assign(allReports, currentReport))
    );
};

const reportsByTemplateIDReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_REPORTS_BY_TEMPLATE_ID: {
            const newReports = matchArrayWithTemplateID(state, action);
            // Object.assign merges the given parameters together and returns an object
            return Object.assign(state.reportsByTempID || {}, newReports);

        }
        default:
            return state;
    }
};

export default reportsByTemplateIDReducer;


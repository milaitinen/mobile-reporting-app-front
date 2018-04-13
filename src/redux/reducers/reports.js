import { STORE_REPORTS_BY_TEMPLATE_ID, EMPTY_REPORTS, STORE_DRAFT_BY_TEMPLATE_ID,
    STORE_QUEUED_REPORT_BY_TEMPLATE_ID, INSERT_TEMPLATE_ID } from '../actions/reports';

const initialState = {};

// return Array(Array(reports)) as object that has templateID as its keys and matching reports as its values (in Array)
const matchArrayWithTemplateID = (state, action) => {
    if (action.reports.length < 1) return {};
    return (
        action.reports.map((report) => {
            const reportsByID = {};
            // check if the array is empty
            if (report.length > 0) {
                const tempID = report[0].template_id;
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
            return Object.assign(state, newReports); // Merge the given parameters together and return an object
        }
        case EMPTY_REPORTS: {
            return initialState;
        }
        case STORE_DRAFT_BY_TEMPLATE_ID: {
            state[action.templateID].unshift(action.draft); // Add draft to the start of the array of reports( >< push)
            return state;
        }
        case STORE_QUEUED_REPORT_BY_TEMPLATE_ID: {
            state[action.templateID].unshift(action.report);
            return state;
        }
        case INSERT_TEMPLATE_ID: {
            state[action.templateID] = [];
            return state;
        }
        default:
            return state;
    }
};

export default reportsByTemplateIDReducer;


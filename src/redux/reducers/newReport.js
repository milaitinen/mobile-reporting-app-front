/* eslint-disable no-undef */
import {
    INSERT_TITLE,
    INSERT_DATE,
    INSERT_FIELD_ANSWER,
    EMPTY_FIELDS,
    OPEN_REPORT,
    CREATE_DRAFT,
} from '../actions/newReport';

const initialState = {};

// A helper function to find the correct answer field inside the current state and update answer.
const insertAnswer = (state, action) => {
    // Check whether the field is option-type (dropdown, checkbox)
    if (action.isOption) {
        // Find answer field with the right id and update value

        if ((action.field.type === 'RADIOBUTTON') || (action.field.type === 'DROPDOWN')) { //clear selections if field type is radiobutton or dropdown
            state.option_answers.filter((answer) => {
                return (action.field.field_options
                    .map((option) => option.field_option_id)
                    .includes(answer.field_option_id));
            }).map((answer) => answer.selected = false);
        }

        state.option_answers.map(i => {
            if (i.field_option_id === action.value.field_option_id) i.selected = !i.selected;
        });
    } else {
        state.string_answers.map(i => {
            if (i.field_id === action.field.field_id) i.value = action.value;
        });
    }

    return {
        ...state
    };
};

const newReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case INSERT_DATE: {
            return {
                ...state,
                date_created: action.date
            };
        }
        case INSERT_TITLE: {
            return {
                ...state,
                title: action.title
            };
        }
        case CREATE_DRAFT: {
            return action.draft;
        }
        case INSERT_FIELD_ANSWER: {
            return insertAnswer(state, action);
        }
        case OPEN_REPORT: {
            // Create deep copy, so that modifying the opened report doesn't affect the version saved in store.reports
            return JSON.parse(JSON.stringify(action.report));
        }
        case EMPTY_FIELDS: {
            return initialState;
        }

        default: {
            return state;
        }
    }
};

export default newReportReducer;

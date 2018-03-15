/* eslint-disable no-undef */
import {
    INSERT_TITLE,
    INSERT_DATE,
    INSERT_FIELD_ANSWER,
    EMPTY_FIELDS, SET_UNSAVED,
    CREATE_DRAFT
} from '../actions/newReport';

const initialState = {};

// A helper function to find the correct answer field inside the current state and update answer.
const insertAnswer = (state, action) => {
    // Check whether the field is option-type (dropdown, checkbox)
    if (action.isOption) {
        // Find answer field with the right id and update value
        state.option_answers.map(i => {
            if (i.option_answer_id === action.field.field_options.field_option_id) i.selected = action.value;
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
        case EMPTY_FIELDS: {
            return initialState;
        }
        case SET_UNSAVED: {
            return {
                ...state,
                isUnsaved: action.isUnsaved,
            };
        }
        default: {
            return state;
        }
    }
};

export default newReportReducer;
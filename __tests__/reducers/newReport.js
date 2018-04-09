import * as types from '../../src/redux/actions/newReport';
import newReportReducer from '../../src/redux/reducers/newReport';


const testField = {
    field_id: 1,
    template_id: 1,
    order_number: 1,
    title: 'Name',
    required: true,
    type: 'TEXTFIELD_SHORT',
    default_value: null,
    field_options: null,
};

const testRadioField = {
    field_id: 3,
    template_id: 1,
    order_number: 3,
    title: 'Question 1',
    required: true,
    type: 'RADIOBUTTON',
    field_options: [
        {
            field_option_id: 1,
            field_id: 3,
            value: 'Option 1'
        },
        {
            field_option_id: 2,
            field_id: 3,
            value: 'Option 2'
        }
    ],
};

const testDropdownField = {
    field_id: 4,
    template_id: 1,
    order_number: 4,
    title: 'Users',
    required: true,
    type: 'DROPDOWN',
    field_options: [
        {
            field_option_id: 3,
            field_id: 4,
            value: 'Maisa'
        },
        {
            field_option_id: 4,
            field_id: 4,
            value: 'Pentti'
        }
    ],
};

const initialState = {};

const testReport = {
    report_id: 1,
    user_id: 1,
    template_id: 1,
    title: 'Walmart Supplier Audit',
    date_created: null,
    date_accepted: null,
    string_answers: [
        {
            string_answer_id: null,
            report_id: 1,
            field_id: 1,
            value: null
        },
        {
            string_answer_id: null,
            report_id: 1,
            field_id: 2,
            value: 'Default value'
        }
    ],
    option_answers: [
        {
            option_answer_id: null,
            report_id: 1,
            field_option_id: 1,
            selected: false,
        },
        {
            option_answer_id: null,
            report_id: 1,
            field_option_id: 2,
            selected: false
        }
    ],
};

const testDraft = {
    report_id: -1,
    user_id: 1,
    template_id: 1,
    title: 'Walmart Supplier Audit',
    date_created: '2018-04-22',
    date_accepted: null,
    string_answers: [
        {
            string_answer_id: 1,
            report_id: 1,
            field_id: 1,
            value: 'First name'
        },
        {
            string_answer_id: 2,
            report_id: 1,
            field_id: 2,
            value: 'Last name'
        }
    ],
    option_answers: [
        {
            option_answer_id: null,
            report_id: 1,
            field_option_id: 1,
            selected: false,
        },
        {
            option_answer_id: null,
            report_id: 1,
            field_option_id: 2,
            selected: false
        }
    ],
};

const testInsertedStringAnswer = {
    report_id: 1,
    user_id: 1,
    template_id: 1,
    title: 'Walmart Supplier Audit',
    date_created: null,
    date_accepted: null,
    string_answers: [
        {
            string_answer_id: null,
            report_id: 1,
            field_id: 1,
            value:'Esimerkkinimi'
        },
        {
            string_answer_id: null,
            report_id: 1,
            field_id: 2,
            value: 'Default value'
        }
    ],
    option_answers: [
        {
            option_answer_id: null,
            report_id: 1,
            field_option_id: 1,
            selected: false,
        },
        {
            option_answer_id: null,
            report_id: 1,
            field_option_id: 2,
            selected: false
        }
    ],
};

const testRadioAnswer = {
    report_id: 1,
    user_id: 1,
    template_id: 1,
    title: 'Walmart Supplier Audit',
    date_created: null,
    date_accepted: null,
    string_answers: [
        {
            string_answer_id: null,
            report_id: 1,
            field_id: 1,
            value:'Esimerkkinimi'   // this value is inserted in the previous test
        },                          // INSERT_FIELD_ANSWER with string answers
        {
            string_answer_id: null,
            report_id: 1,
            field_id: 2,
            value: 'Default value'
        }
    ],
    option_answers: [
        {
            option_answer_id: null,
            report_id: 1,
            field_option_id: 1,
            selected: true,
        },
        {
            option_answer_id: null,
            report_id: 1,
            field_option_id: 2,
            selected: false
        }
    ],
};

const testDropdownReport = {
    report_id: 2,
    user_id: 1,
    template_id: 1,
    title: 'Test dropdown report',
    date_created: null,
    date_accepted: null,
    string_answers: [
        {
            string_answer_id: null,
            report_id: 2,
            field_id: 1,
            value: null
        },
        {
            string_answer_id: null,
            report_id: 2,
            field_id: 2,
            value: 'Default value'
        }
    ],
    option_answers: [
        {
            option_answer_id: null,
            report_id: 2,
            field_option_id: 3,
            selected: false,
        },
        {
            option_answer_id: null,
            report_id: 2,
            field_option_id: 4,
            selected: false
        }
    ]

};

const testDropdownAnswer = {
    report_id: 2,
    user_id: 1,
    template_id: 1,
    title: 'Test dropdown report',
    date_created: null,
    date_accepted: null,
    string_answers: [
        {
            string_answer_id: null,
            report_id: 2,
            field_id: 1,
            value: null
        },
        {
            string_answer_id: null,
            report_id: 2,
            field_id: 2,
            value: 'Default value'
        }
    ],
    option_answers: [
        {
            option_answer_id: null,
            report_id: 2,
            field_option_id: 3,
            selected: true,
        },
        {
            option_answer_id: null,
            report_id: 2,
            field_option_id: 4,
            selected: false
        }
    ]

};

describe('newReportReducer reducer', () => {
    it('should return the initial state', () => {
        expect(newReportReducer(undefined, {})).toEqual( {} );
    });

    it('should handle INSERT_DATE', () => {
        expect(
            newReportReducer(undefined, {
                type: types.INSERT_DATE,
                date: '2018-03-21'
            })
        ).toEqual(
            { date_created: '2018-03-21' }
        );
    });

    it('should handle INSERT_TITLE', () => {
        expect(
            newReportReducer(undefined, {
                type: types.INSERT_TITLE,
                title: 'Walmart Supplier Audit'
            })
        ).toEqual(
            { title: 'Walmart Supplier Audit' }
        );
    });

    it('should handle CREATE_DRAFT', () => {
        expect(
            newReportReducer(testReport, {
                type: types.CREATE_DRAFT,
                draft: testDraft
            })
        ).toEqual(testDraft);
    });

    it('should handle INSERT_FIELD_ANSWER with string answers', () => {
        expect(
            newReportReducer(testReport, {
                type: types.INSERT_FIELD_ANSWER,
                field: testField,
                value: 'Esimerkkinimi',
                isOption: false
            })
        ).toEqual(testInsertedStringAnswer);
    });

    it('should handle INSERT_FIELD_ANSWER with radiobutton answers', () => {
        expect(
            newReportReducer(testReport, {
                type: types.INSERT_FIELD_ANSWER,
                field: testRadioField,
                value: {
                    field_option_id: 1,
                },
                isOption: true
            })
        ).toEqual(testRadioAnswer);
    });

    it('should handle INSERT_FIELD_ANSWER with dropdown answers', () => {
        expect(
            newReportReducer(testDropdownReport, {
                type: types.INSERT_FIELD_ANSWER,
                field: testDropdownField,
                value: {
                    field_option_id: 3
                },
                isOption: true
            })
        ).toEqual(testDropdownAnswer);
    });

    it('should handle OPEN_REPORT', () => {
        expect(
            newReportReducer(testReport, {
                type: types.OPEN_REPORT,
                report: testReport
            })
        ).toEqual(testReport);
    });

    it('should handle EMPTY_FIELDS', () => {
        expect(
            newReportReducer(testReport, {
                type: types.EMPTY_FIELDS,
            })
        ).toEqual(initialState);
    });


    /*
    it('should handle SET_UNSAVED', () => {
        expect(
            newReportReducer(initialState, {
                type: types.SET_UNSAVED,
                isUnsaved: false
            })
        ).toEqual({
            isUnsaved: false,
        });
    });*/
});
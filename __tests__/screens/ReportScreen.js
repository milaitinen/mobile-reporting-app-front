import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch';
//import { shallow } from 'enzyme';
//import { ActivityIndicator } from 'react-native';

import * as reportEditingTypes from '../../src/redux/actions/reportEditing';
import * as newReportTypes from '../../src/redux/actions/newReport';
import { ReportScreen } from '../../src/screens/ReportScreen';
//import { url } from '../../src/screens/urlsetting';

configure({ adapter: new Adapter() });

jest.mock('DatePickerIOS', () => 'DatePickerIOS');

const templates = {
    1: {
        template_id: 1,
        title: 'Template 1',
        fields: [
            {
                field_id: 1,
                template_id: 1,
                order_number: 1,
                title: 'Name',
                required: true,
                type: 'TEXTFIELD_SHORT',
                default_value: null,
                field_options: null
            }, {
                field_id: 2,
                template_id: 1,
                order_number: 2,
                title: 'Nice Checkbox',
                required: true,
                type: 'CHECKBOX',
                default_value: null,
                field_options: [
                    { field_option_id: 1, field_id: 2, value: 'Option 1', default_value: true },
                    { field_option_id: 2, field_id: 2, value: 'Option 2', default_value: false }
                ]
            }, {
                field_id: 3,
                template_id: 1,
                order_number: 3,
                title: 'Options',
                required: true,
                type: 'RADIOBUTTON',
                default_value: null,
                field_options: [
                    { field_option_id: 3, field_id: 3, value: 'Option 1', default_value: true },
                    { field_option_id: 4, field_id: 3, value: 'Option 2', default_value: false }
                ]
            }, {
                field_id: 4,
                template_id: 1,
                order_number: 4,
                title: 'Nice Dropdown',
                required: true,
                type: 'DROPDOWN',
                default_value: null,
                field_options: [
                    { field_option_id: 5, field_id: 4, value: 'Finland', default_value: true },
                    { field_option_id: 6, field_id: 4, value: 'Sweden', default_value: false }
                ]
            }, {
                field_id: 5,
                template_id: 1,
                order_number: 5,
                title: 'Instructions',
                required: true,
                type: 'INSTRUCTIONS',
                default_value: 'Very nice and long instruction',
                field_options: null
            }, {
                field_id: 6,
                template_id: 1,
                order_number: 6,
                title: 'Tell me about yourself',
                required: true,
                type: 'TEXTFIELD_LONG',
                default_value: null,
                field_options: null
            }, {
                field_id: 7,
                template_id: 1,
                order_number: 7,
                title: 'Calendar',
                required: true,
                default_value: '2018-04-12',
                type: 'CALENDAR'
            }, {
                field_id: 8,
                template_id: 1,
                order_number: 8,
                title: 'Time',
                required: true,
                default_value: '14:00',
                type: 'TIME'
            }, {
                field_id: 9,
                template_id: 1,
                order_number: 9,
                title: 'Google',
                required: true,
                default_value: 'http://www.google.com',
                type: 'LINK'
            }, {
                field_id: 10,
                template_id: 1,
                order_number: 10,
                title: 'Postal code',
                required: true,
                default_value: '3123',
                type: 'NUMBERFIELD'
            }
        ]
    }
};

const reports = {
    '1': [{
        report_id: 1,
        user_id: 1,
        template_id: 1,
        title: 'Testiraportti',
        date_created: '2018-03-16',
        date_accepted: null,
        string_answers: [
            { string_answer_id: 208, report_id: 1, field_id: 1, value: 'Test1' },
            { string_answer_id: 112, report_id: 1, field_id: 7, value: '2018-04-10' },
            { string_answer_id: 16, report_id: 1, field_id: 8, value: '10:33' },
            { string_answer_id: 200, report_id: 1, field_id: 9, value: 'http://www.google.com' },
            { string_answer_id: 200, report_id: 1, field_id: 10, value: '21789' }
        ],
        option_answers: [
            { option_answer_id: null, report_id: 1, field_option_id: 3, selected: true },
            { option_answer_id: null, report_id: 1, field_option_id: 4, selected: false }
        ]
    }]
};

const report = {
    report_id: 1,
    user_id: 1,
    template_id: 1,
    title: 'Testiraportti',
    date_created: '2018-03-16',
    date_accepted: null,
    string_answers: [
        { string_answer_id: 208, report_id: 1, field_id: 1, value: 'Test1' },
        { string_answer_id: 112, report_id: 1, field_id: 7, value: '2018-04-10' },
        { string_answer_id: 16, report_id: 1, field_id: 8, value: '10:33' },
        { string_answer_id: 200, report_id: 1, field_id: 9, value: 'http://www.google.com' },
        { string_answer_id: 200, report_id: 1, field_id: 10, value: '21789' }
    ],
    option_answers: [
        { option_answer_id: null, report_id: 1, field_option_id: 1, selected: true },
        { option_answer_id: null, report_id: 1, field_option_id: 2, selected: false },
        { option_answer_id: null, report_id: 1, field_option_id: 3, selected: true },
        { option_answer_id: null, report_id: 1, field_option_id: 4, selected: false },
        { option_answer_id: null, report_id: 1, field_option_id: 5, selected: false },
        { option_answer_id: null, report_id: 1, field_option_id: 6, selected: true }
    ]
};

describe('ReportScreen', () => {

    const dispatch = jest.fn();
    const goBack = jest.fn();
    const refresh = jest.fn();
    const removeDraft = jest.fn(() => new Promise(resolve => resolve()));

    const navigation = {
        goBack: goBack,
        dispatch: jest.fn(),
        state: { params: { templateID: 1, reportID: -1, isNewReport: false, title: 'Test', refresh: refresh, navigateDebounce: jest.fn() } }
    };

    const reportScreen = renderer.create(
        <ReportScreen
            navigation={navigation}
            isUnsaved={false}
            isSavingRequested={true}
            isNewReport={false}
            isConnected={true}
            reports={reports}
            report={report}
            templates={templates}
            dispatch={dispatch} />
    );

    jest.unmock('../../src/api');
    const saveToQueueWIthTemplateID = jest.fn();
    const api = require.requireActual('../../src/api');
    api.fetchEmptyTemplate = jest.fn(() => new Promise(resolve => resolve({ template_id: 2, report_id: null, user_id: 4 })));
    api.createNewReport = jest.fn(() => new Promise(resolve => resolve({ status: 200 })));
    api.removeDraft = removeDraft;
    api.saveToQueueWithTemplateID = saveToQueueWIthTemplateID;

    it('renders correctly', () => {
        const tree = renderer.create(
            <ReportScreen
                navigation={navigation}
                reports={reports}
                report={report}
                templates={templates}
                dispatch={dispatch}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('saveAndLeave calls this.props.navigation.goBack()', () => {
        const inst = reportScreen.getInstance();
        inst.saveAndLeave();
        expect(goBack).toHaveBeenCalled();
    });

    it('send() calls this.props.navigation.state.params.refresh() when response status is 200', async () => {
        const inst = reportScreen.getInstance();
        await inst.send();
        expect(refresh).toHaveBeenCalled();
    });

    it('_createDraft should dispatch(createDraft(...))', async () => {
        const inst = reportScreen.getInstance();
        await inst._createDraft();
        expect(dispatch).toHaveBeenCalledWith({
            type: newReportTypes.CREATE_DRAFT,
            draft: { template_id: 2, report_id: null, user_id: 4 }
        });
    });

    it('_deleteDraft should empty fields by calling dispatch(emptyFields())', async () => {
        const inst = reportScreen.getInstance();
        await inst._deleteDraft();
        expect(dispatch).toHaveBeenCalledWith({
            type: newReportTypes.EMPTY_FIELDS
        });
    });

    it('insertAnswer() should dispatch setUnsaved(true) if this.props.isUnsaved=false', () => {
        const inst = reportScreen.getInstance();
        inst.insertAnswer('CHECKBOX', 'Helsinki', true);
        expect(dispatch).toHaveBeenCalledWith({
            type: reportEditingTypes.SET_UNSAVED,
            isUnsaved: true
        });
    });

    it('saveToPending() should call saveToQueueWIthTemplateID()', () => {
        const inst = reportScreen.getInstance();
        inst.saveToPending();
        expect(saveToQueueWIthTemplateID).toHaveBeenCalled();
    });

    it('dispatch(setSavingRequested(false)) should be called in componentWillUnmount if isSavingRequested=true and ' +
        'report_id is negative (draft)', () => {
        const inst = reportScreen.getInstance();
        inst.componentWillUnmount();

        expect(dispatch).toHaveBeenCalledWith({
            type: reportEditingTypes.SET_SAVING_REQUESTED,
            isSavingRequested: false
        });
    });

});
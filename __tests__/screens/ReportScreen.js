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
            },
            {
                field_id: 2,
                template_id: 1,
                order_number: 2,
                title: 'Options',
                required: true,
                type: 'RADIOBUTTON',
                default_value: null,
                field_options: [
                    { field_option_id: 3, field_id: 2, value: 'Option 1', default_value: true },
                    { field_option_id: 4, field_id: 2, value: 'Option 2', default_value: false }
                ]
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
        string_answers: [{ string_answer_id: 208, report_id: 1, field_id: 1, value: 'Test1' }],
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
    string_answers: [{ string_answer_id: 208, report_id: 1, field_id: 1, value: 'Test1' }],
    option_answers: [
        { option_answer_id: null, report_id: 1, field_option_id: 3, selected: true },
        { option_answer_id: null, report_id: 1, field_option_id: 4, selected: false }
    ]
};

describe('TemplateScreen', () => {

    const dispatch = jest.fn();
    const goBack = jest.fn();
    const refresh = jest.fn();
    const removeDraft = jest.fn(() => new Promise(resolve => resolve()));
    const navigation = {
        goBack: goBack,
        dispatch: jest.fn(),
        state: { params: { templateID: 1, reportID: -1, title: 'Testiraportti', refresh: refresh } }
    };
    const wrapper = renderer.create(
        <ReportScreen
            navigation={navigation}
            isUnsaved={false}
            isSavingRequested={true}
            reports={reports}
            report={report}
            templates={templates}
            dispatch={dispatch} />
    );

    jest.unmock('../../src/screens/api');
    const api = require.requireActual('../../src/screens/api');
    api.fetchEmptyTemplate = jest.fn(() => new Promise(resolve => resolve({ template_id: 2, report_id: null, user_id: 4 })));
    api.createNewReport = jest.fn(() => new Promise(resolve => resolve({ status: 200 })));
    api.removeDraft = removeDraft;

    it('renders correctly', () => {
        const tree = renderer.create(
            <ReportScreen navigation={navigation} reports={reports} report={report} templates={templates} dispatch={dispatch}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('saveAndLeave calls this.props.navigation.goBack()', () => {
        const inst = wrapper.getInstance();
        inst.saveAndLeave();
        expect(goBack).toHaveBeenCalled();
    });

    it('send() calls this.props.navigation.state.params.refresh() when response status is 200', async () => {
        const inst = wrapper.getInstance();
        await inst.send();
        expect(removeDraft).toHaveBeenCalled();
    });

    it('_createDraft should dispatch(createDraft(...))', async () => {
        const inst = wrapper.getInstance();
        await inst._createDraft();
        expect(dispatch).toHaveBeenCalledWith({
            type: newReportTypes.CREATE_DRAFT,
            draft: { template_id: 2, report_id: null, user_id: 4 }
        });
    });

    it('_deleteDraft should empty fields by calling dispatch(emptyFields())', async () => {
        const inst = wrapper.getInstance();
        await inst._deleteDraft();
        expect(dispatch).toHaveBeenCalledWith({
            type: newReportTypes.EMPTY_FIELDS
        });
    });

    it('insertAnswer() should dispatch setUnsaved(true) if this.props.isUnsaved=false', () => {
        const inst = wrapper.getInstance();
        inst.insertAnswer('CHECKBOX', 'Helsinki', true);
        expect(dispatch).toHaveBeenCalledWith({
            type: reportEditingTypes.SET_UNSAVED,
            isUnsaved: true
        });
    });

    it('dispatch(setSavingRequested(false)) should be called in componentWillUnmount if isSavingRequested=true and ' +
        'report_id is negative (draft)', () => {
        const inst = wrapper.getInstance();
        inst.componentWillUnmount();
        expect(dispatch).toHaveBeenCalledWith({
            type: reportEditingTypes.SET_SAVING_REQUESTED,
            isSavingRequested: false
        });
    });

});
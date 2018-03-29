import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch';
//import { shallow } from 'enzyme';
//import { ActivityIndicator } from 'react-native';

import { ReportScreen } from '../../src/screens/ReportScreen';
//import { url } from '../../src/screens/urlsetting';

configure({ adapter: new Adapter() });

const navigation = { state: { params: { templateID: 1, reportID: 1, title: 'Testiraportti' } } };
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
                    {
                        field_option_id: 3,
                        field_id: 2,
                        value: 'Option 1',
                        default_value: true
                    },
                    {
                        field_option_id: 4,
                        field_id: 2,
                        value: 'Option 2',
                        default_value: false
                    }
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
        string_answers: [
            {
                string_answer_id: 208,
                report_id: 1,
                field_id: 1,
                value: 'Test1'
            }
        ],
        option_answers: [
            {
                option_answer_id: null,
                report_id: 1,
                field_option_id: 3,
                selected: true,
            },
            {
                option_answer_id: null,
                report_id: 1,
                field_option_id: 4,
                selected: false
            }
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
        {
            string_answer_id: 208,
            report_id: 1,
            field_id: 1,
            value: 'Test1'
        }
    ],
    option_answers: [
        {
            option_answer_id: null,
            report_id: 1,
            field_option_id: 3,
            selected: true,
        },
        {
            option_answer_id: null,
            report_id: 1,
            field_option_id: 4,
            selected: false
        }
    ]
};

it('renders correctly', () => {
    const tree = renderer.create(
        <ReportScreen
            navigation={navigation}
            reports={reports}
            report={report}
            templates={templates}
            dispatch={jest.fn()}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
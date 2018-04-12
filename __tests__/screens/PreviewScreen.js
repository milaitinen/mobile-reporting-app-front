import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch';
import { shallow } from 'enzyme';
import { ActivityIndicator } from 'react-native';

import { PreviewScreen } from '../../src/screens/PreviewScreen';
import { url } from '../../src/screens/urlsetting';

configure({ adapter: new Adapter() });

describe('<PreviewScreen />', () => {

    jest.mock('DatePickerIOS', () => 'DatePickerIOS');
    Date.now = jest.fn(() => new Date(Date.UTC(2018, 4, 12)).valueOf());

    const navigate = jest.fn();
    const navigation = { navigate: navigate, state: { params: { refresh: jest.fn(), isEditable: true } } };
    const templates = { 1: { template_id: 1, title: 'Template 1', fields: [
        {
            field_id: 1,
            template_id: 1,
            order_number: 1,
            title: 'Name',
            required: true,
            default_value: null,
            type: 'TEXTFIELD_SHORT'
        }, {
            field_id: 14,
            template_id: 1,
            order_number: 4,
            title: 'title',
            required: true,
            default_value: 'Lorem ipsum dolor sit amet, consectetur adipisci elit...',
            type: 'TEXTFIELD_LONG'
        }, {
            field_id: 15,
            template_id: 1,
            order_number: 5,
            title: 'Time',
            required: true,
            default_value: '14:00',
            type: 'TIME'
        }, {
            field_id: 16,
            template_id: 1,
            order_number: 6,
            title: 'Calendar',
            required: true,
            default_value: '2018-03-13',
            type: 'CALENDAR'
        }, {
            field_id: 17,
            template_id: 1,
            order_number: 7,
            title: 'Instuctions',
            required: true,
            default_value: 'VERY NOICE INSTRUCTIONS',
            type: 'INSTRUCTIONS'
        }, {
            field_id: 18,
            template_id: 1,
            order_number: 8,
            title: 'Google',
            required: true,
            default_value: 'http://www.google.com',
            type: 'LINK'
        }, {
            field_id: 3,
            template_id: 1,
            order_number: 3,
            title: 'Q1',
            required: true,
            default_value: null,
            type: 'CHECKBOX',
            field_options: [
                { field_option_id: 1, field_id: 3, value: 'Option 1', default_value: true },
                { field_option_id: 2, field_id: 3, value: 'Option 2', default_value: false }
            ]
        }, {
            field_id: 9,
            template_id: 1,
            order_number: 5,
            title: 'Postal code',
            required: true,
            default_value: '3123',
            type: 'NUMBERFIELD'
        }, {
            type: 'RANDOM'
        }
    ] } };

    const previewScreen = renderer.create(
        <PreviewScreen navigation={navigation} templates={templates} templateID={1}/>
    );

    it('renders correctly', () => {
        previewScreen.toJSON();
        expect(previewScreen).toMatchSnapshot();
    });

    it('handleOnPress() should trigger this.props.navigation.navigate("Report", ...)', () => {
        const inst = previewScreen.getInstance();

        inst.handleOnPress();
        expect(navigate).toHaveBeenCalledWith('Report', {
            isNewReport: true,
            templateID: 1,
            refresh: navigation.state.params.refresh,
            isEditable: true
        });
    });

    it('fetch finds data from the server', () => {
        const data = fetch(url + '/users/1/forms');
        const userData = fetch(url + '/users/1');

        expect(userData).not.toBe(null);
        expect(data).not.toBe(null);
    });

    describe('isLoading', () => {

        const previewScreen = shallow(<PreviewScreen navigation={navigation} templates={templates} templateID={1}/>);

        it('should render an <ActivityIndicator /> if true', () => {
            previewScreen.setState({ isLoading: true });
            expect(previewScreen.find(ActivityIndicator).length).toBe(1);
        });

        it('should not render an <ActivityIndicator /> if false', () => {
            previewScreen.setState({ isLoading: false, fields: [] });
            expect(previewScreen.find(ActivityIndicator).length).toBe(0);
        });
    });
});
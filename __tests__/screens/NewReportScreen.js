import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch';
import { shallow } from 'enzyme';
import { ActivityIndicator } from 'react-native';

import { NewReportScreen } from '../../src/screens/NewReportScreen';
import { url } from '../../src/screens/urlsetting';

configure({ adapter: new Adapter() });

const navigation = { state: { params: { isEditable: true } } };
const templates = { 1: { template_id: 1, title: 'Template 1', fields: [
    { field_id: 1, template_id: 1, order_number: 1, title: 'Name', required: true, default_value: null }
] } };

describe('New report screen', () => {

    it('renders correctly', () => {
        const tree = renderer.create(
            <NewReportScreen navigation={navigation} templates={templates} templateID={1} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('fetch finds data from the server', () => {
        const data = fetch(url + '/users/1/forms');
        const userData = fetch(url + '/users/1');

        expect(userData).not.toBe(null);
        expect(data).not.toBe(null);
    });

    describe('<NewReportScreen />', () => {
        describe('isLoading', () => {
            it('should render a <ActivityIndicator /> if true', () => {
                const templateScreen = shallow(<NewReportScreen navigation={navigation} templates={templates} templateID={1} />);
                templateScreen.setState({ isLoading: true });
                expect(templateScreen.find(ActivityIndicator).length).toBe(1);
            });
        });
    });
});


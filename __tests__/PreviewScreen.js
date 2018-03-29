import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch';
import { shallow } from 'enzyme';
import { ActivityIndicator } from 'react-native';

import { PreviewScreen } from '../src/screens/PreviewScreen';
import { url } from '../src/screens/urlsetting';

configure({ adapter: new Adapter() });

const navigation = { state: { params: { isEditable: true } } };
const templates = { 1: { template_id: 1, title: 'Template 1', fields: [
    { field_id: 1, template_id: 1, order_number: 1, title: 'Name', required: true, default_value: null }
] } };


it('renders correctly', () => {
    const tree = renderer.create(
        <PreviewScreen navigation={navigation} templates={templates} templateID={1}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('fetch finds data from the server', () => {
    const data = fetch(url + '/users/1/forms');
    const userData = fetch(url + '/users/1');

    expect(userData).not.toBe(null);
    expect(data).not.toBe(null);
});

describe('<PreviewScreen />', () => {
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
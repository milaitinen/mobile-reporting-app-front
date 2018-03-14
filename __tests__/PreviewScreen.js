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

it('renders correctly', () => {
    const tree = renderer.create(
        <PreviewScreen />
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

        const previewScreen = shallow(<PreviewScreen />);

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
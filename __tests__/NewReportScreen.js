import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NewReportScreen from '../src/screens/NewReportScreen';
import { url } from '../src/screens/urlsetting';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const tree = renderer.create(
        <NewReportScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('fetch finds data from the server', () => {
    const data = fetch(url + '/users/1/forms');
    const userData = fetch(url + '/users/1');

    expect(userData).not.toBe(null);
    expect(data).not.toBe(null);
});
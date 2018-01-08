import 'react-native';
import React from 'react';

import { url } from '../src/screens/urlsetting';
import NewFormScreen from '../src/screens/NewFormScreen';

import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const tree = renderer.create(
        <NewFormScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('sets the correct date on the forms', () => {
    const date = '2018-01-08';
    const wrapper = shallow(<NewFormScreen/>);

    expect(wrapper.instance().getDate()).toBe(date);
});

it('fetch finds data from the server', () => {
    const data = fetch(url + '/users/1/forms');
    const userData = fetch(url + '/users/1');

    expect(userData).not.toBe(null);
    expect(data).not.toBe(null);
});
import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import NewFormScreen from '../src/screens/NewFormScreen';

import renderer from 'react-test-renderer';
import { url } from '../src/screens/urlsetting';

it('renders correctly', () => {
    const tree = renderer.create(
        <NewFormScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('gets current date correctly', () => {
    const date = '2018-01-08';
    const wrapper = shallow(<NewFormScreen/>);
    wrapper.instance().getDate();

    expect(wrapper).toBe(date);
});

it('can fetch correctly', () => {
    const data = fetch(url + '/users/1/forms');
    const userData = fetch(url + '/users/1');

    expect(userData).not.toBe(null);
    expect(data).not.toBe(null);
});
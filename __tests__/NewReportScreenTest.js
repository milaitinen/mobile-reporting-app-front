import 'react-native';
import React from 'react';
import NewReportScreen from '../src/screens/NewReportScreen';
import { url } from '../src/screens/urlsetting';
import 'isomorphic-fetch';

import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const tree = renderer.create(
        <NewReportScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

/*it('sets the correct date on the forms', () => {
    const date = '2018-01-14';

    const wrapper = shallow(<NewReportScreen/>);

    expect(wrapper.instance().getDate()).toBe(date);
});*/

it('fetch finds data from the server', () => {
    const data = fetch(url + '/users/1/forms');
    const userData = fetch(url + '/users/1');

    expect(userData).not.toBe(null);
    expect(data).not.toBe(null);
});
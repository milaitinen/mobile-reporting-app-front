import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import Datepicker from '../../src/components/Datepicker/Datepicker';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const tree = renderer.create(
        <Datepicker editable={true} mode={'date'} answer={'2018-04-22'} onChange={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

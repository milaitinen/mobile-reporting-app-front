import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import Dropdown from '../src/components/Dropdown/Dropdown';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const tree = renderer.create(
        <Dropdown disabled={false} defaultValue={"some nice value"} options={[]} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});






import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import StatusBadge from '../src/components/StatusBadge/StatusBadge';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const tree = renderer.create(
        <StatusBadge dateCreated='2018-04-01' />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});






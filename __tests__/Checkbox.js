import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import Checkbox from '../src/components/Checkbox/Checkbox';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const tree = renderer.create(
        <Checkbox title='some checkbox' editable={false} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});






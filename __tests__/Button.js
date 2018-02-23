import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import Button from '../src/components/Button/Button';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const tree = renderer.create(
        <Button title='some button' type={'send'} onPress={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});






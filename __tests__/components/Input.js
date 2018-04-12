import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import IconInput from '../../src/components/TextInput/IconInput';

configure({ adapter: new Adapter() });

describe('IconInput component', () => {
    it('renders correctly', () => {
        const tree = renderer.create(
            <IconInput name={'user'} placeholder={'Username'} onChangeText={jest.fn()}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import Input from '../../src/components/TextInput/Input';

configure({ adapter: new Adapter() });

describe('Input component', () => {
    it('renders correctly', () => {
        const tree = renderer.create(
            <Input name={'user'} placeholder={'Username'} onChangeText={jest.fn()}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
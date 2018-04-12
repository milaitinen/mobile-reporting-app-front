import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import sinon from 'sinon';


import Input from '../../src/components/TextInput/Input';

configure({ adapter: new Adapter() });

describe('Input component', () => {
    it('should render correctly when not focused', () => {
        const tree = renderer.create(
            <Input
                placeholder={'Testi'}
                placeholderTextColor={'gray'}
                value={null}
                onChangeText={jest.fn()}
            />
        );
        expect(tree).toMatchSnapshot();
    });

    it('should render correctly when focused', () => {
        const tree = renderer.create(
            <Input
                placeholder={'Testi'}
                placeholderTextColor={'gray'}
                value={null}
                onChangeText={jest.fn()}
            />
        );
        tree.getInstance().handleFocus();
        expect(tree).toMatchSnapshot();
    });

    it('should render correctly when multiline', () => {
        const tree = renderer.create(
            <Input
                multiline
                placeholder={'Testi'}
                placeholderTextColor={'gray'}
                value={null}
                onChangeText={jest.fn()}
            />
        );
        expect(tree).toMatchSnapshot();
    });

    it('should handle focus', () => {
        const spy = sinon.spy(Input.prototype, 'handleFocus');
        const input = shallow(
            <Input
                placeholder={'Testi'}
                placeholderTextColor={'gray'}
                value={null}
                onChangeText={jest.fn()}
            />)
        ;
        input.find('TextInput').simulate('focus');
        expect(spy.called).toEqual(true);
    });

    it('should handle blur', () => {
        const spy = sinon.spy(Input.prototype, 'handleBlur');
        const input = shallow(
            <Input
                placeholder={'Testi'}
                placeholderTextColor={'gray'}
                value={null}
                onChangeText={jest.fn()}
            />)
        ;
        input.find('TextInput').simulate('blur');
        expect(spy.called).toEqual(true);
    });
});
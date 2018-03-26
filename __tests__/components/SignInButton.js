import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { TouchableHighlight } from 'react-native';

import SignInButton from '../../src/components/Button/SignInButton';

configure({ adapter: new Adapter() });

it('Sign in button renders correctly', () => {
    const tree = renderer.create(
        <SignInButton onPress={jest.fn()}>
            Sign in
        </SignInButton>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

jest.mock('TouchableHighlight', () => {
    const button = require('react-native/jest/mockComponent');
    return button(TouchableHighlight);
});


it('pressing the Sign in button works correctly', () => {
    const openTemplates = jest.fn();
    const component = shallow(<SignInButton onPress={ openTemplates }/>);
    component.simulate( 'press' );
    expect(openTemplates).toHaveBeenCalled();
});
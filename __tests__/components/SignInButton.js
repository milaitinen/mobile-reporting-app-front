import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { Touchable } from 'react-native';

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

/* TODO: fix to work
jest.mock('../../src/components/Button/SignInButton', () => {
    const mockComponent = require('react-native');
    return mockComponent('../../src/components/Button/SignInButton');
});

it('pressing the Sign in button works correctly', () => {
    const openTemplates = jest.fn();
    const component = renderer.create(
        <SignInButton onPress={ openTemplates }/>
    ).getInstance();

    component.simulate( 'press' );
    expect(openTemplates).toHaveBeenCalled();
});*/
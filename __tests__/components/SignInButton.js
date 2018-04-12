import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

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

it('pressing the Sign in button works correctly', () => {
    const mockPress = jest.fn();
    const wrapper = shallow(<SignInButton onPress={mockPress}/>);
    wrapper.find('TouchableHighlight').simulate( 'press' );
    expect(mockPress).toHaveBeenCalled();
});
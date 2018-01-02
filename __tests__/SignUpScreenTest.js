import 'react-native';
import React from 'react';
import SignUpScreen from '../src/screens/SignUpScreen';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <SignUpScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
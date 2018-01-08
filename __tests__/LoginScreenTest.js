import 'react-native';
import React from 'react';
import LoginScreen from '../src/screens/LoginScreen';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <LoginScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});


/*
TODO: add tests for buttons and find out it if all the different components are present
 */

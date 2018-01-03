import 'react-native';
import React from 'react';
import MockFormScreen from '../src/screens/MockFormScreen';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <MockFormScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
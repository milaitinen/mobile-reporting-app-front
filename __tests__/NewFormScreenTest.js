import 'react-native';
import React from 'react';
import NewFormScreen from '../src/screens/NewFormScreen';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <NewFormScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
import 'react-native';
import React from 'react';
import SignUpScreen from '../src/components/Containers/SignUpScreen';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <SignUpScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
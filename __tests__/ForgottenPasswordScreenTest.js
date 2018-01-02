import 'react-native';
import React from 'react';
import ForgottenPasswordScreen from '../src/components/Containers/ForgottenPasswordScreen';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <ForgottenPasswordScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
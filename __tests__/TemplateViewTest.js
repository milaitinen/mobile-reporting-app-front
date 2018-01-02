import 'react-native';
import React from 'react';
import TemplateView from '../src/components/Containers/TemplateView';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <TemplateView />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
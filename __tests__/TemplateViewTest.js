import 'react-native';
import React from 'react';
import TemplateView from '../src/screens/TemplateView';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <TemplateView />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
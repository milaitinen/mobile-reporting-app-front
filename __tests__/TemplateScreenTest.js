import 'react-native';
import React from 'react';
import TemplateScreen from '../src/screens/TemplateScreen';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <TemplateScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
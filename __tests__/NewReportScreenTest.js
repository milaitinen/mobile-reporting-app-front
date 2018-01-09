import 'react-native';
import React from 'react';
import NewReportScreen from '../src/screens/NewReportScreen';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <NewReportScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
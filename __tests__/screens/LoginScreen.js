import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { LoginScreen } from '../../src/screens/LoginScreen';

configure({ adapter: new Adapter() });

jest.mock('../../src/navigation/AppNavigation');

it('renders correctly', () => {
    const tree = renderer.create(
        <LoginScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
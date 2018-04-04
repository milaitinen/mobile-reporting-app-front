import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import MainScreenNavigator from '../../src/navigation/AppNavigation';

configure({ adapter: new Adapter() });

describe('AppNavigation', () => {
    it('should');
});
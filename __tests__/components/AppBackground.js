import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LinearGradient from 'react-native-linear-gradient';
import renderer from 'react-test-renderer';

import AppBackground from '../../src/components/AppBackground/AppBackground';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const tree = renderer.create(
        <AppBackground children={null}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});




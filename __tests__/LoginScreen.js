import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LoginScreen from '../src/screens/LoginScreen';
import { SignInButton } from '../src/components/Button';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const tree = renderer.create(
        <LoginScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

/*it('pressing the "Sign In" button works correctly', () => {
    const opensTemplates = jest.fn();
    const component = shallow(<SignInButton onPress={ opensTemplates }/>);
    component.simulate( 'press' );
    expect(opensTemplates).toHaveBeenCalled();
});*/
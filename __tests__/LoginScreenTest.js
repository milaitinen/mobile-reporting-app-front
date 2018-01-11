import 'react-native';
import React from 'react';
import LoginScreen from '../src/screens/LoginScreen';
import SignInButton from '../src/components/Button/SignInButton';

import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const tree = renderer.create(
        <LoginScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('pressing the "Sign In" button works correctly', () => {

    const opensTemplates = jest.fn();

    //const signin = shallow(<SignInButton onPress={opensTemplates}/>);
    //signin.find(<SignInButton/>).simulate('click');

    const navigation = { opens: opensTemplates, };
    //const wrapper = mount(LoginScreen);
    const component = shallow(<SignInButton navigation={ navigation }/>);
    component.simulate( 'press' );
    //const spy = jest.spyOn(SignInButton,'SignIn');
    //const wrapper = shallow(<LoginScreen/>);
    //wrapper.find(n => n.props().title = 'SignIn').simulate('Press');
    //wrapper.find(SignInButton).first().props().onPress()
    expect( opensTemplates ).toHaveBeenCalled();
});
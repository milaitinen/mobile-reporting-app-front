import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { LoginScreen } from '../../src/screens/LoginScreen';
import { url } from '../../src/screens/urlsetting';

configure({ adapter: new Adapter() });

jest.mock('../../src/navigation/AppNavigation');
describe('Login screen', () => {
    it('renders correctly', () => {
        const tree = renderer.create(
            <LoginScreen />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('calls logIn function correctly', () => {
        const mockDispatch = jest.fn();
        const navigation = { state: { params: { isEditable: true } }, dispatch: mockDispatch };
        const wrapper = shallow(<LoginScreen navigation={navigation} dispatch={mockDispatch}/>);
        wrapper
        wrapper.instance().logIn();
        expect(mockDispatch).toHaveBeenCalled();

    });
});

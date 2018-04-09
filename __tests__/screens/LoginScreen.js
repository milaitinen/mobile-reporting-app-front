import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';

import connectedLoginScreen, { LoginScreen } from '../../src/screens/LoginScreen';
import { url } from '../../src/screens/urlsetting';

configure({ adapter: new Adapter() });
jest.mock('../../src/components/OfflineNotice', () => 'OfflineNotice');

jest.mock('../../src/navigation/AppNavigation');

describe('Login screen', () => {
    it('renders correctly', () => {
        const mockStore = configureStore();
        const initialState = {};
        const store = mockStore(initialState);
        const tree = renderer.create(
            <connectedLoginScreen store={store} />
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

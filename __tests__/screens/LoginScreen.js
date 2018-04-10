import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';

import connectedLoginScreen, { LoginScreen } from '../../src/screens/LoginScreen';
import * as userTypes from '../../src/redux/actions/user';
import * as connectionTypes from '../../src/redux/actions/connection';

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

    it('calls dispatch in logIn function correctly', async () => {

        jest.unmock('../../src/screens/api');
        const api = require.requireActual('../../src/screens/api');
        api.login = jest.fn(() => new Promise(resolve => resolve(true)));

        const dispatch = jest.fn();
        const navigation = { state: { params: { isEditable: true } }, dispatch: dispatch };

        const wrapper = shallow(<LoginScreen navigation={navigation} dispatch={dispatch} />);
        await wrapper.find('SignInButton').simulate('press');

        expect(dispatch).toHaveBeenCalledWith({ type: userTypes.INSERT_TOKEN, token: true });
    });

    it('does not call dispatch in logIn function when token is undefined', async () => {

        jest.unmock('../../src/screens/api');
        const api = require.requireActual('../../src/screens/api');
        api.login = jest.fn(() => new Promise(resolve => resolve()));

        const dispatch = jest.fn();
        const navigation = { state: { params: { isEditable: true } }, dispatch: dispatch };

        const wrapper = shallow(<LoginScreen navigation={navigation} dispatch={dispatch} />);
        await wrapper.find('SignInButton').simulate('press');

        expect(dispatch).toHaveBeenLastCalledWith({ type: connectionTypes.SET_INITIAL_CONNECTION, isConnected: undefined });
    });
});

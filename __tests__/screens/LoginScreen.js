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
        const tree = renderer.create(<connectedLoginScreen store={store} />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    jest.unmock('../../src/api');
    const api = require.requireActual('../../src/api');

    const navigate = jest.fn();
    const dispatch = jest.fn();
    const navigation = { state: { params: { isEditable: true } }, navigate: navigate };
    const loginScreen = shallow(<LoginScreen navigation={navigation} dispatch={dispatch} />);

    it('does not call dispatch in logIn function when token is undefined', async () => {
        api.login = jest.fn(() => new Promise(resolve => resolve()));

        await loginScreen.find('SignInButton').simulate('press');
        expect(dispatch).not.toHaveBeenCalledWith({ type: userTypes.INSERT_TOKEN, token: true });
    });

    it('calls dispatch in logIn function correctly', async () => {
        api.login = jest.fn(() => new Promise(resolve => resolve(true)));

        await loginScreen.find('SignInButton').simulate('press');
        expect(dispatch).toHaveBeenCalledWith({ type: userTypes.INSERT_TOKEN, token: true });
    });

    // this.props.dispatch(toggleConnection({ connectionStatus: isConnected }));
    it('dispatches toggleConnection when calling handleConnectionChange', () => {
        loginScreen.instance().handleConnectionChange(true);
        expect(dispatch).toHaveBeenCalledWith({ type: connectionTypes.TOGGLE_CONNECTION, isConnected: true });
    });
});
